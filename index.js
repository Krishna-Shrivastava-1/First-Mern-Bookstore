import express, { response } from 'express';
import { PORT, mongoURL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './Models/Bookmodel.js';
const app = express();
import BooksRoute from './Routes/BooksRoute.js'
import cors from 'cors'
// Middlewares for parsing request body
app.use(express.json())


// Middleware for handling CORS Policy
// Option1 : Allow All Origins with Defalut of Cors(*)
app.use(cors())

// option 2  : Allow Custom Origins
// app.use(cors({
//     origin:'',
//     methods:['GET', 'POST' ,'DELETE', 'PUT' ],
//     allowedHeaders:['Content-Type']
// }))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to Mern Stack')
});

app.use('/books', BooksRoute)



mongoose.connect(mongoURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App  is listening to port : ${PORT}`);
        })
        console.log('APP connected to database')
    })
    .catch((error) => {
        console.log(error)
    })