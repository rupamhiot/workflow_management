const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({

    id: String,
    type: String,
    data: {
        label: String
    },
    position: {
        x: Number,
        y: Number
    },
    width: Number,
    height: Number,
    positionAbsolute: {
        x: Number,
        y: Number
    }
});

const edgeSchema = new mongoose.Schema({
    source: String,
    sourceHandle: String,
    target: String,
    targetHandle: String,
    id: String
});

const workflowSchema = new mongoose.Schema({
    nodes: [nodeSchema],
    edges: [edgeSchema],
    name : String
});

const Workflow = mongoose.model('Workflow', workflowSchema);

module.exports = Workflow;
