import express from "express";
import ProductSchema from "../../Models/Products.js";
const router = express.Router();

// @route GET /api/products/getProducts
// @desc Getting all products
router.get("/getProducts", async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

// @route POST /api/products/createProduct
// @desc Add new product
router.post("/createProduct", (req, res) => {
  const product = new ProductSchema({
    naziv: req.body.naziv,
    cena: req.body.cena,
    jedinicaMere: req.body.jedinicaMere,
  });
  product
    .save()
    .then(() => res.status(200).json(product))
    .catch((err) => res.status(500).json("Nesto nije uredu. Pokusajte kasnije"));
});

// @route GET /api/products/getProduct/12
// @desc Get product by id
router.get("/getProducts/:id", (req, res) => {
  ProductSchema.find({ _id: req.params.id }, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// @route PATCH /api/products/updateProduct/12
// @desc Update products
router.patch("/updateProduct/:id", async (req, res) => {
  const productUpdate = await ProductSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        naziv: req.body.naziv,
        cena: req.body.cena,
        jedinicaMere: req.body.jedinicaMere,
      },
    },
    { new: true }
  );
  if (productUpdate) {
    res.status(200).json({ msg: "Uspešno ažurirano", product: productUpdate });
  } else {
    res.status(400).json({ msg: "Nesto nije uredu. Pokusajte kasnije" });
  }
});

// @route DELETE /api/products/deleteProduct/12
// @desc Delete products
router.delete("/deleteProduct/:id", async (req, res) => {
  const productDelete = await ProductSchema.findByIdAndDelete({ _id: req.params.id });
  if (productDelete) {
    res.status(200).json({ msg: "Uspešno obrisano", product: productDelete });
  } else {
    res.status(400).json({ msg: "Nesto nije uredu. Pokusajte kasnije" });
  }
});

export default router;
