import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const draftSaveSchema = z.object({
  draftId: z.string().optional(),
  title: z.string().max(80).optional(),
  description: z.string().max(300).optional(),
  content: z.string().optional(),
  category: z.enum(["yoga", "meditation", "breathwork", "stretching", "other"]).optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  durationMins: z.number().int().min(5).max(180).optional(),
  tags: z.array(z.string().max(20)).max(8).optional(),
  coverImage: z.string().url().optional(),
  autosaveVersion: z.number().int().min(1).optional()
});

export const publishSchema = z.object({
  draftId: z.string()
});

export const publishRules = z.object({
  title: z.string().min(3).max(80),
  description: z.string().min(20).max(300),
  content: z.string().min(50),
  category: z.enum(["yoga", "meditation", "breathwork", "stretching", "other"]),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  durationMins: z.number().int().min(5).max(180),
  tags: z.array(z.string().max(20)).max(8).optional(),
  coverImage: z.string().url().optional()
});
