import {
    SAVE_WORKFLOW_REQUEST,
    SAVE_WORKFLOW_SUCCESS,
    SAVE_WORKFLOW_FAIL,
    FETCH_WORKFLOW_REQUEST,
    FETCH_WORKFLOW_SUCCESS,
    FETCH_WORKFLOW_FAIL,
    RUN_WORKFLOW_REQUEST,
    RUN_WORKFLOW_SUCCESS,RUN_WORKFLOW_FAIL,
    CLEAR_ERRORS
} from "../constant/workflowConstant"
import axios from "axios"

//save workflow
export const saveWorkflow = (workflowData) =>async(dispatch)=>{
    try{
        dispatch({type:SAVE_WORKFLOW_REQUEST});
        const config = {headers: {"Content-Type":"application/json"}};
        // console.log("before");
        const {data} = await axios.post('http://localhost:5000/api/v1/save/workflow',workflowData,config)
        // console.log("after");
        dispatch({type:SAVE_WORKFLOW_SUCCESS,payload:data.data});
    }catch(error){
        dispatch({
                type: SAVE_WORKFLOW_FAIL,
                payload: error.response.workflow,
        });
    }
};

// get all workflow
export const getAllWorkflow = () => async(dispatch)=>{
    try{
        dispatch({type:FETCH_WORKFLOW_REQUEST});
        const {data} = await axios.get(`http://localhost:5000/api/v1/workflows`);
        dispatch({
            type:FETCH_WORKFLOW_SUCCESS,
            payload:data.data,
        });

    }catch(error){
        dispatch({
            type:FETCH_WORKFLOW_FAIL,
            payload: error.response.data
        });
        
    }
};
// EXECUTE WORKFLOW
export const runWorkflow = (wf_id,fl_data) => async(dispatch)=>{
    try{
        dispatch({type:RUN_WORKFLOW_REQUEST});
        const {data} = await axios.post(`http://localhost:5000/api/v1/workflow/execute`,{wf_id:wf_id},fl_data);
        dispatch({
            type:RUN_WORKFLOW_SUCCESS,
            payload:data,
        });

    }catch(error){
        dispatch({
            type:RUN_WORKFLOW_FAIL,
            payload: error.response.data
        });
        
    }
};