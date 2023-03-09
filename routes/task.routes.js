const router = require("express").Router();

const Task = require("../models/Task.model")
const Project = require("../models/Project.model")

router.post("/tasks", async (req, res, next) => {
    const{title, description, project} =req.body;
    try {
        const task = await Task.create({title, description, project});
        await Project.findByIdAndUpdate(project, {$push:{
            tasks: task._id,
        },
    })
    res.json(task);
    
    } catch (error) {
    console.log(error)
    res.json(error)
        
    }
})

module.exports = router;