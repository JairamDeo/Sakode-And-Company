# 🍽️ Sakode & Company MongoDB Setup Guide (Windows)

This guide will walk you through setting up MongoDB for the MealMate project on **Windows**.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Windows Setup](#-windows-setup)
- [MongoDB Atlas Setup](#️-mongodb-atlas-setup)
- [Importing Data](#-importing-data)
- [Connecting to Backend](#-connecting-to-backend)

---

## 🛠️ Prerequisites

- 📁 Sakode & Company project files: [GitHub Repository](https://github.com/JairamDeo/Sakode-And-Company.git)
- 🌐 Internet connection
- 📝 MongoDB Atlas account (free tier is enough)

---

## ☁️ MongoDB Atlas Setup

### 🔐 Create MongoDB Atlas Account

- 🔗 [Sign Up/Login](https://account.mongodb.com/account/login)

### 📋 Create a New Project

- Name: `Sakode & Company`, then "Create Project"

### 🏗️ Create Cluster

- Select **FREE tier**
- Default Region (Mumbai `ap-south-1`)
- Name: `Cluster0` (or custom)

### 🔒 Configure Security

- Username: `your_user_name`
- Password: `your_password_name`
- ✅ Save credentials
- Allow IP: `Access from Anywhere`
- Or `restrict to ip`

### 📊 Create Database & Collections

- Database name: `SakodeCompanyDB`
- Collection name: `sample` (temp)

---

## 🔌 Connecting to Backend

1. In MongoDB Atlas, go to:
   - Cluster → **Connect** → **Drivers**
   - Choose Driver: **Node.js**
   - Version: **6.12.0 or later**

2. Install driver in backend:
```bash
npm install mongodb@6.12.0
```

3. Add Mongo URI to `.env` in backend:

```bash env

mongodb+srv://<username>:<password>@cluster0.exsli.mongodb.net/<DB-Name>?retryWrites=true&w=majority&appName=Cluster0
```
🔑 Replace `<db_password>` with your real password.

---

🎉 **Success!** MongoDB is now connected to the Sakode & Company project.