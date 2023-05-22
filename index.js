//Imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/auth.js';
import blogRouter from './routes/blog.js';

dotenv.config({ path: './config.env' });

//instances

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    // origin: 'https://mohitlenka.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200,
    origin: 'http://localhost:3000',
}));

//Mongodb connection

mongoose.set('strictQuery', true);
mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log("MongoDB connected.")
}).catch((e) => console.log(e.name));

// const db = mongoose.connection;

// db.once('open', () => {
//     const testUsers = db.collection('testusers');
//     const changeStream = testUsers.watch();
//     changeStream.on("change", (change) => {
//         console.log(change);

//         if (change.operationType === 'insert') {
//             const userDetails = change.fullDocument;
//             console.log(userDetails);
//         }
//     })
// })


//API's

app.use(router);
app.use(blogRouter);

app.get('/', (req, res) => {
    res.send("Encrypted Backend.")
});


//Listener

app.listen(PORT, () => {
    console.log(`Successfully started on http://localhost:${PORT}`)
});
