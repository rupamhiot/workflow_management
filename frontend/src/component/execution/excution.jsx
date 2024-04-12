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
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getAllWorkflow());
  }, [dispatch]);

  const { fetchedData } = useSelector((state) => state.fetchedWorkflow);
  const {loading } = useSelector((state) => state.runWorkflow);
  // console.log(fetchedData);

  const handleFileChange = (e) => {
    // console.log(e.target.files[0])
    setFile(e.target.files[0]);
  };
  // workflow_id
  const handleWorkflowChange = (e) => {

    setWorkflowId(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setError(null);
    // console.log(value);
    dispatch(runWorkflow(workflowId,"./controller/CSV/1.csv"))
  };

  return (
    <div className='background_workflow'>
      <h2>Call Workflow</h2>
      <form onSubmit={handleSubmit}>
        <div className='form_div'>
        <div>
          <label htmlFor="file">Upload CSV file:</label>
          <input type="file" id="file" accept=".csv" onChange={handleFileChange} />
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
        <button className='.btn' type="submit" >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CallWorkflow;
