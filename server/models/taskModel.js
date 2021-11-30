var mongoose = require("mongoose");
// const { update } = require("../controllers/tasksController");

var TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }

});

const Task = mongoose.model("Task", TaskSchema);

const TaskModel = {

    newtask: function(task){
        return Task.create(task);
    },

    getAllTasks : function(){
        return Task.find();
    },

    getTaskByName : function( title ){
        return Task.findOne({ title });
    },

    deletetask: function(title){
        return Task.remove({title});
    },

    updatetask: function(title , taskupdated) {
        return Task.findOneAndUpdate({title}, {$set : taskupdated}, {new:true})
    }
}

module.exports = {TaskModel};

