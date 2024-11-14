const express = require("express");
const connectDatabase = require("./config/database");
const { connectBroker } = require("./messageBroker");
const locationRoutes = require("./routes/locations");
require("dotenv").config();

const app = express();

const cors = require("cors");
app.use(cors());

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

connectDatabase();

connectBroker();

app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Service Consultation running on port ${PORT}`);
});
