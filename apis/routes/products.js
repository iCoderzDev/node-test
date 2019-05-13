const express = require('express');
const router = express();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) =>{


    for(var i = 0; i < 1;i++){
        composeMessage('hiren');
    }

    for(var i = 0; i < 1;i++){
        composeMessage('break');
    }

    for(var i = 0; i < 1;i++){
        composeMessage('the');
    }

    for(var i = 0; i < 1;i++){
        composeMessage('server');
    }

    Product.find()
    .select('name price _id')
    .exec()    
    .then(docs => {
        
         const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        URL: "http://localhost:3000/products/"  +  doc._id
                    }
                }
            })
         };

        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    
});

function composeMessage(message){
    console.log(message);  
  }

router.get('/:productId', (req, res, next) =>{

    const pid = req.params.productId;

    Product.findById(pid)
    .exec()
    .then(doc => {

        if (doc){
            res.status(200).json(doc)
        }
        else{
            res.status(404).json({
                message: "No valid product found111!"
            });
        }

        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
   
});


router.post('/', (req, res, next) =>{

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price 
    });
    
    product.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Product Created Successfully!",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                result: {
                    type: "GET",
                    URL: "http://localhost:3000/products/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    
});

router.patch('/:productId', (req, res, next) =>{

    const pid = req.params.productId;

    const updateOps = {};

    for(const op of req.body)
    {
        updateOps[op.promName] = op.value;
    }

    Product.update({
        _id: pid
    }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    

});

router.delete('/:productId', (req, res, next) =>{

    const pid = req.params.productId;
    Product.remove({
        _id: pid
    })
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});

module.exports = router;