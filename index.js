// my imports
import express from 'express';
import methodOverride from "method-override";
import multer from 'multer';
// making the application
const app=express();
// useing port 3000
const port=3000;
// my data
let data=[
    {id:1, name:"Front-End Development",description:" I got this certificate from CTI(Code To Inspire) for completing 15 months web development.",images:"/images/font-end.jpg"},
    {id:2, name:"Web Development",description:"I got this certificate from USC(University of Southern California) for comleting introduction to web development course.",images:"/images/html.jpg"},
    {id:3, name:"English",description:"I got this certificate from JRS(Jesuit WorldWide Learining) for completing intermediate level.",images:"/images/intermedaite.jpg"},
    {id:4, name:"Python",description:"I got this certificate from  USC(University of Southern California) for completing introduction to python programming language.",images:"/images/python.jpg"},
    {id:5, name:"Soft Skills",description:"I got this certificate from W4Girls it was an e-Mentoring programme for eight weeks.",images:"/images/w4girls.jpg"},
    {id:6, name:"JavaScript",description:"I got this certificate from USC(University of Southern California) for completing the JavaScript Fundamentals course.",images:"/images/JavaScript.jpg"},
    {id:7, name:"English",description:"I got this certificate from JRS(Jesuit WorldWide Learining) for completing beginner level.",images:"/images/bigner.jpg"}
   
]
// I made this variable because of making the id for new posts
let newId=data.length+1;
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
app.get('/',(req,res)=>{
  let Emessage=req.query.Emessage;
  let text=req.query.text;
  let Dmessage=req.query.Dmessage;
  let message=req.query.message;
    res.render("index.ejs",{data:data,Emessage:Emessage,text:text,Dmessage:Dmessage,message:message});
    console.log(data);
})
// useing get method for displaying the new post page
app.get('/new_post',(req,res)=>{
    res.render("post.ejs");
})

// useing post methode for sending the new data from the new post page to home page as a new post 
app.post("/newpost", upload.single("image"), (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  const imagePath = req.file.path;
  // Remove the extra 'images' directory from imagePath
  const correctedImagePath = imagePath.replace('public\\', '').replace(/\\/g, '/');
// here I push the new object to my last array data
  data.push({ id: newId++, name: title, description: body, images: `/${correctedImagePath}` });
  console.log(data);
  // here I made a variable and setTimeout method for showing and hideing the notification message
  let message=true;
  setTimeout(()=>{
    message=false;
  },5000)
//  and here I used redirect methods whit some queries for showing the notification
  res.redirect("/?message=true&&text=Post Created Successfully");
   
});
// here I used delete method for delteting the spesific item by using id
app.delete('/delete/:id',(req,res)=>{
    data=data.filter(post=>{
      if(post.id != req.params.id){
        return post;
      }
    })

    let Dmessage=true;
    setTimeout(()=>{
      Dmessage=false;
    },5000)
    res.redirect("/?Dmessage=true&&text=Post deleted Successfully")
})
// here I used get method for showing the edit page whit the selected Item data
app.get("/edit/:id", (req, res) => {
  const itemId = req.params.id;
  const selectedItem = data.find(item => item.id == itemId);
  if (!selectedItem) {
      // Handle the case where no item is found with the given id
      return res.status(404).send("Item not found");
  }
  res.render("edit.ejs", { data: selectedItem });
  console.log("selecten item in edit "+selectedItem.images);
});

// and here I used put method to update the post data
app.put("/updated/:id", upload.single("image"), (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  let id = req.params.id;
  const selectedItem = data.find(item => item.id == id);
  // Store the original item 
  const originalItem = { ...selectedItem }; 
  selectedItem.name = title;
  selectedItem.description = body;
  if (req.file) {
    // If a new image is uploaded, update the image path
    selectedItem.images = '/'+req.file.path.replace('public\\', '').replace(/\\/g, '/');
  }
  if (
    selectedItem.name !== originalItem.name ||
    selectedItem.description !== originalItem.description ||
    (req.file && selectedItem.images !== originalItem.images)
  ) {
    let Emessage = true;
    setTimeout(() => {
      Emessage = false;
    }, 5000);
    res.redirect("/?Emessage=true&&text=Post Updated Successfully");
  } else {
    res.redirect(`/edit/${id}`);
  }
  console.log(data);
});
app.listen(port,()=>{
    console.log('the is running on port'+port);
})



