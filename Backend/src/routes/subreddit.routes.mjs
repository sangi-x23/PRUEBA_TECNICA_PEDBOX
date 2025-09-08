import express from "express";
import { updateSubreddits } from "../controllers/subreddit.controller.mjs";
import { getSubreddits } from "../controllers/subreddit.controller.mjs";
import { getSubredditById } from "../controllers/subreddit.controller.mjs";
import authMiddleware from "../config/security.mjs";

const subredditRouter = express.Router();
subredditRouter.put("/update", authMiddleware, updateSubreddits);
subredditRouter.get("/subreddits", authMiddleware, getSubreddits);
subredditRouter.get("/subreddits/:id", authMiddleware, getSubredditById);

export default subredditRouter;