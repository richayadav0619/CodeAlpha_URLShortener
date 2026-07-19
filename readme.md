# 🔗 URL Shortener API

A production-ready RESTful URL Shortener Backend built with **Node.js**, **Express.js**, and **MongoDB**.

This API allows users to create short URLs, use custom aliases, redirect to original URLs, track analytics, search URLs, view dashboard statistics, and retrieve paginated URL records. The project also includes Swagger API documentation, security middleware, and rate limiting.

---

## 🚀 Features

- Create short URLs
- Custom alias support
- Redirect to original URLs
- URL analytics (click tracking)
- Dashboard statistics
- Search URLs
- Pagination support
- Delete short URLs
- Expiry support
- Swagger API documentation
- Helmet security middleware
- Morgan request logging
- Rate limiting
- Centralized error handling

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### API Documentation
- Swagger UI
- Swagger JSDoc

### Security & Middleware
- Helmet
- Express Rate Limit
- Morgan
- dotenv

### Utilities
- Validator
- Shortid

---

## 📂 Folder Structure

```text
url-shortner/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── index.js
│
├── public/
├── package.json
├── README.md
└── .env
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/url-shortner.git
```

### Navigate to the project

```bash
cd url-shortner
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
PORT=8001
MONGODB_URI=your_mongodb_connection_string
```

### Start the development server

```bash
npm run dev
```

The server will start at:

```
http://localhost:8001
```

---

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/url` | Create a Short URL |
| GET | `/url` | Get all URLs (Pagination) |
| GET | `/url/dashboard` | Dashboard Statistics |
| GET | `/url/statistics` | URL Statistics |
| GET | `/url/search/:keyword` | Search URLs |
| GET | `/url/analytics/:shortId` | Get Analytics |
| DELETE | `/url/:shortId` | Delete URL |
| GET | `/url/:shortId` | Redirect to Original URL |

---

## 📚 Swagger Documentation

After starting the server, open:

```
http://localhost:8001/api-docs
```

Swagger UI provides interactive documentation where every endpoint can be tested directly from the browser.

---

## 🔮 Future Improvements

- User Authentication (JWT)
- QR Code Generation
- Custom URL Expiry Notifications
- User Dashboard
- Redis Caching
- Docker Support
- CI/CD Pipeline
- Unit & Integration Testing

---

## 👩‍💻 Author

**Richa Yadav**

- GitHub: https://github.com/richayadav0619

If you found this project helpful, consider giving it a ⭐ on GitHub.

---