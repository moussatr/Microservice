const express = require("express");
require("./consumer");
const connectDatabase = require("./config/database");
const locationRoutes = require("./routes/locations");
require("dotenv").config();

const app = express();

const cors = require("cors");
app.use(cors());

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

connectDatabase();

app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Service location running on port ${PORT}`);
});
