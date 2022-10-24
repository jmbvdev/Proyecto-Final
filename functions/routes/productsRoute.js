const { Router } = require("express");
const getAllProducts = require("../controllers/getAllProducts.js");
const getAllProductsByType = require("../controllers/getAllProductsByType.js");
const getProductById = require("../controllers/getProductById.js");
const updateProduct = require("../controllers/updateProduct.js");

const productsRoute = Router();

productsRoute
  .get("/all", async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.status(200).send(products);
    } catch (err) {
      err.status = 404;
      next(err);
    }
  })
  .get("/:type", async (req, res) => {
    const type = req.params.type; //se manda el type por param (plants, acc, maceta)
    try {
      const products = await getAllProductsByType(type);
      res.status(200).send(products);
    } catch (err) {
      err.status = 404;
      next(err);
    }
  })
  /* .get("/", async (req, res) => {
    const name = req.query.name;
    if (!name) next();
    else {
      //firebase no soporta buscar una subquery name, asiq no serviria para la barra de busqueda escirbir monstera y que el name sea monstera deliciosa, porque es una substring. hay q usar un servicio externo. averiguar sobre Elastic que es el que recomienda firebase.
    }
  }) */
  .get(":id", async (req, res) => {
    const id = req.params.id;
    try {
      const product = await getProductById(id);
      res.status(200).send(product);
    } catch (err) {
      err.status = 404;
      next(err);
    }
  })
  .post("/create", async (req, res) => {
    const { categories, details, image, name, price, size, stock, type } =
      req.body;
    try {
      if (
        !categories ||
        !details ||
        !image ||
        !name ||
        !price ||
        !size ||
        !stock ||
        !type
      ) {
        return res.status(404).send("You miss an atribute");
      } else {
        const product = await createProduct(
          categories,
          details,
          image,
          name,
          price,
          size,
          stock,
          type
        );
        res.status(203).send({
          message: "Created",
          id: product.id,
          product: product.data(),
        });
      }
    } catch (err) {
      err.status = 404;
      next(err);
    }
  })
  .put(":id/edit", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const product = await updateProduct(id, data);
      res
        .status(200)
        .send({ message: "Updated", id: product.id, product: product.data() });
    } catch (err) {
      res.status(404).send(err.message);
    }
  })
  .delete(":id/delete", async (req, res) => {
    const id = req.params.id;
    try {
      await deleteProduct();
      res.status(200).send({ message: "Delete completed" });
    } catch (err) {
      err.status = 404;
      next(err);
    }
  });

module.exports = productsRoute;
