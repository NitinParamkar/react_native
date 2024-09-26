const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
//const AgoraRTC = require('agora-rtc-sdk');
const cookieParser = require('cookie-parser');
const { ExpressPeerServer } = require('peer');

const app = express();
const connect = require("./config/database");
//const client = AgoraRTC.createClient({mode: "rtc", codec: "vp8"});

// Debugging: Log the current directory and important paths
console.log('Current directory:', __dirname);
console.log('User model path:', path.join(__dirname, 'models', 'User.js'));
console.log('User model exists:', fs.existsSync(path.join(__dirname, 'models', 'User.js')));

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});