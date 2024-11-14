const express = require("express");
require("./consumer");
const connectDatabase = require("./config/database");
const listingRoutes = require("./routes/listings");
require("dotenv").config();

const app = express();

const cors = require("cors");
app.use(cors());

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

connectDatabase();

app.use("/api/listings", listingRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Service listing running on port ${PORT}`);
});
