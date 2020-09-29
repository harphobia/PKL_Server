const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//addon
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
require("./configs/mysql");

//routes
const userRouters = require("./routers/userRouters");
const invoiceRouters = require("./routers/invoiceRouters");
const transaksiRouters = require("./routers/transRouters");

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to rest api umi motor",
  });
});

app.use("/users", userRouters);
app.use("/invoice", invoiceRouters);
app.use("/transaksi", transaksiRouters);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "End point of rest api not found",
  });
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server running on port ${port}`));
