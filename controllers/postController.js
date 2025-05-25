import originalData from "../data.js";
let data = [...originalData];

// I made this variable because of making the id for new posts
let newId = data.length + 1;
export const createPost = async (req, res) => {
  try {
    let title = req.body.title;
    let body = req.body.body;
    const correctedImagePath = `/images/${req.file.filename}`;
    // here I push the new object to my last array data
    data.push({
      id: newId++,
      name: title,
      description: body,
      images: `${correctedImagePath}`,
    });
    console.log(data);
    // here I made a variable and setTimeout method for showing and hideing the notification message
    let message = true;
    setTimeout(() => {
      message = false;
    }, 5000);
    //  and here I used redirect methods whit some queries for showing the notification
    res.redirect("/?message=true&&text=Post Created Successfully");
  } catch (err) {
    console.log("create new user error", err);
  }
};

export const getPostpage = async (req, res) => {
  try {
    res.render("post.ejs");
  } catch (err) {}
};

export const getAllposts = async (req, res) => {
  try {
    let Emessage = req.query.Emessage;
    let text = req.query.text;
    let Dmessage = req.query.Dmessage;
    let message = req.query.message;
    res.render("index.ejs", {
      data: data,
      Emessage: Emessage,
      text: text,
      Dmessage: Dmessage,
      message: message,
    });
    console.log(data);
  } catch (err) {
    console.log("get all user error", err);
  }
};

export const getpost = (req, res) => {
  try {
    const itemId = req.params.id;
    const selectedItem = data.find((item) => item.id == itemId);
    if (!selectedItem) {
      // Handle the case where no item is found with the given id
      return res.status(404).send("Item not found");
    }
    res.render("edit.ejs", { data: selectedItem });
    console.log("selecten item in edit " + selectedItem.images);
  } catch (err) {
    console.log("get all user error", err);
  }
};

export const updatePost = (req, res) => {
  try {
    let title = req.body.title;
    let body = req.body.body;
    let id = req.params.id;
    const selectedItem1 = data.find((item) => item.id == id);
    // Store the original item
    const originalItem = { ...selectedItem1 };
    selectedItem1.name = title;
    selectedItem1.description = body;
    if (req.file) {
      // If a new image is uploaded, update the image path
      selectedItem1.images =
        "/" + req.file.path.replace("public/", "").replace(/\\/g, "/");
    }
    if (
      selectedItem1.name !== originalItem.name ||
      selectedItem1.description !== originalItem.description ||
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
  } catch (err) {
    console.log("get all user error", err);
  }
};

export const deletePost = (req, res) => {
  try {
    data = data.filter((post) => {
      if (post.id != req.params.id) {
        return post;
      }
    });
    let Dmessage = true;
    setTimeout(() => {
      Dmessage = false;
    }, 5000);
    res.redirect("/?Dmessage=true&&text=Post deleted Successfully");
  } catch (err) {}
};
