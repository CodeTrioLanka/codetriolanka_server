# Blog Backend API

MongoDB-based backend for blog interactions (likes, comments, replies).

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/blog_database
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/blog_database

PORT=5000
NODE_ENV=development
```

### 3. Install MongoDB (if using local)

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and run MongoDB service

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Create account at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on: `http://localhost:5000`

## API Endpoints

### Blog Interactions

#### Get Interactions
```
GET /api/blog/:blogId/interactions
```
Returns: `{ blogId, likes, likedBy }`

#### Toggle Like
```
POST /api/blog/:blogId/like
Body: { userId: string }
```
Returns: Updated interaction object

#### Get Comments
```
GET /api/blog/:blogId/comments
```
Returns: Array of comments with replies

#### Add Comment
```
POST /api/blog/comments
Body: { blogId, name, email, text }
```
Returns: Created comment

#### Add Reply
```
POST /api/blog/comments/:commentId/reply
Body: { name, email, text }
```
Returns: Updated comment with new reply

## Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Get interactions
curl http://localhost:5000/api/blog/1/interactions

# Add comment
curl -X POST http://localhost:5000/api/blog/comments \
  -H "Content-Type: application/json" \
  -d '{"blogId":"1","name":"Test User","email":"test@example.com","text":"Great article!"}'
```

## Frontend Integration

Update your frontend `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

For production, update to your deployed backend URL.
