const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());


// static files
app.use(express.static(__dirname + '/client'));

// import model
const Car = require('./models/car')

// connect to mongoose
mongoose.connect('mongodb://localhost/carstore');
const db = mongoose.connection;
console.log("connected to db");

app.get('/', (req, res) => {
  res.send("hello");
});


// get cars
app.get('/api/cars', (req, res) => {
  Car.getCars((err, cars) =>{
    if(err){
      throw err;
    };
    res.json(cars);
  })
});


// get car by id
app.get('/api/cars/:_id', (req, res) => {
  var query = {
    _id: req.params._id
  }
  Car.getCar(query, (err, car) => {
    if(err){
      throw err;
    };
    res.json(car);
  })
})

// add car
app.post('/api/cars', (req, res) => {
  const car = req.body;
  Car.addCar(car, (err, car) => {
    if(err){
      throw err;
    }
    res.json(car);
  })
})

// update car
app.put('/api/cars/:_id', (req, res) => {
  const id = req.params._id;
  const car = req.body;

  Car.updateCar(id, car , {}, (err, car) => {
    if(err){
      throw err;
    }
    res.json(car);
  });
});

// delete car
app.delete('/api/cars/:_id', (req, res) => {
  const id = req.params._id;
  Car.deleteCar(id, (err, car) => {
    if(err){
      throw err;
    }
    res.json(car);
  })
})

app.listen(3000);
console.log('running on port 3000');
