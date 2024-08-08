# 🔐 Password Manager API

A simple RESTful API for managing passwords, built using Express.js and MongoDB. This API allows you to perform CRUD operations on passwords, including creating, retrieving, and deleting passwords.

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

### 🚀 Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) 🟢
- [MongoDB](https://www.mongodb.com/try/download/community) 🗃️

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/password-manager-api.git
cd password-manager-api
```

### 📦 Install Dependencies
```bash
npm install
```
### 🔧 Configure Environment Variables
Create a .env file in the root of the project and add the following line, replacing YOUR_MONGO_URI with your MongoDB connection string:
```bash
MONGO_URI=YOUR_MONGO_URI
```
## Usage
### 🚀 Start the Server
```bash
npm start
```
The server will start and listen on port 3000. You can change the port by modifying the port variable in index.js.

### 🛠️ API Endpoints
- GET / - Retrieve all passwords
    - Response: An array of password objects.
- POST / - Add a new password
    - Request Body: JSON object with site, username, and password fields.
    - Response: { success: true, result: <result> }
- DELETE / - Delete a password by ID
    - Request Body: JSON object with id field.
    - Response: { success: true, result: <result> }
    - Error Response: { error: 'Password not found' } if no document is deleted.

## Contributing
Feel free to open issues or submit pull requests. Contributions are welcome! 🤝

1. Fork the repository 🍴

2. Create a new branch (git checkout -b feature/your-feature) 🌿

3. Make your changes ✏️

4. Commit your changes (git commit -am 'Add new feature') 📝

5. Push to the branch (git push origin feature/your-feature) 🚀

6. Create a new Pull Request 🏷️



