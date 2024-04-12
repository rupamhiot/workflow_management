const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  nodes: [{
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
    selected: Boolean,
    positionAbsolute: {
        x: Number,
        y: Number
    },
    dragging: Boolean
}],
edges: [{
    source: String,
    sourceHandle: {
        type:String,
        default:null
    },
    target: String,
    targetHandle: {
        type:String,
        default:null
    },
    id: String
}]
});

const Workflow = mongoose.model('Workflow', workflowSchema);

module.exports = Workflow;
