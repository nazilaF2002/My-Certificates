import express from "express";
import {
  getAllposts,
  deletePost,
  createPost,
  updatePost,
  getpost,
  getPostpage,
} from "../controllers/postController.js";
import upload from "../middlewares/postMiddleware.js";
const router = express.Router();

router.get("/", getAllposts);
router.get("/new_post", getPostpage);
router.get("/edit/:id", getpost);
router.delete("/delete/:id", deletePost);
router.post("/new_post", upload.single("image"), createPost);
router.put("/edit/:id", upload.single("image"), updatePost);

export default router;
