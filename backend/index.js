const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://mpsstore001:01mystoreisOP3n@cluster0.4hmk1ep.mongodb.net/mpsstore");

// API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products

const Products = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

// Creating API for adding products

app.post('/addproduct',async (req,res)=>{
    console.log('Request Body',req.body);
    let products = await Products.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id = 1;
    }
    const product = new Products({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        description:req.body.description,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API for deleting products

app.post('/removeproduct',async(req,res)=>{
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// Creating API for getting all products
app.get('/allproduct',async (req,res)=>{
    let products = await Products.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema creating for User model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating Endpoint for registering the user

app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"Existing user found with same email address"});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// Creating Endpoint for User login

app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Address"})
    }
})

// Creating Endpoint for New Collection data
app.get('/newcollections',async (req,res)=>{
    let products = await Products.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// Creating Endpoint for Popular in Minecraft section
app.get('/popularinminecraft',async (req,res)=>{
    let products = await Products.find({category:"minecraft"});
    let popular_in_minecraft = products.slice(0,4);
    console.log("Popular in Minecraft Fetched");
    res.send(popular_in_minecraft);
})


// Function to fetch a small number of random exclusive products
const getRandomExclusiveProducts = async () => {
    try {
      // Fetch 2 random exclusive products from each category
      const fnafProducts = await Products.aggregate([
        { $match: { category: "fnaf" } },
        { $sample: { size: 2 } }
      ]);
  
      const minecraftProducts = await Products.aggregate([
        { $match: { category: "minecraft" } },
        { $sample: { size: 2 } }
      ]);
  
      const assortedProducts = await Products.aggregate([
        { $match: { category: "assorted" } },
        { $sample: { size: 2 } }
      ]);
  
      // Combine the results
      const exclusiveProducts = [...fnafProducts, ...minecraftProducts, ...assortedProducts];
  
      return exclusiveProducts;
    } catch (error) {
      console.error("Error fetching exclusive products:", error);
      return [];
    }
  };
  
  app.get('/exclusive-offers', async (req, res) => {
    try {
      // Fetch random exclusive products from the database
      const exclusiveProducts = await getRandomExclusiveProducts();
      console.log("Fetched Exclusive Products:", exclusiveProducts);
      res.json(exclusiveProducts);
    } catch (error) {
      console.error("Error fetching exclusive products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.use(bodyParser.json());

// Endpoint for handling newsletter subscription
app.post('/subscribe-newsletter', (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Simulate the email sending process (replace this with actual email sending logic)
  console.log(`Simulating email verification for ${email}`);

  // Respond to the client
  res.json({ success: true, message: 'Email verification initiated' });
});


// Creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    console.log('Received Token:',token);
    if (!token) {
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            console.log('Decoded Token:',data);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

// Creating Endpoint for adding products in cartdara
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// Creating Endpoint to remove product from cartData
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// Creating Endpoint to get cartData
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error) {
        console.log("Server Running on Port "+port)
    }
else
    {
       console.log("Error : "+error)
    }
})  
