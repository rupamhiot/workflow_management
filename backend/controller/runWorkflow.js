const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
const Workflow = require('../models/workflowModel');
const catchAsyncError = require('../middleware/catchAsyncError');

// file path id and flow id
const idVsFunctionmap = new Map();
idVsFunctionmap.set('filter', processAndConvertToLowercase)
idVsFunctionmap.set('wait', introduceDelay)
idVsFunctionmap.set('convert', convertCsvToJson)
idVsFunctionmap.set('send', sendPostRequest)


// Route to execute workflow
exports.runWorkflow = catchAsyncError(async (req, res) => {

  const { wf_id, fl_path } = req.body;
  let filePath = `./${fl_path}`;
  let id = wf_id;
  console.log(filePath);

  try {
    // Find workflow by ID
    const workflow = await Workflow.findById(id);
    if (!workflow) {
      return res.status(404).json({ success: false, message: `Workflow not found with ID: ${id}` });
    }

    let excutetableFunction1 = idVsFunctionmap.get(workflow.edges[0].source);
    await excutetableFunction1(filePath);
    // Execute tasks in workflow
    for (const edge of workflow.edges) {
      let excutetableFunction2 = idVsFunctionmap.get(edge.target);
      await excutetableFunction2(filePath);
      // 
    }
    res.status(200).json({ success: true, message: 'Workflow executed successfully' });
  } catch (error) {
    console.error('Error executing workflow:', error);
    res.status(500).json({ success: false, message: 'Error executing workflow' });
  }
});

// Helper functions
function processAndConvertToLowercase(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Convert column values to lowercase
        const lowercaseRow = {};
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            lowercaseRow[key.toLowerCase()] = row[key].toLowerCase();
          }
        }
        data.push(lowercaseRow);
      })
      .on('end', () => {
        console.log('Data processed and converted to lowercase:', data);
        // Write the modified data back to the file
        const outputStream = fs.createWriteStream(filePath);
        outputStream.write(''); // Clear existing content
        data.forEach((row) => {
          outputStream.write(`${Object.values(row).join(',')}\n`); // Write each row
        });
        outputStream.end();
        outputStream.on('finish', () => {
          console.log('File content updated successfully');
          resolve();
        });
        outputStream.on('error', (error) => {
          console.error('Error updating file content:', error);
          reject(error);
        });
      })
      .on('error', (error) => {
        console.error('Error processing data:', error);
        reject(error);
      });
  });
}



// async function introduceDelay() {
//   // Introduce an asynchronous delay
//   // Example implementation:
//   await new Promise(resolve => setTimeout(resolve, 60000)); // 5-second delay
//   console.log('Asynchronous delay introduced');
// }
function introduceDelay() {
  // Introduce a synchronous delay
  // Example implementation:
  const delayInMilliseconds = 60000; // 60 seconds
  const startTime = Date.now();
  let currentTime = startTime;
  while (currentTime - startTime < delayInMilliseconds) {
    currentTime = Date.now();
  }
  console.log('Synchronous delay introduced');
}

function convertCsvToJson(filePath) {
  // Convert the data from CSV to JSON format
  // Example implementation:
  const jsonData = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      jsonData.push(row);
    })
    .on('end', () => {
      console.log('CSV data converted to JSON:', jsonData);
    });
}

function sendPostRequest() {
  const url = 'https://api.requestcatcher.com';
  try {
    axios.post(url);
  } catch (error) {
    console.error('Error sending POST request:', error);
    throw new Error(`Error sending POST request: ${error.message}`);
  }
}


