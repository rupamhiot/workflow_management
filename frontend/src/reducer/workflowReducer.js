import {
    SAVE_WORKFLOW_REQUEST,
    SAVE_WORKFLOW_SUCCESS,
    SAVE_WORKFLOW_FAIL,
    FETCH_WORKFLOW_REQUEST,
    FETCH_WORKFLOW_SUCCESS,
    FETCH_WORKFLOW_FAIL,
    RUN_WORKFLOW_REQUEST,
    RUN_WORKFLOW_SUCCESS,
    RUN_WORKFLOW_FAIL,
    CLEAR_ERRORS
} from "../constant/workflowConstant"

export const workflowReducer = (state = {workflow: {}},action)=>{
    switch(action.type){
        case SAVE_WORKFLOW_REQUEST:
            return{
                loading: true,
                // isAuthenticated:false,
            }
        case SAVE_WORKFLOW_SUCCESS:
            return{
                ...state,
                loading: false,
                // isAuthenticated: true,
                workflow: action.payload,
            };
        case SAVE_WORKFLOW_FAIL:
            return{
                ...state,
                loading: false,
                workflow: null,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
            ...state,
            error:null,
        };
        default:
            return state;
    }

};

export const fetchWorkflowReducer = (state = {fetchedWorkflow: {}},action)=>{
    switch(action.type){
        case FETCH_WORKFLOW_REQUEST:
            return{
                loading: true,
                // isAuthenticated:false,
            }
        case FETCH_WORKFLOW_SUCCESS:
            return{
                ...state,
                loading: false,
                // isAuthenticated: true,
                fetchedData: action.payload,
            };
        case FETCH_WORKFLOW_FAIL:
            return{
                ...state,
                loading: false,
                workflow: null,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
            ...state,
            error:null,
        };
        default:
            return state;
    }
};
export const runWorkflowReducer = (state = {runWorkflow: {}},action)=>{
    switch(action.type){
        case RUN_WORKFLOW_REQUEST:
            return{
                loading: true,
                // isAuthenticated:false,
            }
        case RUN_WORKFLOW_SUCCESS:
            return{
                ...state,
                loading: false,
                success:action.payload.success,
                message:action.payload.message
                // isAuthenticated: true,
                
            };
        case RUN_WORKFLOW_FAIL:
            return{
                ...state,
                loading: false,
                success:action.payload.success,
                error:action.payload.message,
            };
        case CLEAR_ERRORS:
            return{
            ...state,
            error:null,
        };
        default:
            return state;
    }
};