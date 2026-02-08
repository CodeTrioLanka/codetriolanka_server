import mongoose from 'mongoose';

const blogInteractionSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [{
        type: String, // User IDs or browser fingerprints
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the updatedAt timestamp before saving
blogInteractionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const BlogInteraction = mongoose.model('BlogInteraction', blogInteractionSchema);

export default BlogInteraction;
