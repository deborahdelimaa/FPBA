const router = require("express").Router();
const Product = require("../models/Product.model");
const Review = require("../models/Review.model");
const mongoose = require("mongoose");
const User = require ("../models/User.model")
const fileUploader = require("../config/cloudinary.config");

// Create
router.post("/user",fileUploader.single("img"), async (req, res, next)=> {
    const {name, description, condition, category, price, img, echange, sold, seller, buyer} = req.body;
    try {
        const product = await Product.create({name, email, password, img, price, img, soldProduct, boughtProduct, reviews})
        if(!req.file){
       next(new Error ("No file uploaded"));
       return;     
        }
        res.json(product)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
});




// Update
router.put("/user/:id", async (req, res, next)=> {
    const {id} = req.params;
    const {name, email,password, contact, img, soldProduct, bougthProduct, reviews} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.json("The provided product id is not valid ")
    }
    try {
        const updateUser = await User.findByIdAndUpdate(id,{name, email, password, contact, img, soldProduct, bougthProduct, reviews}, {new:true});
        res.json(updateUser)
    } catch (error) {
        res.json(error)
        
    }
});

 //Delete
 router.delete("/user/:id", async(req, res, next)=> {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
         await User.findByIdAndDelete(id);
        res.json({message: `User with the id ${id} deleted successfully`})
    } catch (error) {
        res.json(error)
        
    }
 })


module.exports = router;
