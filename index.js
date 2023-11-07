import express from "express";
import { create } from "express-handlebars"
import mongoose, { mongo } from "mongoose";
import AuthRoutes from "./routes/auth.js";
import ProductsRoutes from "./routes/products.js";
import dotenv from 'dotenv';
import flash from 'connect-flash';
import session from "express-session";
dotenv.config();

const app = express();

app.use(express.static('public'));
const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine("hbs", hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: 'Coder', resave: false, saveUninitialized: false }))
app.use(flash())

app.use(AuthRoutes)
app.use(ProductsRoutes)

const startApp = () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log("Mongo DB muvaffaqiyatli bog`landi...");
            }).catch(e => console.log(e));
        const PORT = process.env.PORT || 4100;
        app.listen(PORT, () => console.log(`Server ishga tushirilmoqda...`));
    } catch (error) {
        console.log(error)
    }
}

startApp()


