 

---

# 🍽️ PlateShare — Community Food Sharing Platform

**PlateShare** is a full‑stack MERN application that allows users to share surplus food with their local community to reduce waste.  
Users can post food donations, browse available food items, and request items shared by others.
This Repo has the backend of PlateShare

---

## 🚀 Live Demo
**Frontend:** [coruscating-rolypoly-5509dc.netlify.app](#)  

---

## 🧩 Tech Stack

| Layer | Technology Used |
|--------|------------------|
| **Frontend** | React, Vite, TailwindCSS, DaisyUI |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | Firebase Authentication |
| **Deployment** | Netlify (Frontend), Vercel (Backend) |

---

## 🧠 Features

### 👥 User Management
- Firebase authentication (register, login, Google sign‑in)
- Conditional navigation and protected routes

### 🍲 Food Management
- Add, update, and delete food items  
- View available foods (public)  
- Filter donated foods per user  
- Featured foods — top 6 by quantity  

### 🤝 Food Request System
- Request food items with location, reason, and contact info  
- Food owner can accept/reject requests  
- Status updates handled automatically (`available → donated`)

### 🌐 Other Features
- 404 error page  
- Loading states  
- Animated homepage (AOS)  

---

## 🧱 Project Structure

```
plate-share
│
├── backend/
│   ├── index.js
│   ├── db/
│   │   └── connection.js
│   ├── routes/
│   │   ├── foods.js
│   │   └── requests.js
│   └── vercel.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env           
│   ├── package.json
│   └── vite.config.js
```

---

## ⚙️ Environment Variables

### **Frontend .env**
```
VITE_API_URL=<BackendUrl>
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
VITE_IMGBB_KEY=<your-imgbb-key>
```

### **Backend .env**
```
DB_URI=<your-mongodb-uri>
PORT=3000
```

When deploying, set the production environment variables in Netlify and Vercel dashboards.

---

## 🧩 How to Run Locally

### 1. Clone the repository


### 2. Backend setup
```bash
cd to your project backend
npm install
npm run dev     # or node index.js
```

### 3. Frontend setup
```bash
cd to your project
npm install
npm run dev
```

App runs locally at **http://localhost:5173**  or your specified port <br>
Backend API at **http://localhost:3000** or your specified port

---

## ☁️ Deployment

### On Vercel (Backend)
1. Push backend folder to GitHub  
2. Create new project in [Vercel](https://vercel.com)  
3. Add environment variables (`DB_URI`, `PORT`)  
4. Deploy  

### On Netlify (Frontend)
1. Build the app  
   ```bash
   npm run build
   ```
2. Drag‑and‑drop `dist/` to Netlify OR connect GitHub repo  


---



## 🧪 Example API Requests (for testing)

Get all foods:
```bash
GET /api/foods
```

Add new food:
```bash
POST /api/foods
```

Get featured foods:
```bash
GET /api/foods/featured/list
```

Add request:
```bash
POST /api/requests
```

---





