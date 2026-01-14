# 📚 Book Store Application (MERN Stack)

A full-stack **Book Store Application** built using the **MERN stack**.  
The project currently follows a **backend-first development approach**, with core APIs implemented and frontend enhancements under active maintenance.

---

## 🚀 Current Project Status

### 🔧 Development Phase: **Maintenance & Enhancement**
- Backend APIs are implemented and tested
- Frontend UI for some features is under development
- Project is actively maintained and structured for scalability

---

## ✅ Implemented Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin / Seller / Customer)
- Protected routes

---

### ⭐ Review & Rating System (Backend – Completed)
- Users can submit **ratings (1–5 stars)** for books
- Users can add **text-based reviews**
- Existing reviews are updated instead of duplicated
- Backend validations for rating range and user authorization

> ⚠️ Frontend UI for review & rating & pdf read is **not yet implemented**

---

### 📄 Book PDF Upload & Reading (Backend – Completed)
- Sellers can upload book PDFs
- PDFs are uploaded
- Stored securely on **Cloudinary **
- Database stores only PDF URLs

> ⚠️ Frontend UI for reading books is **under development**

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary
- JWT Authentication
- NodeMailer

### Frontend
- React.js
- React Router DOM
- Zustand
- Tailwind CSS
- Framer Motion

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ShivaniNagda/Books_Store.git
cd book-store-app
```

### Navigate to backend folder
## Install dependencies
```bash
npm install
```

- Backend will run on the configured port (e.g., http://localhost:3000)


### Navigate to frontend folder
``` bash
cd frontend
```
### Install dependencies
``` bash
npm i
```

### Start the frontend development server
```bash
npm run dev 
```
- Frontend will typically run on http://localhost:5173

### 🔑 Environment Variables
    -Create a .env file :
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    SECRET_KEY=your_jwt_secret
    NODE_ENV=development

    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    CLIENT_URL=http://localhost:5173


    MYEMAIL=xyz@gmail.com
    MyEMAILPassKey=tsatencdhsjow

---

## 🖼️ Screenshots

> 🚧 **Maintenance Phase Notice**  
> The frontend UI for **Review, Rating, and Book Reading** is currently under development.  
> Screenshots will be added once the UI implementation is finalized.

### 📷 Current Phase
- Authentication (Login / Register / logout)
- Seller Dashboard
- Profile Dashboard

📌 Screenshots will be updated in upcoming commits as part of the enhancement phase.

## API Testing (Postman) : 
 ### https://.postman.co/workspace/My-Workspace~005b80b3-16aa-4b39-8332-d5c665608e3d/collection/38914835-9321889f-a7f6-4363-8663-15eed2377c85?action=share&creator=38914835

All APIs were tested locally using Postman.

Base URL:
http://localhost:3000

Note:
Email functionality works in local/development environment.
In production, an email API provider should be used instead of SMTP
to avoid timeout issues.

## Demo Credentials

For testing the application, you can use the following predefined users:

| Role     | Email              | Password          |
|----------|-------------------|--------------------|
| Admin    | admin@gmail.com   | admin@gmail.com    |
| Seller   | seller@gmail.com  | seller   |
| Customer | customer@gmail.com| customer |
