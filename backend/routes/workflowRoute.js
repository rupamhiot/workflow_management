const express = require("express");
const router = express.Router();
const {saveWorkflow, deleteWorkflow, getAllWorkflow,getSingleWorkflow} = require("../controller/Workflow.js");
const { runWorkflow } = require("../controller/runWorkflow.js");
const { uploadFile } = require("../controller/uploadfile.js");



// save workflow
router.route("/save/workflow").post(saveWorkflow);
// run workflow
router.route("/workflow/execute").post(runWorkflow);
// get single workflow
router.route("/workflow/:id").get(getSingleWorkflow);
// get all workflow
router.route("/workflows").get(getAllWorkflow)
// delete workflow
router.route("/workflow/:id").delete(deleteWorkflow);
// UPLOAD FILE
// router.route("/upload").post(uploadFile);

module.exports = router;


