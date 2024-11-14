const express = require("express");
const connectDatabase = require("./config/database");
const { connectBroker } = require("./messageBroker");
const annoncesRoutes = require("./routes/annonces");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(cors({ origin: "http://localhost:3000" }));

require("dotenv").config();
app.use(express.json());

connectDatabase();

app.use("/api/annonces", annoncesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Service Annonce running on port ${PORT}`);
});
