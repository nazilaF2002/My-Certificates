import express from 'express';
import methodOverride from "method-override";
import postRoutes from './routes/postRoutes.js';
const app = express();
// used this middleware for our static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Add the method-override middleware for useing put and delet method in my forms
app.use(methodOverride("method"));

app.use('/',postRoutes);


export default app;

