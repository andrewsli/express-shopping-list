const express = require("express")
const app = express()
const itemRoutes = require("./routes/items")
let items = require("./fakeDb")

app.use(express.json())
app.use("/items",itemRoutes);

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);

//   return res.json({
//     error: err.message,
//   });
// });
module.exports = app