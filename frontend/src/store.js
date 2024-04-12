import { configureStore } from '@reduxjs/toolkit';
import { fetchWorkflowReducer, workflowReducer,runWorkflowReducer } from './reducer/workflowReducer';
export const store = configureStore({
    reducer: {
        workflow:workflowReducer,
        fetchedWorkflow:fetchWorkflowReducer,
        runWorkflow:runWorkflowReducer
    },
  })