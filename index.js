/*const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4000;

dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("<h1> Welcome to SUBY");
})*/

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Route imports
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

// ✅ Enable CORS for all origins (for development)
app.use(cors());

// Optional: restrict CORS for production
// app.use(cors({
//   origin: "https://your-frontend-domain.com",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully!"))
.catch((error) => console.error("MongoDB connection error:", error));

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

// ✅ Static file serving
app.use("/uploads", cors(), express.static(path.join(__dirname, "uploads")));

// ✅ Welcome route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SUBY</h1>");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server started and running at http://localhost:${PORT}`);
});