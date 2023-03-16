const router = require('express').Router();
const Product = require('../models/Product.model');
const Review = require('../models/Review.model');
const User = require('../models/User.model');
const mongoose = require('mongoose');
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// Create
router.post(
  '/products',
  async (req, res, next) => {
    const {
      name,
      description,
      condition,
      category,
      price,
      img,
      exchange,
      sold,
      seller,
      buyer,
    } = req.body;
    console.log(req.body)
    try {
      const product = await Product.create({
        name,
        description,
        condition,
        category,
        price,
        img,
        exchange,
        sold,
        seller,
        buyer,
      });
      
      res.json(product);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

// Read (all)
router.get('/products', async (req, res, next) => {
  try {
    const product = await Product.find().populate('seller'); 
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

// Read (all)
router.get('/my-products', async (req, res, next) => {
  try {
    const product = await Product.find()
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

//read id
router.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate('feedback');
    /* .populate({
        path: "feedback",
        populate: { path: "comment", model: "Review" },
      }); */
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});
/* ok */
// Update
router.put(
  '/products/:id',
  fileUploader.single('img'),
  async (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      description,
      condition,
      category,
      price,
      img,
      echange,
      sold,
      seller,
      buyer,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json('The provided product id is not valid ');

      if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          condition,
          category,
          price,
          img,
          echange,
          sold,
          seller,
          buyer,
        },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      res.json(error);
    }
  }
);

//Delete
router.delete('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    await Product.findByIdAndDelete(id);
    res.json({ message: `Product with the id ${id} deleted successfully` });
  } catch (error) {
    res.json(error);
  }
});

// Show bought product list

router.get('/products/bought', async (req, res, next) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

router.get('/bought-products-details/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

//BUY PRODUCT
// Create
router.get('/buy/:userId/:productId', async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          boughtProduct: productId,
        },
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


router.get('/products/favorites', async (req, res, next) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  });



router.get('/favorites/:userId/:productId', async (req, res, next) => {
    const { userId, productId } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            favorite: productId,
          },
        },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });
  
  
  router.delete('/favorites/:productId', isAuthenticated, async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.payload._id
    try {
     
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
              $pull: {
                favorite: productId,
              },
            },
            { new: true }
          );
          console.log(updatedUser)
      /* const user  = await User.findById(id);
      await User.findByIdAndDelete(id); */
      res.json({ message: `Product with the id ${productId} deleted successfully` });
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;
