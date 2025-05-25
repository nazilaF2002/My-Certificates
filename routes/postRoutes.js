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
router.post("/new_post", upload, createPost);
router.put("/edit/:id", upload, updatePost);

export default router;
