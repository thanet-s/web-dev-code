import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//import User from './models/userModel.js';
import userRoutes from './routes/userRoutes.js';

import Product from './models/product.js';
import products from './data.js';

// $ mongo --username admin --password pass
// mongo>>> use mynewdb;
// mongo>>> db.createUser({ user: 'admin', pwd: 'pass', roles: [ { role: "readWrite", db: "webdevdb" } ] })

// const mongourl = 'mongodb://admin:pass@localhost/mynewdb';
const mongourl = "mongodb+srv://admin:pass@cluster0.2vapn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch((error) => {
  console.log('เกิด error');
  console.log(error);
});

//const Cat = mongoose.model('Cat', { name: String, family: String });
//
//function testCreateCat() {
//  const kitty = new Cat({ name: 'Zildjian' });
//  kitty.save().then(() => {
//    console.log('meow');
//    console.log('done - เขียน Cat แล้ว 1 ตัว');
//  });
//}
//function mockProductData() {
//  const shirt = new Product({
//    url: "https://picsum.photos/800/600",
//    name: "Nike Shirt",
//    brand: "Nike",
//    price: 70,
//    stars: 5
//  });
//  shirt.save().then(() => {
//    console.log(shirt._id);
//  });
//}
//mockProductData();

function importDatajs() {
  products.forEach( (p) => {
    const product = new Product(p);
    product.save().then(() => {
      console.log(product._id);
    });
  });
}
// importDatajs();

const app = express();
app.use(bodyParser.json());

//app.get('/api/users', async (_, res) => {
//  const users = await User.find({});
//  res.send(users);
//});
app.use('/api/users', userRoutes);

// app.get('/api/cats', async (_, res) => {
//   const cats = await Cat.find({});
//   res.send(cats);
// });

// list ทั้งหมดของ products
app.get('/api/products', async (_, res) => {
  const products = await Product.find();
  res.send(products);
});

// product._id 
app.get('/api/product/:id', async (req, res) => {
  // console.log(req.headers)
  const product = await Product.findById(req.params.id);
  res.send(product);
})

// เริ่มเปิด server ที่ port 5000
app.listen(5000, () => {
  console.log('starting server แล้วเด้อ');
  console.log('ทดสอบ');
});
