const express = require("express");
const nunjucks = require("nunjucks");
const fetch = require("node-fetch");

const port = process.env.port || 3000;
const app = express();

app.use(express.static('css'));


nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");


app.get("/", function(request, result) {

  return fetch(`https://decath-product-api.herokuapp.com/categories`)
  .then(response => response.json())
  .then(categories => {
    //console.log(json);
    result.render("categories", {categories:categories});
  });

});// end of app.get


app.get("/categories/:categoryid/products", function(request, result) {

  return fetch(`https://decath-product-api.herokuapp.com/categories/${request.params.categoryid}/products`)
  .then(response => response.json())
  .then(products => {
    console.log(products);
    result.render("products",{products:products});

  });

});// end of app.get

app.get("/products/:productid",function(request,result) {
  return fetch(`https://decath-product-api.herokuapp.com/products/${request.params.productid}/`)
  .then(response => response.json())
  .then(product => {

    result.render("product_details", {product:product});

  });

});// end of app.get



app.listen(port, function() {
  console.log("Server listening on port : " + port);
});
