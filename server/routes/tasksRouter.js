var tasks = require("../controllers/tasksController");

module.exports = function(app){

    app.get("/tasks", tasks.allTasks)

    app.post("/tasks", tasks.addTask)

    app.get('/tasks/:title', tasks.findByName )

    app.delete('/tasks/:title', tasks.removeTask)

    app.put("/tasks/:title", tasks.editTask)
}