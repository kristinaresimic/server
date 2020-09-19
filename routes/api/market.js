import express from "express";
import Market from "../../Models/Market.js";
import MarketSchema from "../../Models/Market.js";
const router = express.Router();

// @route GET /api/market/getMarkets
// @desc Getting all markets
router.get("/getMarkets", async (req, res) => {
  try {
    const markets = await MarketSchema.find();
    res.status(200).json(markets);
  } catch (error) {
    res.status(400).json(error);
  }
});

// @route POST /api/markets/createMarket
// @desc Add new market
router.post("/createMarket", (req, res) => {
  const market = new MarketSchema({
    naziv: req.body.naziv,
    grad: req.body.grad,
    adresa: req.body.adresa,
  });
  market
    .save()
    .then(() => res.status(200).json(market))
    .catch((err) => res.status(500).json("Nesto nije uredu. Pokusajte kasnije"));
});

// @route GET /api/markets/getMarket/12
// @desc Get market by id
router.get("/getMarket/:id", (req, res) => {
  MarketSchema.find({ _id: req.params.id }, (err, results) => {
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
router.patch("/updateMarket/:id", async (req, res) => {
  const marketUpdate = await MarketSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        naziv: req.body.naziv,
        grad: req.body.grad,
        adresa: req.body.adresa,
      },
    },
    { new: true }
  );
  if (marketUpdate) {
    res.status(200).json({ msg: "Uspešno ažurirano", market: marketUpdate });
  } else {
    res.status(400).json({ msg: "Nesto nije uredu. Pokusajte kasnije" });
  }
});

// @route DELETE /api/products/deleteProduct/12
// @desc Delete products
router.delete("/deleteMarket/:id", async (req, res) => {
  const marketDelete = await MarketSchema.findByIdAndDelete({ _id: req.params.id });
  if (marketDelete) {
    res.status(200).json({ msg: "Uspešno obrisano", market: marketDelete });
  } else {
    res.status(400).json({ msg: "Nesto nije uredu. Pokusajte kasnije" });
  }
});

export default router;
