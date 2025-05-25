import express from "express";
import {
  getAllposts,
  deletePost,
  createPost,
  updatePost,
  getpost,
  getPostpage,
} from "../controllers/postController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  // here I determine where my images should be save
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  // and here determine the name of my images
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.get("/", getAllposts);
router.get("/new_post", getPostpage);
router.get("/edit/:id", getpost);
router.delete("/delete/:id", deletePost);
router.post("/new_post", upload.single("image"), createPost);
router.put("/edit/:id", upload.single("image"), updatePost);

export default router;
