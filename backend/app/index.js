const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookingsRouter = require("./controllers/bookingController");

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Use routes defined in bookingsController
app.use("/api/bookings", bookingsRouter);
app.post('/api/bookings', (req, res) => {
 
  return res.status(201).json({
    message: 'Booking created successfully',
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
