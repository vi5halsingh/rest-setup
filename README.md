# BaseCraft

A robust backend framework for building scalable Node.js applications with Express, MongoDB, and Cloudinary integration.

[![npm version](https://img.shields.io/npm/v/basecraft.svg)](https://www.npmjs.com/package/basecraft)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

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
npm install basecraft
```

## Quick Start

1. Create a `.env` file in your project root with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. Create an entry point file (e.g., `index.js`):

```javascript
const { app, connectDB } = require('basecraft');
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});
```

## API Structure

BaseCraft follows a modular architecture:

```
src/
├── app.js                # Express app configuration
├── constants.js          # Application constants
├── controllers/          # Route controllers
│   └── user.controller.js
├── db/                   # Database connection
│   └── db.js
├── index.js              # Application entry point
├── middlewares/          # Custom middlewares
│   └── multer.middleware.js
├── models/               # Mongoose models
│   └── user.model.js
├── routes/               # API routes
│   └── user.routes.js
└── utils/                # Utility functions
    ├── apiError.js       # Error handling
    ├── apiResponse.js    # Response formatting
    └── cloudinary.js     # Cloudinary configuration
```

## Usage Examples

### User Registration

```javascript
const { ApiResponse } = require('basecraft/utils');
const { User } = require('basecraft/models');

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
const { uploadOnCloudinary } = require('basecraft/utils');
const { upload } = require('basecraft/middlewares');

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
const { ApiError } = require('basecraft/utils');

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

BaseCraft comes with several built-in middlewares:

### Multer Middleware

Handles file uploads with disk storage:

```javascript
const { upload } = require('basecraft/middlewares');

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