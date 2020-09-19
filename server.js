import express from "express";
import mogoose from "mongoose";
// wi7A0ahZCrtfAzu8
// mongodb+srv://kristina:<password>@cluster0.wxrjy.mongodb.net/<dbname>?retryWrites=true&w=majority

//routers
import supplierRouter from "./routes/api/supplier.js";
import productRouter from "./routes/api/product.js";
import marketRouter from "./routes/api/market.js";
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRouter);
app.use("/api/markets", marketRouter);

mogoose
  .connect(
    "mongodb+srv://kristina:wi7A0ahZCrtfAzu8@cluster0.wxrjy.mongodb.net/medjasDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => app.listen(PORT, () => console.log(`Server runing on port ${PORT}`)))
  .catch((err) => console.log(err));
