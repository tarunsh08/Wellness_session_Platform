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

// POST /my-sessions/save-draft - Create a new draft
export const createDraft = async (req, res) => {
  try {
    const { title, type, content } = req.body;
    const session = await Session.create({
      user: req.user._id,
      title: title || 'Untitled Session',
      type: type || '',
      content: content || '',
      status: "draft",
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create draft' });
  }
};

// PUT /my-sessions/save-draft/:id - Update an existing draft
export const updateDraft = async (req, res) => {
  try {
    const { title, type, content } = req.body;
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, type, content, status: 'draft' },
      { new: true } // Return the updated document
    );

    if (!session) {
      return res.status(404).json({ message: "Draft not found or you don't have permission to edit it." });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update draft' });
  }
};

// POST /my-sessions/publish/:id
export const publishSession = async (req, res) => {
  try {
    const { title, type, content } = req.body;
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, type, content, status: 'published' },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found or you don't have permission to publish it." });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error('Error in publishSession:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ error: 'Failed to publish session' });
  }
};
