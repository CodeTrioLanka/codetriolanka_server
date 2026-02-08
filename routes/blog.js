import express from 'express';
import Comment from '../models/Comment.js';
import BlogInteraction from '../models/BlogInteraction.js';

const router = express.Router();

// Get blog interactions (likes count)
router.get('/:blogId/interactions', async (req, res) => {
    try {
        const { blogId } = req.params;

        let interaction = await BlogInteraction.findOne({ blogId });

        if (!interaction) {
            interaction = await BlogInteraction.create({ blogId, likes: 0, likedBy: [] });
        }

        res.json(interaction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching interactions', error: error.message });
    }
});

// Toggle like for a blog post
router.post('/:blogId/like', async (req, res) => {
    try {
        const { blogId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        let interaction = await BlogInteraction.findOne({ blogId });

        if (!interaction) {
            interaction = await BlogInteraction.create({
                blogId,
                likes: 1,
                likedBy: [userId],
            });
        } else {
            const userIndex = interaction.likedBy.indexOf(userId);

            if (userIndex > -1) {
                // User already liked, so unlike
                interaction.likedBy.splice(userIndex, 1);
                interaction.likes = Math.max(0, interaction.likes - 1);
            } else {
                // User hasn't liked, so add like
                interaction.likedBy.push(userId);
                interaction.likes += 1;
            }

            await interaction.save();
        }

        res.json(interaction);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling like', error: error.message });
    }
});

// Get all comments for a blog post
router.get('/:blogId/comments', async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blogId }).sort({ date: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
});

// Add a new comment
router.post('/comments', async (req, res) => {
    try {
        const { blogId, name, email, text } = req.body;

        if (!blogId || !name || !email || !text) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const comment = await Comment.create({
            blogId,
            name,
            email,
            text,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            replies: [],
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
});

// Add a reply to a comment
router.post('/comments/:commentId/reply', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { name, email, text } = req.body;

        if (!name || !email || !text) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.replies.push({
            commentId,
            name,
            email,
            text,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        });

        await comment.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reply', error: error.message });
    }
});

export default router;
