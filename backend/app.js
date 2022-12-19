import { connectDatabase } from './config/pool.js';
import bodyParser from 'body-parser';
import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { auth } from './middleware/auth.js';
import { jwtGenerator } from '../../Capstone/backend/jwt/jwtGenerator.js';
import data from './data.js';
import fileUpload from 'express-fileupload';
import errorHandler from './middleware/handlingError.js';

const pool = connectDatabase();
const app = express();
const PORT = 8000;
const currentDate = new Date();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(errorHandler);

//CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  //req methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE' //'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // req headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-reqed-With,content-type',
    'Sec-Fetch-Mode',
    'Sec-Fetch-Site',
    'Sec-Fetch-Dest'
  );
  // Set to true if the website need to include cookies in the reqs sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true); //false
  res.setHeader('Sec-Fetch-Mode', 'navigate');
  res.setHeader('Sec-Fetch-Mode', 'no-cors');
  res.setHeader('Sec-Fetch-Site', 'cross-site');
  res.setHeader('Sec-Fetch-Site', 'same-origin');
  res.setHeader('Sec-Fetch-Dest', 'document');
  res.setHeader('Sec-Fetch-Dest', 'image');
  // Pass to next layer of middleware
  next();
});

//suppliers
app.get(`/suppliers`, async (req, res) => {
  try {
    const suppliers = await pool.query(
      'SELECT * FROM public.supplier ORDER BY supplierid ASC'
    );
    res.json(suppliers.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put('/suppliers/update/:supplierid', async (req, res) => {
  try {
    //take the username and password from the req.body
    const { supplierid } = req.params;
    const updated_on = currentDate;
    const {  
      supplieremail, 
      suppliercontact, 
      representative, } = req.body;
    const newSupplier = await pool.query(
      `UPDATE public.supplier SET supplieremail=$1, suppliercontact=$2, representative=$3, updated_on=$4 WHERE supplierid = $5`,
      [
        supplieremail,
        suppliercontact,
        representative,
        updated_on, supplierid
      ]
    );
    return res.status(201).send('Successfully updated.');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});
//create supplier-okay
app.post('/suppliers/add', async (req, res) => {
  try {
    //take the username and password from the req.body
    const added_on = currentDate;
    const { 
      businessname, 
      supplieremail, 
      suppliercontact, 
      representative, 
      tin,
      tax} =
      req.body;
    const suppliercode = uuidv4();
    const supplierid = suppliercode.slice(0, 6);
    const product = await pool.query(
      `INSERT INTO public.supplier(supplierid, businessname, supplieremail, suppliercontact, representative, tin, added_on, suppliercode,tax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        supplierid,
        businessname,
        supplieremail,
        suppliercontact,
        representative,
        tin,
        added_on,
        suppliercode,
       tax
      ]
    );
    return res.status(201).send(`Successfully added.`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});


//table inner join
app.get('/purchase/queries/:productname', async (req, res) => {
  try {
    const { productname } = req.query;
    const query = await pool.query(
      'SELECT product.productname, product.productid, product.quantity, product.businessname FROM public.product LEFT JOIN public.supplier ON supplier.supplierid = supplier.businessname WHERE productname=$1', [productname])
  } catch (err) {
    console.log(err);
  }
});

//receiving of products
// app.post('/delivery/add', async(req, res) => {
//   try{
//     const delivery = await pool.query('INSERT INTO')
// }
// });

//update product: productname, brand, category - okay
app.put('/products/update/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const date_updated = currentDate;
    const { productname, brand, category, businessname } = req.body;
    console.log(productname, category, brand);
    const newProduct = await pool.query(
      'UPDATE public.product SET productname=$1, brand=$2, category=$3, date_updated=$4, businessname=$5 WHERE productid=$6',
      [productname, brand, category, date_updated, businessname, productid]
    );
      return res.status(200).send('Update successful.');    
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

//get all products with pagination
app.get('/products/search', async (req, res) => {
  try {
    const { q } = req.query;
    const products = await pool.query('SELECT * FROM public.product ORDER BY productid ASC');
    const keys = ['productname', 'brand', 'category', 'decription', 'productcode'];
    console.log(q);
    const search = (data) => {
      keys.some((keys) => item[keys].toLowerCase().includes(q))
    };
    res.json(search(products).splice(0,3))
  } catch (err) {
    console.log(err.message)
  }
});

//all name - okay
app.get('/products/productname', async (req, res) => {
  try {
    const products = await pool.query('SELECT productname FROM public.product');
    res.json(products.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//all brand - okay
app.get('/products/suppliers/:businessname', async (req, res) => {
  try {
    const { businessname } = req.params;
    const products = await pool.query(
      'SELECT * FROM public.product WHERE businessname=$1', [businessname]
    );
    res.json(products.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//all category - okay
app.get('/products/category', async (req, res) => {
  try {
    const products = await pool.query('SELECT category FROM public.product');
    res.json(products.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//by category - okay
app.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const categories = await pool.query('SELECT * FROM public.product WHERE category=$1',
      [category]
    );
    res.json(categories.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get product by id-okay
app.get('/products/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const productId = await pool.query('SELECT * FROM public.product WHERE productid=$1', [productid]);
    res.json(productId.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//by product name - okay
app.get('/products/name/:productname', async (req, res) => {
  try {
    const {productname } = req.params;
    const names = await pool.query('SELECT * FROM public.product WHERE productname=$1', [productname]);
    return res.json(names.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//all brand - okay
app.get('/products/:brand', async (req, res) => {
  try {
    const products = await pool.query('SELECT brand FROM public.product');
    res.json(products.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//by brand - okay
app.get('/products/brand/:brand', async (req, res) => {
  try {
    const { brand } = req.params;
    const brands = await pool.query('SELECT * FROM public.product WHERE brand=$1', [brand]);
    return res.json(brands.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//by code - okay
app.get('/products/code/:productcode', async (req, res) => {
  try {
    const { productcode } = req.params;
    const productCode = await pool.query('SELECT * FROM public.product WHERE =$1', [productcode]);
    return res.json(productCode.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//create product-okay
app.post('/products/add', async (req, res) => {
  try {
    //take the username and password from the req.body
    const { productname, quantity, unitprice, sellingprice, unitmeasure, category, brand, description, businessname } =
      req.body;
    const productcode = uuidv4();
    const productid = productid.slice(0, 6);
    const product = await pool.query('SELECT businessname FROM public.supplier where businessname=$1', [businessname]);

    const newProduct = await pool.query(
      `INSERT INTO public.product(productid, productname, quantity, unitprice, sellingprice, unitmeasure, category, brand, description, productcode, created_on, businessname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ) RETURNING *`,
      [
        productid,
        productname,
        quantity,
        unitprice,
        sellingprice,
        unitmeasure,
        category,
        brand,
        description,
        productcode,
        currentDate,
        businessname,
      ]
    );
    return res.status(201).send(`Product ${productname} successfully added.`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//change to archive
app.delete('/products/list/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const remove = await pool.query('DELETE FROM public.product WHERE productid=$1', [productid]);
    return res.status(201).send('Product deleted.');
  } catch (err) {
    console.log(err.message);
  }
});

//get all products - okay
app.get('/products', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM public.product ORDER BY productid ASC');
    res.json(products.rows);
  } catch (err) {
    console.log(err.message)
  }
});

//test fetch - feature page
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
//test fetch - feature page (test data for ecommerce)
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
//test data for ecommerce
app.get('/api/products/id/:id', async (req, res) => {
  const product = data.products.find((x) => x.id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//USERS
app.put('/users/update/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { firstname, lastname, email, contactno } = req.body;
    const reference = await pool.query(
      'UPDATE public.user SET firstname=$1, lastname=$2, email=$3, contactno=$4 WHERE user_id=$5',
      [firstname, lastname, email, contactno, user_id]
    );
    res.send('Update Success.');
  } catch (err) {
    console.log(err.message);
  }
});

//get users
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM public.user ORDER BY user_id ASC');
    res.json(users.rows);
  } catch (err) {
    console.log(err.message)
  }
});
//remove users
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM public.user ORDER BY user_id ASC');
    res.json(users.rows);
  } catch (err) {
    console.log(err.message)
  }
});

//setup the route
//register
app.post('/register', async (req, res) => {res
  try {
    const { username, password, firstname, lastname, email, contactno } = req.body;
    const unique_id = uuidv4();
    const user_id = unique_id.slice(0, 6);
    const user = await pool.query(
      `SELECT * FROM public.user WHERE username=$1`,
      [username]
    );
    if (user.rows.length > 0) {
      res.status(401).send('User already exists.');
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      `INSERT INTO public.user(user_id, username, password, firstname, lastname, email, date_created, unique_id, contactno) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        user_id,
        username,
        bcryptPassword,
        firstname,
        lastname,
        email,
        currentDate,
        unique_id,
        contactno,
      ]
    );
    const token = jwtGenerator(newUser.rows[0]);
    return res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query(
      `SELECT * FROM public.user WHERE username=$1`,
      [username]
    );
    if (user.rows.length < 0) {
      return res.status(401).send('User does not exists.');
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json('Password or Username is incorrect.');
    }
    const token = jwtGenerator(user.rows[0]);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      msg: 'Unauthenticated',
    });
  }
});

//verify
app.get('/verify', auth, async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ msg: 'Unauthenticated' });
  }
});

//immature
app.get('/immature', async (req, res) => {
  res.send('Great tool to start with your business!')
});

//db connect
pool.connect((error) => {
    if (error) {
    console.log(error);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} on ${currentDate}`);
    });
  }
});