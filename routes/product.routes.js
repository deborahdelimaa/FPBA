const router = require("express").Router();
const Product = require("../models/Product.model");
const Review = require("../models/Review.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");



// Create
router.post("/products", fileUploader.single("img"), async (req, res, next)=> {
    const {name, description, condition, category, price, img, echange, sold, seller, buyer} = req.body;
    try {
    const product = await Product.create({name, description, condition, category, price, img, echange, sold, seller, buyer})
        if(!req.file){
            next(new Error("No file uploaded!"));
            return;
        }
        res.json({product, fileUrl:req.file.path})
    } catch (error) {
        console.log(error)
        res.json(error)
    }
});

// Read (all)
router.get("/products", async (req, res, next)=> {

    try {
        const product = await Product.find()
        res.json(product)
    } catch (error) {
        res.json(error)
    }
});

//read id
router.get("/products/:id", async (req, res, next)=> {
    const {id} = req.params;
    try {
        const product = await Product.findById(id)
        res.json(product);

    } catch (error) {
        res.json(error)
        
    }
})

// Update
router.put("/products/:id", fileUploader.single("img") , async (req, res, next)=> {
    const {id} = req.params;
    const {name, description, condition, category, price, img, echange, sold, seller, buyer} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.json("The provided product id is not valid ")

        if(!req.file){
            next(new Error("No file uploaded!"));
            return
        }
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {name, description, condition, category, price, img, echange, sold, seller, buyer}, {new:true})
        res.json(updatedProduct)
    } catch (error) {
        res.json(error)
        
    }
});

 //Delete
 router.delete("/products/:id", async(req, res, next)=> {
    const {id} = req.params;
    try {
        const product =await Product.findById(id);
         await Product.findByIdAndDelete(id);
        res.json({message: `Product with the id ${id} deleted successfully`})
    } catch (error) {
        res.json(error)
        
    }
 })


// Show bought product list

router.get("/bought-product-list", async (req, res, next)=> {

    try {
        const product = await Product.find()
        res.json(product)
    } catch (error) {
        res.json(error)
    }
});

router.get("/bought-products-details/:id", async (req, res, next)=> {
    const {id} = req.params;
    try {
        const product = await Product.findById(id)
        res.json(product);

    } catch (error) {
        res.json(error)
        
    }
})








module.exports = router;