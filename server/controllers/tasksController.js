var mongoose = require("mongoose");
const {TaskModel} = require('./../models/taskModel');

module.exports = {

    allTasks: function(req, response){
        TaskModel
        .getAllTasks()
        .then( data => {
            let task = data.map(tasks => {
                console.log( tasks );
                return {
                    title: tasks.title,
                    description : tasks.description,
                    completed : tasks.completed,
                    created_at : tasks.created_at,
                    updated_at : tasks.updated_at
                }
            })
        console.log( task );
        response.status( 200 ).json( data );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
            response.json( err );
        })
    },

    addTask: function(req, res){
        newtask = {
            title: req.body.title,
            description: req.body.description, 
            completed: req.body.completed,
            created_at: new Date(),
            updated_at: new Date()
        }
            TaskModel.newtask(newtask);
            res.json({added: true});
    },

    findByName : function ( request, response ) {
        let title = request.params.title;
        console.log("HERE", title);

        TaskModel
            .getTaskByName(title)
            .then( titles => {
                let task = titles
                console.log("HERE", task);
                response.status( 200 ).json( task );
            })
    },

    removeTask : function(request, response){
        let title = request.params.title;
        TaskModel
            .getTaskByName( title )
            .then( result => {
                if( result === null ){
                    console.log( "Something went wrong!" );
                }
                else{
                    TaskModel
                        .deletetask( title )
                        .then( result => {
                            response.status( 204 ).json();
                        });
                }
            })
    },

    editTask: function(req, res){
        let title = req.params.title;

        newtitle = req.body.title;
        newdescription = req.body.description;
        newcompleted = req.body.completed;
        updated_at = new Date();

        TaskModel
        .getTaskByName(title)
        .then(task =>{
            if(task === null){
                res.statusMessage = "You can not edit a task that doesn't exists";
                res.status( 404 ).end();
            }
            else{
                if(newtitle){
                    task.title = newtitle;
                }
                if(newdescription){
                    task.description = newdescription;
                }
                if(newcompleted){
                    task.completed = newcompleted;
                }
                task.updated_at = updated_at

                TaskModel
                .updatetask(title , task)
                .then(result=>{
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.statusMessage = "There is another task with that title";
                    res.status(400).end()
                })
            }
        });
    }
}
