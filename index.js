// my imports
import express from 'express';
import methodOverride from "method-override";
import multer from 'multer';
import { getAllposts,deletePost,createPost,updatePost ,getpost,getPostpage} from './controllers/postController.js';

// making the application
const app=express();
// useing port 3000
const port=3001;
// used this middleware for our static files
app.use(express.static("public"));
// using multer for uploding images
const storage = multer.diskStorage({
 // here I determine where my images should be save
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  // and here determine the name of my images
  filename: function (req, file, cb) {
    cb(null,file.originalname )
  }
})
const upload = multer({ storage: storage })
// useing this middleware for useing the body information
app.use(express.urlencoded({extended:true}));
// Add the method-override middleware for useing put and delet method in my forms
app.use(methodOverride("method"));
// using get method for displaying the home page and send my data object with that
app.get('/',getAllposts);
// useing get method for displaying the new post page
app.get('/new_post',getPostpage);
// useing post methode for sending the new data from the new post page to home page as a new post 
app.post("/new_post", upload.single("image"),createPost);
// here I used delete method for delteting the spesific item by using id
app.delete('/delete/:id',deletePost);
// here I used get method for showing the edit page whit the selected Item data
app.get("/edit/:id",getpost);
// and here I used put method to update the post data
app.put("/edit/:id", upload.single("image"), updatePost);


app.listen(port,()=>{
    console.log('the is running on port'+port);
})



