//Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/auth.js';

dotenv.config({ path: './config.env' });

//instances

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares

app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mohitlenka.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});
app.use(cors({
    origin: 'https://mohitlenka.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200,
    // origin: 'https://mohitlenka.netlify.app',
    // // origin: 'http://localhost:3000',
    // credentials: true
}));

//Mongodb connection

mongoose.set('strictQuery', true);
mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log("MongoDB connected.")
}).catch((e) => console.log(e.name));


//API's

app.use(router);

app.get('/', (req, res) => {
    res.send("Encrypted Backend.")
});


//Listener

app.listen(PORT, () => {
    console.log(`Successfully started on http://localhost:${PORT}`)
});
