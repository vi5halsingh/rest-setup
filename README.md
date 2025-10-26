# 🚀 rest-setup

<div align="center">

![rest-setup Banner](https://via.placeholder.com/800x200.png?text=Welcome+to+rest-setup)

Create production-ready Node.js backends in seconds! A modern, feature-rich backend bootstrapper with best practices baked in.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/vi5halsingh/rest-setup/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/rest-setup.svg)](https://www.npmjs.com/package/rest-setup)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vi5halsingh/rest-setup/pulls)
[![Downloads](https://img.shields.io/npm/dt/rest-setup.svg)](https://www.npmjs.com/package/rest-setup)

[Getting Started](#-getting-started) •
[Features](#-features) •
[Examples](#-examples) •
[Documentation](#-documentation) •
[Contributing](#-contributing)

</div>

---

## 🎯 Why rest-setup?

- 🎨 **Clean Architecture**: Following industry-standard MVC patterns
- 🔒 **Security First**: Built-in security best practices
- 📦 **Zero Config**: Start coding in seconds
- 🛠️ **Developer Experience**: Hot reload, error handling, and more
- 🔌 **Plug & Play**: Cloudinary, MongoDB, and more integrations
- 📝 **Type Safety**: Optional TypeScript support

## � Getting Started

### One-Line Installation

```bash
# Create a new project
npx rest-setup my-api

# Or initialize in current directory
npx rest-setup .
```

### What's Included?

```
🎯 Initializing rest-setup...

⚡️ Creating project structure
   ├─ Setting up MVC architecture
   ├─ Configuring security middleware
   ├─ Adding error handlers
   └─ Installing dependencies

🎨 Customizing your setup
   ├─ Generating .env file
   ├─ Setting up MongoDB connection
   ├─ Configuring Cloudinary
   └─ Adding TypeScript (optional)

🚀 Launching development server
   └─ Available at http://localhost:8000

Happy coding! 🎉
```

### System Requirements

- Node.js 14+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/atlas/database))
- Git ([Download](https://git-scm.com/))

## ⚡️ Quick Start Guide

### 1. Configure Environment

```bash
cd my-api
cp .env.example .env
```

Edit `.env` with your settings:
```env
# � Essential Configuration
PORT=8000
NODE_ENV=development

# � Database Configuration
MONGODB_URI=your_mongodb_uri

# ☁️ Cloudinary Settings (Optional)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

### 2. Start Development

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Or production mode
npm start
```

## 🎯 Feature Highlights

### 🏗️ Core Features
- **MVC Architecture**: Clean separation of concerns
- **Express.js**: Fast, unopinionated web framework
- **MongoDB Integration**: Ready-to-use database setup
- **Error Handling**: Standardized error responses
- **File Upload**: Built-in file handling with Multer
- **Cloudinary**: Image upload and storage integration

### � Security & Middleware
- **CORS**: Configurable cross-origin settings
- **Cookie Parser**: HTTP cookie handling
- **Request Parsing**: JSON and URL-encoded bodies
- **Static Files**: Serve static content

### 🛠️ Developer Experience
- **Organized Structure**: Clear project layout
- **API Response**: Standardized JSON responses
- **Environment Config**: Easy .env configuration
- **Prettier**: Code formatting included

## 📘 Documentation

## 📁 Project Architecture

```bash
📦 rest-setup
├─ 📁 src/                    # Application source
│  ├─ 📄 app.js              # Express configuration
│  ├─ 📄 index.js            # Entry point
│  ├─ � constants.js        # Application constants
│  ├─ 📁 controllers/        # Request handlers
│  │  └─ 📄 user.controller.js
│  ├─ 📁 models/            # Data models
│  │  └─ 📄 user.model.js
│  ├─ 📁 routes/            # API routes
│  │  └─ 📄 user.routes.js
│  ├─ 📁 middlewares/       # Custom middleware
│  │  └─ 📄 multer.middleware.js
│  ├─ 📁 db/               # Database configuration
│  │  └─ 📄 db.js
│  └─ 📁 utils/            # Utility functions
│     ├─ 📄 apiError.js    # Error handling
│     ├─ 📄 apiResponse.js # Response formatting
│     └─ 📄 cloudinary.js  # Cloudinary config
├─ 📁 public/              # Static files
│  └─ 📁 temp/            # Temporary file storage
├─ 📄 .env.example        # Environment template
├─ 📄 .gitignore         # Git ignore rules
├─ 📄 .prettierrc        # Prettier config
└─ 📄 package.json       # Dependencies
```

### � File Upload Example

```javascript
// Configure multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ 
    storage, 
})

// Use in routes
router.post("/upload", 
    upload.single("file"), 
    uploadToCloudinary
);
```

### 🎯 Error Handling

```javascript
class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// Usage in controllers
if (!user) {
    throw new ApiError(404, "User not found")
}
```

## 🤝 Contributing

We love your input! We want to make contributing as easy and transparent as possible. Check out our [Contributing Guide](CONTRIBUTING.md) for detailed guidelines.

### 🎯 Development Process

1. Fork the repo and create your branch from `main`
2. Install dependencies: `npm install`
3. Add your changes
4. Run tests: `npm test`
5. Submit a PR!

### 📝 Code Style

We use ESLint and Prettier to maintain code quality. Before committing:

```bash
# Format code
npm run format

# Run linter
npm run lint

# Run tests
npm run test
```

## 📚 Additional Resources

- [API Documentation](docs/API.md)
- [Security Guide](docs/SECURITY.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Change Log](CHANGELOG.md)

## 🌟 Stargazers

[![Stargazers repo roster for @vi5halsingh/rest-setup](https://reporoster.com/stars/vi5halsingh/rest-setup)](https://github.com/vi5halsingh/rest-setup/stargazers)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Support

<a href="https://www.buymeacoffee.com/vi5halsingh" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="150">
</a>

## 📫 Connect & Contribute

<div align="center">

[![GitHub](https://img.shields.io/github/followers/vi5halsingh?label=Follow&style=social)](https://github.com/vi5halsingh)
[![Twitter](https://img.shields.io/twitter/follow/vi5halsingh?style=social)](https://x.com/Vi5hu_)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/vi5halsingh)

[Report Bug](https://github.com/vi5halsingh/rest-setup/issues) · 
[Request Feature](https://github.com/vi5halsingh/rest-setup/issues)

</div>

---

<div align="center">
Made with code and coffee  by <a href="https://github.com/vi5halsingh">Vishal Singh</a>

If you found this project helpful, please consider giving it a ⭐️
</div>
