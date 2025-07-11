# 🚀 Sakode & Company Backend (Node.js + Express)

This is the backend server of the Sakode & Company built using **Node.js**, **Express.js**, **Cloudinary** and **MongoDB**. It provides REST APIs for sarees data retrieval, and sarees uploading using admin panel.

---

## 💻 Prerequisites

- **Node.js** (Version 22.x recommended)  
- **npm** (comes with Node.js)

### 📦 Install Node.js

#### For Windows:
1. Download the latest **Node.js v22** from [nodejs.org](https://nodejs.org/).  
2. Run the installer and follow the setup instructions.  
3. Verify installation:
   ```
   node -v
   npm -v
   ```

#### For Linux (Debian/Ubuntu):
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

---

## 🚀 Project Setup

1. Clone the repository:

```bash
git clone https://github.com/JairamDeo/Sakode-And-Company.git
cd Sakode-And-Company/server
```

2. Install dependencies:

```bash
npm install
```

---

> 🔑 To generate a secure JWT secret key, run this command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Replace `your_64_byte_hex_string_here` with the generated key in backend env file.

📷 Cloudinary Setup for Image Uploads
To enable image uploads using Cloudinary in this project, follow the steps below to configure your Cloudinary credentials:

🔧 Step 1: Create a Cloudinary Account
Go to https://cloudinary.com/

Sign up or log in.

After logging in, navigate to the Dashboard to find your Cloud Name, API Key, and API Secret.

---

```bash
vim .env
```

## 🔧 Environment Configuration

Create a `.env` file in the root backend directory with the following variables:

```bash
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_64_byte_hex_string_here
CLOUDINARY_URL=cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

## 🚀 Running the Server

To start the backend server in development mode with auto-reload (requires nodemon):

```bash
npx nodemon index.js
```

Or simply:

```bash
node index.js
```

The server will run on the port specified in your `.env` file (default 5000).

---

## 📡 CORS Setup

The backend is configured to allow requests only from the frontend URL defined in the environment variable `FRONTEND_URL` for security.

---

## 🛠️ Notes on Production

- Backend servers typically do **not** require a build step like frontend apps.
- Deploy the backend to your hosting environment (AWS EC2, Heroku, DigitalOcean, etc.) by pushing your code.
- Make sure environment variables are set correctly on your production server.
- Use process managers like **PM2** for production deployments to keep the app running smoothly.

---

## 📬 Feedback

Feel free to open issues or contribute. Happy coding! 🎉