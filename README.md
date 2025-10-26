# REST-Setup

A robust backend framework for building scalable Node.js applications with Express, MongoDB, and Cloudinary integration.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **Express.js Integration**: Pre-configured Express server with middleware setup
- **MongoDB Connection**: Ready-to-use MongoDB connection with Mongoose
- **User Authentication**: Built-in user model and authentication routes
- **File Upload**: Multer middleware for handling file uploads
- **Cloudinary Integration**: Easy image upload and management with Cloudinary
- **Error Handling**: Standardized error handling and API responses
- **Environment Configuration**: Dotenv setup for environment variables

## Installation

```bash
git clone https://github.com/yourusername/rest-setup.git
cd rest-setup
npm install
```

## Quick Start

1. Create a `.env` file in your project root with the following variables (see `.env.example` for reference):

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. Start the server:

```bash
npm start
```

## Project Structure

REST-Setup follows a modular architecture:

```
rest-setup/
├── public/               # Static files
│   └── temp/             # Temporary file storage
│       └── .gitkeep
├── src/                  # Source code
│   ├── app.js            # Express app configuration
│   ├── constants.js      # Application constants
│   ├── controllers/      # Route controllers
│   │   └── user.controller.js
│   ├── db/               # Database connection
│   │   └── db.js
│   ├── index.js          # Application entry point
│   ├── middlewares/      # Custom middlewares
│   │   └── multer.middleware.js
│   ├── models/           # Mongoose models
│   │   └── user.model.js
│   ├── routes/           # API routes
│   │   └── user.routes.js
│   └── utils/            # Utility functions
│       ├── apiError.js   # Error handling
│       ├── apiResponse.js # Response formatting
│       └── cloudinary.js # Cloudinary configuration
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Usage Examples

### User Registration

```javascript
const { ApiResponse } = require('../utils/apiResponse');
const User = require('../models/user.model');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const user = await User.create({
      username,
      email,
      password
    });
    
    return res.status(201).json(
      new ApiResponse(201, user, "User registered successfully")
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### File Upload with Cloudinary

```javascript
const { uploadOnCloudinary } = require('../utils/cloudinary');
const { upload } = require('../middlewares/multer.middleware');

// In your route file
router.post('/upload', upload.single('image'), async (req, res) => {
  const localFilePath = req.file.path;
  const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
  
  return res.status(200).json({
    success: true,
    imageUrl: cloudinaryResponse.url
  });
});
```

### Error Handling

```javascript
const ApiError = require('../utils/apiError');
const User = require('../models/user.model');

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};
```

## Middleware

REST-Setup comes with several built-in middlewares:

### Multer Middleware

Handles file uploads with disk storage:

```javascript
const { upload } = require('../middlewares/multer.middleware');

// Single file upload
router.post('/upload', upload.single('image'), controller.uploadHandler);

// Multiple files upload
router.post('/upload-multiple', upload.array('images', 5), controller.multiUploadHandler);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

@vi5halsingh