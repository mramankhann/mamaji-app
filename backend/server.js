require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mamaji");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Routes
const auth = require('./routes/auth.routes');
const complaints = require('./routes/complaint.routes');
const broadcasts = require('./routes/broadcast.routes');
const events = require('./routes/event.routes');

app.use('/api/auth', auth);
app.use('/api/complaints', complaints);
app.use('/api/broadcasts', broadcasts);
app.use('/api/events', events);

app.get('/', (req, res) => {
    res.send('Suchna Kendra (Mamaji) API is running...');
});

// Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
