const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const passwordRoutes = require('./routes/passwordRoutes');
const { connectToDatabase } = require('./config/database');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors(
  // {
  //   origin: ["https://pass-manager-frontend-blush.vercel.app"],
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   credentials: true
  // }
));

app.get("/",(req, res) => {
  res.json("Hello");
})


app.use('/passwords', passwordRoutes);


async function startServer() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');
    
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
