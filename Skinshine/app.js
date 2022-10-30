// calling the Express Library
const express = require("express");
//calling the function express
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
// library driver to connect Mongodb to our backend
const mongoose = require("mongoose");
const cors = require("cors");
// using specific constant
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//middleware
// makes the data understandable by Express
app.use(express.json());
// log data coming from the frontend with the default value tiny
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");


// constant from .env
const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
      // for avoid deprecating errors
    useNewUrlParser: true,
    useUnifiedTopology: true,
      // db name
    dbName: "Skinshine",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server that listening to the port 3000 with a callback is running .
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
