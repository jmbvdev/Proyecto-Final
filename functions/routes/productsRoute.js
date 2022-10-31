const { Router } = require("express");
const getAllProducts = require("../controllers/getAllProducts.js");
const getAllProductsByType = require("../controllers/getAllProductsByType.js");
const getProductById = require("../controllers/getProductById.js");
const updateProduct = require("../controllers/updateProduct.js");
const createNewProduct = require("../controllers/createProduct.js");
const deleteProduct = require("../controllers/deleteProduct.js");

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
  .get("/:id", async (req, res, next) => {
    const id = req.params.id;
    //ver que firebase no me devuelve error si no lo encuentra, sino que no me devuelve datos de nada, solo el id que busque y q no encontro datos
    try {
      const product = await getProductById(id);
      res.status(200).send(product);
    } catch (err) {
      err.status = 404;
      next(err);
    }
  })
  // .post("/create", async (req, res, next) => {
  //   //revisar la parte de como devuelvo el producto creado
  //   const { categories, details, image, name, price, size, stock, type } =
  //     req.body;
  //   try {
  //     if (
  //       !categories ||
  //       !details ||
  //       !image ||
  //       !name ||
  //       !price ||
  //       !size ||
  //       !stock ||
  //       !type
  //     ) {
  //       return res.status(404).send("You miss an atribute");
  //     } else {
  //       const product = {
  //         categories,
  //         details,
  //         image,
  //         name,
  //         price,
  //         size,
  //         stock,
  //         type,
  //       };
  //       const id = await createProduct(product);
  //       res.status(203).send({
  //         message: "Created",
  //         product: {
  //           id: id.id,
  //           data: product,
  //         },
  //       });
  //     }
  //   } catch (err) {
  //     err.status = 404;
  //     next(err);
  //   }
  // })

  .post("/create", async (req, res, next) => {
    //revisar la parte de como devuelvo el producto creado

    const {
      categories,
      details,
      image,
      place,
      name,
      price,
      size,
      stock,
      type,
      uid,
      logicalDeletion,
    } = req.body;

    try {
      if (
        !categories ||
        !details ||
        !image ||
        !place ||
        !name ||
        !price ||
        !size ||
        !stock ||
        !type ||
        !uid
      ) {
        return res.status(404).send("You miss an attribute");
      } else {
        const product = {
          categories,
          details,
          image,
          place,
          name,
          price,
          size,
          stock,
          type,
          uid,
          logicalDeletion,
        };
        const newProduct = await createNewProduct(product, uid);
        res.status(203).send(newProduct);
      }
    } catch (err) {
      err.status = 404;
      next(err);
    }
  })

  .put("/:id/edit", async (req, res, next) => {
    //revisar como devuelvo el producto updateado
    const id = req.params.id;
    const data = req.body;
    try {
      const product = await updateProduct(id, data);
      res.status(200).send({ message: "Updated", data: product });
    } catch (err) {
      res.status(404).send(err.message);
    }
  })
  .delete("/:id/delete", async (req, res, next) => {
    const id = req.params.id;
    try {
      await deleteProduct(id);
      res.status(200).send({ message: "Delete completed" });
    } catch (err) {
      err.status = 404;
      next(err);
    }
  });
/* .get("/:type", async (req, res) => {
    const type = req.params.type; //se manda el type por param (plants, acc, maceta)
    try {
      const products = await getAllProductsByType(type);
      res.status(200).send(products);
    } catch (err) {
      err.status = 404;
      next(err);
    }
  }) */

/* .get("/chargefirsttime", async (req, res, next) => {
    try {
      let array = plants.map((d) => {
        return db.collection("products").add({ ...d, type: "plant" });
      });
      await Promise.all(array);
      return res.status(200).send("done");
    } catch (err) {
      return res.send(err);
    }
  }) */

module.exports = productsRoute;
