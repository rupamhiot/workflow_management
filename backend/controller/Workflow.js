const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Workflow = require("../models/workflowModel")

// saved WorkFlows
exports.saveWorkflow = catchAsyncErrors (async(req,res) =>{
        const {nodes,edges,name} = req.body
        console.log(req.body);
        const workflow = await  Workflow.create({
            nodes,
           edges,  
           name
        });

        res.status(200).json({
            success: true,
            message: "Saved Successfully",
            data: workflow // Optionally, you can send back the saved workflow data
        })
})
// Get all Workflow
exports.getAllWorkflow = catchAsyncErrors(async(req,res,next)=>{
    const workflows  = await Workflow.find();
    res.status(200).json({
        sucess:true,
        data:workflows,
    })
})
// Get single Workflow
exports.getSingleWorkflow = catchAsyncErrors(async(req,res,next)=>{
    const workflow = await Workflow.findById(req.params.id);
    if(!workflow){
        return next(new ErrorHandler(`workflow does not exist with Id: ${req.params.id}`));
    }
    res.status(200).json({
        sucess:true,
        workflow,
    });
});
// Delete Workflow
exports.deleteWorkflow = catchAsyncErrors(async(req,res,next)=>{
    const workflow = await Workflow.findById(req.params.id);
    if(!Workflow){
        return next(new ErrorHandler(`Workflow does not exist with Id: ${req.params.id}`))
    }

    await workflow.deleteOne();

    res.status(200).json({
        sucess:true,
        message: "Workflow Deleted Successfully",
    })
})