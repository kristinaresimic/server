import express from "express";
import SupplierSchema from "../../Models/Supplier.js";
const router = express.Router();

// @route GET /api/suppliers/getSuppliers
// @desc Getting all suppliers
router.get("/getSuppliers", async (req, res) => {
  try {
    const suppliers = await SupplierSchema.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(400).json(error);
  }
});

// @route POST /api/suppliers/createSupplier
// @desc Add new supplier
router.post("/createSupplier", (req, res) => {
  const supplier = new SupplierSchema({
    naziv: req.body.naziv,
    adresa: req.body.adresa,
    mesto: req.body.mesto,
  });
  supplier
    .save()
    .then(() => res.status(200).json(supplier))
    .catch((err) => res.status(500).json("Server Problem"));
});

// @route GET /api/suppliers/getSupplier/12
// @desc Get supplier by id
router.get("/getSuppliers/:id", (req, res) => {
  SupplierSchema.find({ _id: req.params.id }, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// @route PATCH /api/suppliers/updateSupplier/12
// @desc Update Supplier
router.patch("/updateSupplier/:id", async (req, res) => {
  const supplerUpdate = await SupplierSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        naziv: req.body.naziv,
        adresa: req.body.adresa,
        mesto: req.body.mesto,
      },
    },
    { new: true }
  );
  if (supplerUpdate) {
    res.status(200).json({ msg: "Uspešno ažurirano", supplier: supplerUpdate });
  } else {
    res.status(400).json({ msg: "Nesto nije uredu. Pokusajte kasnije" });
  }
});

// @route DELETE /api/suppliers/deleteSupplier/12
// @desc Delete Supplier
router.delete("/deleteSupplier/:id", async (req, res) => {
  const supplerDelete = await SupplierSchema.findByIdAndDelete({ _id: req.params.id });
  if (supplerDelete) {
    res.status(200).json({ msg: "Uspešno obrisano", supplier: supplerDelete });
  } else {
    res.status(400).json({ msg: "Nesto nije uredu. Pokusajte kasnije" });
  }
});

export default router;
