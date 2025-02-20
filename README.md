# Tricer – E-Commerce Platform for Clothing  

🔗 **Check out the live version here:** [Tricer Store](https://tricer.vercel.app/)  

## Overview  
Tricer is an **e-commerce website** designed for a clothing store, allowing users to browse, select, and purchase clothing items in an **intuitive and efficient manner**. This project emphasizes a **user-friendly design, best practices in web development, and scalable architecture**.

## 👥 Team Members  
This project was developed as part of a team effort by:  
- **Geancarlo Rivera Hernández** (<geancarlo.riverahernandez@ucr.ac.cr>)  
- **Gabriel González Flores** (<gabriel.gonzalezflores@ucr.ac.cr>)  
- **Julio Alejandro Rodríguez Salguera** (<julio.rodriguezsalguera@ucr.ac.cr>)  
- **Sebastián Rodríguez Tencio** (<sebastian.rodrigueztencio@ucr.ac.cr>)  

## ✨ Features  
✅ **Single Page Application (SPA)** for seamless navigation.  
✅ **REST API built with Node.js & Express**, following a **layered architecture**.  
✅ **Secure authentication** using JWT for user sessions.  
✅ **Shopping cart system** for adding, updating, and removing items.  
✅ **Database powered by MySQL** for managing products and user data.  

## 🛠️ Tech Stack  
**Languages:** JavaScript, SQL  
**Frameworks & Libraries:** Node.js, Express.js, React  
**Database:** MySQL  
**Deployment:** Vercel  

## 🏗️ System Architecture  
The Tricer platform follows a **layered architecture**, ensuring a clear separation of concerns and scalability.  
- The **frontend** is a **React-based SPA** using `react-router-dom` for routing and Zustand for state management.  
- The **backend** is a **REST API** built with Node.js and Express, structured with a layered architecture.  
- API validation is handled with **Zod schemas**, ensuring data integrity and security.  

## 🛠️ Getting Started  

### **Prerequisites**  
Ensure you have the following installed on your system:  
- **Node.js** (includes npm) – [Download Here](https://nodejs.org/)  

Verify installation:  
```bash
node -v
npm -v
```

### **Installation & Setup**  

#### **1️⃣ Install Frontend Dependencies**
```bash
cd projects/project-01
npm install
```

#### **2️⃣ Install Backend Dependencies**
```bash
cd projects/api
npm install
```

### **🚀 Running the Project**  

#### **Start the Backend**
```bash
cd projects/api
npm run start:local
```
Backend will be available at `http://localhost:3000`.

#### **Start the Frontend**
```bash
cd projects/project-01
npm run dev
```
Then, open your browser and visit the URL provided in the terminal.

## 🎨 UI/UX & Design  
Tricer's design follows a **modern urban street style**, incorporating a visually appealing and intuitive interface.  
📌 **Figma Mockups:** [TricerStoreMockups](https://www.figma.com/design/IrHRSZP4JTKU3gjFCipxq3/Proyecto-%231---Tienda-de-Ropa?node-id=0-1&p=f&t=fj3pIAQKTgKe8dCN-0)  

### **📜 Code Standards & Linting**  
- **ESLint** (StandardJS) is used for code linting.  
- Key rules include **single quotes**, **no semicolons**, and **2-space indentation**.
