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
app.use(cors({
    // https://mohitlenka.netlify.app
    origin: 'https://mohitlenka.netlify.app/',
    credentials: true
}));
app.use(express.json());

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
