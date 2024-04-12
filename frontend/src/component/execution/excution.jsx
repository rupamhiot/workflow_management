import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./execution.css";
import { useDispatch } from 'react-redux';
import { getAllWorkflow } from "../../action/workflowaction";
import { useSelector } from "react-redux";
import { runWorkflow } from '../../action/workflowaction';

const CallWorkflow = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [workflowId, setWorkflowId] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getAllWorkflow());
  }, [dispatch]);

  const { fetchedData } = useSelector((state) => state.fetchedWorkflow);
  const {loading,message } = useSelector((state) => state.runWorkflow);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // workflow_id
  const handleWorkflowChange = (e) => {
    setWorkflowId(e.target.value);
  };


  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setError(null);
    // dispatch(runWorkflow(workflowId,"./controller/CSV/1.csv"))
    e.preventDefault();
    setError(null);

    if (!file || !workflowId) {
      setError('Please select a file and a workflow.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    // console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Assuming the response contains the file path
      const filePath = response.data;
      console.log(filePath);
      console.log(workflowId);
      // Dispatch the runWorkflow action with the workflowId and filePath
      dispatch(runWorkflow(workflowId, filePath));
    } catch (error) {
      setError('An error occurred while uploading the file.');
    }
  };

  return (
    <div className='background_workflow'>
      <h2>Call Workflow</h2>
      <form onSubmit={handleSubmit}>
        <div className='form_div'>
        <div>
          <label htmlFor="file">Upload CSV file:</label>
          <input type="file" id="file" name='file' accept=".csv" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="workflow">Select Workflow:</label>
          <select id="workflow" value={workflowId} onChange={handleWorkflowChange}>
            <option value="">Select Workflow</option>
            {fetchedData && fetchedData.map(workflow => (
              <option key={workflow._id} value={workflow._id}>{workflow._id}</option>
            ))}
          </select>
        </div>
        <button className='.btn-3' type="submit" >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        </div>
        
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>{message}</h1>
    </div>
  );
};

export default CallWorkflow;
