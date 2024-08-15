# 🏥 Medicine E-Commerce Server

This project provides the backend API for a medicine e-commerce platform, offering seamless functionality for user authentication, product management, order processing, and more. It is built using modern web technologies to ensure performance, scalability, and security.

## 📜 Description

This backend server handles the core functionalities of a medicine e-commerce website, including user management, product CRUD operations, category and shipping management, and more. The system is designed to provide a secure and reliable infrastructure for a fully functional online medicine store.

## 🚀 Features

- ✅ **User Authentication and Authorization**
- 🛒 **Product Management (CRUD operations)**
- 📦 **Order Processing**
- 🗂️ **Category Management**
- 📮 **Shipping Management**

## 🛠️ Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **JWT**: Secure JSON Web Tokens for authentication

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nazmulhossain17/medicine-e-commerce-server.git
2. Navigate to the project directory:
   ```bash
   cd medicine-e-commerce-server
3. Install dependencies:
   ```bash
   npm install

5. API Endpoints:
### 🔐 Authentication Routes (`/api/v1`)

| HTTP Method | Endpoint                       | Description                      |
|-------------|--------------------------------|----------------------------------|
| `POST`      | `/api/v1/create-account`       | Create a new user account        |
| `POST`      | `/api/v1/login`                | Log in a user                    |
| `POST`      | `/api/v1/logout`               | Log out a user                   |
| `POST`      | `/api/v1/send-verification`    | Send a verification code to user |
| `POST`      | `/api/v1/verify-user`          | Verify user with OTP             |
| `PUT`       | `/api/v1/update/:userId`       | Update user information by ID    |
| `GET`       | `/api/v1/profile/:id`          | Get user profile by ID           |
| `GET`       | `/api/v1/users`                | Get all users                    |
| `DELETE`    | `/api/v1/users/:id`            | Delete a user by ID              |
| `POST`      | `/api/v1/make-admin/:requesterId` | Promote a user to admin          |


### 🗂️ Category Management Routes (`/api/v2`)

| HTTP Method | Endpoint                      | Description                   |
|-------------|-------------------------------|-------------------------------|
| `POST`      | `/api/v2/categories`          | Create a new category         |
| `GET`       | `/api/v2/categories`          | Get all categories            |
| `GET`       | `/api/v2/categories/:id`      | Get category by ID            |
| `PUT`       | `/api/v2/categories/:id`      | Update a category by ID       |
| `DELETE`    | `/api/v2/categories/:id`      | Delete a category by ID       |

### 🛒 Product Management Routes (`/api/v3`)

| HTTP Method | Endpoint                      | Description                   |
|-------------|-------------------------------|-------------------------------|
| `POST`      | `/api/v3/products`            | Create a new product          |
| `GET`       | `/api/v3/products`            | Get all products              |
| `GET`       | `/api/v3/products/:id`        | Get product by ID             |
| `PUT`       | `/api/v3/products/:id`        | Update a product by ID        |
| `DELETE`    | `/api/v3/products/:id`        | Delete a product by ID        |

### 📮 Shipping Management Routes (`/api/v4`)

| HTTP Method | Endpoint                              | Description                         |
|-------------|---------------------------------------|-------------------------------------|
| `POST`      | `/api/v4/create-shipping`             | Create a new shipping address       |
| `GET`       | `/api/v4/addresses/:id`               | Get all shipping addresses by user ID |
| `GET`       | `/api/v4/addresses/:userId`           | Get shipping address by user ID     |
| `DELETE`    | `/api/v4/shipping-address/:addressId` | Delete a shipping address by ID     |



Project Link: [https://github.com/nazmulhossain17/medicine-e-commerce-server](https://github.com/nazmulhossain17/medicine-e-commerce-server)

FrontEnd: [https://github.com/nazmulhossain17/medicine-e-commerce](https://github.com/nazmulhossain17/medicine-e-commerce)


