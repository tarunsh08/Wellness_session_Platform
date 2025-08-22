import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getPublicSessions,
  getMySessions,
  getMySessionById,
  saveDraft,
  publishSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/sessions", getPublicSessions);
router.get("/my-sessions", requireAuth, getMySessions);
router.get("/my-sessions/:id", requireAuth, getMySessionById);
router.post("/my-sessions/save-draft", requireAuth, saveDraft);
router.post("/my-sessions/publish", requireAuth, publishSession);

export default router;
