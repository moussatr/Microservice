const express = require("express");
// require("./consumer");
const connectDatabase = require("./config/database");
const consultationRoutes = require("./routes/consultations");

require("dotenv").config();

const app = express();

const cors = require("cors");

app.use(cors());

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

connectDatabase();

app.use("/api/consultations", consultationRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Service Consultation running on port ${PORT}`);
});
