import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
 
dotenv.config();
const { DB_HOST, PORT } = process.env;


//TgqkK8$dGVA@WRe

// const DB_HOST = "mongodb+srv://iryna-node-js:TgqkK8$dGVA@WRe@cluster0.nynyolw.mongodb.net/db-contacts?retryWrites=true&w=majority"
//mongodb+srv://iryna-node-js:<password>@cluster0.nynyolw.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://iryna-node-js:TgqkK8$dGVA@WRe@cluster0.nynyolw.mongodb.net/
mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log("Database connection successful"))
  })
  .catch(error => {
  console.log(error.message);
    process.exit(1);
}
  )

