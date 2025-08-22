import Session from "../models/session.model.js";

// GET /sessions - Public sessions
export const getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: "published" });
  res.json(sessions);
};

// GET /my-sessions - User’s own sessions
export const getMySessions = async (req, res) => {
  const sessions = await Session.find({ user: req.user });
  res.json(sessions);
};

// GET /my-sessions/:id
export const getMySessionById = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user: req.user });
  if (!session) return res.status(404).json({ message: "Session not found" });
  res.json(session);
};

// POST /my-sessions/save-draft
export const saveDraft = async (req, res) => {
  const { title, description } = req.body;

  let session = await Session.findOne({ user: req.user, title });
  if (session) {
    session.description = description;
    session.status = "draft";
    await session.save();
  } else {
    session = await Session.create({ user: req.user, title, description, status: "draft" });
  }

  res.json(session);
};

// POST /my-sessions/publish
export const publishSession = async (req, res) => {
  try {
    console.log('Publish session request received');
    console.log('Request user:', req.user);
    console.log('Request body:', req.body);
    
    const { title, description } = req.body;
    
    if (!req.user?._id) {
      console.log('User information missing in request');
      return res.status(400).json({ error: 'User information is missing' });
    }

    console.log('Creating session with user ID:', req.user._id);
    const session = await Session.create({
      user: req.user._id,
      title,
      description,
      status: "published",
    });

    console.log('Session created successfully:', session);
    res.status(201).json(session);
  } catch (error) {
    console.error('Error in publishSession:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ error: 'Failed to publish session' });
  }
};
