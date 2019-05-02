const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./apis/routes/products');

mongoose.connect('mongodb+srv://icoderzdev:icoderzdev@noderest-ditgc.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

app.use('/products', productRoutes);

module.exports = app;