const express = require("express");
const routes = require("./routes");
const app = express();
const path = require("path");
const apiRoutes = require("./routes/index.js");
const noteRoutes = require("./routes/noteRoutes.js");
const PORT = process.env.port || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)
app.use(express.static('public'));
app.use("/", apiRoutes);
app.use("/notes", noteRoutes);

app.listen(PORT, () => 
  console.log(`Express server currently running on port: ${PORT}`)
);