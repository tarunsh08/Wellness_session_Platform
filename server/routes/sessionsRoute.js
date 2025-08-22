import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getPublicSessions,
  getMySessions,
  getMySessionById,
  createDraft,
  updateDraft,
  publishSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/sessions", getPublicSessions);
router.get("/my-sessions", requireAuth, getMySessions);
router.get("/my-sessions/:id", requireAuth, getMySessionById);
router.post("/my-sessions/save-draft", requireAuth, createDraft); // Create a new draft
router.put("/my-sessions/save-draft/:id", requireAuth, updateDraft); // Update an existing draft
router.post("/my-sessions/publish/:id", requireAuth, publishSession);

export default router;
