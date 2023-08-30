// create express application
const express = require('express')
// require mongoose
const mongoose = require('mongoose')
// import product model
const Product = require('./models/productModel')

// creats the app with express
const app = express()

// specify json middleware so app understands json
app.use(express.json())

// instead of json i want to use form url
app.use(express.urlencoded({extended: false}))
// declare route
// client requests, crud app responds
app.get('/', (req, res) =>{
    res.send('Hello NODE API')
})
app.get('/blog', (req, res) =>{
    res.send('Hello Blog, My name is Marz')
})

// fetch or get data from mongoDB
// async bc we need to interact with database
app.get('/products', async(req, res) => {
    try {
        // use Product model to get data from data base and use {} to get all of it
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// fetch data for single product
app.get('/products/:id', async(req, res) => {
    try {
        // to get the :id from above 
        const {id} = req.params
        // use Product model to get data from data base and use findbyid to find one 
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Use a Model to Save Data in MongoDB
// save data from client to database
app.post('/products', async(req, res) => {
    try {
        // create new Product with the request from client
        const product = await Product.create(req.body)
        // data we respond back is product we save in database
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product to data in database
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        // takes in two paramaters, gets id and the data to be updated 
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if cannot find the product return
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } 
        // else update product with latest information 
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete from  data
app.delete('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).jscon({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// to remove an error for strictQuery
mongoose.set("strictQuery", false)

// connects to mangodb first then starts application
mongoose.connect('mongodb+srv://admin:k1CFRuRYG3q4bA7e@crudapi.ioppfob.mongodb.net/CRUD-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, () => {
        console.log(`Node API app is running on port 3000`)
    })
}).catch((error) =>{
    console.log(error)
})