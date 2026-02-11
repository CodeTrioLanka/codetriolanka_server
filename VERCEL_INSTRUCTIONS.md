# Vercel Deployment Instructions

## 1. Environment Setup

The backend has been optimized for Vercel deployment.
The following changes were made:
- Added `vercel.json` for configuration.
- Updated `server.js` to handle database connections efficiently in a serverless environment and export the app.
- Updated Mongoose models to prevent "OverwriteModelError".

## 2. Deployment Steps

Option A: Deploy via GitHub (Recommended)
1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/).
3. Click "Add New" -> "Project".
4. Import your GitHub repository.

Option B: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this directory and follow the prompts.

## 3. Environment Variables (Required)

In the Vercel Project Settings -> Environment Variables, add the following:

| Variable Name | Value Description |
| h | h |
| `MONGODB_URI` | Your MongoDB connection string (e.g., from Atlas). Copy from your `.env` file. |
| `CLIENT_URL`  | URL of your frontend (e.g., `https://your-frontend.vercel.app`) to allow CORS. |

**Important:** Do NOT include `PORT` variable in Vercel. Vercel handles the port automatically.

## 4. Local Development

You can still run the server locally as usual:
```bash
npm run dev
```
Or
```bash
npm start
```
