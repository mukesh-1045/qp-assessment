# **QP-Assessment**

---

## **Features**

### **Authentication & Authorization**

- JWT-based authentication.
- Role-based access control (`admin` and `user`).

### **Admin Capabilities**

- Add, update, or delete grocery items.
- Bulk update inventory or add new items.
- View all orders placed by users.

### **User Capabilities**

- View grocery items with stock and pricing.
- Place orders, dynamically updating inventory.

### **Database Integration**

- Powered by Sequelize ORM with PostgreSQL.

### **Containerization**

- Fully Dockerized for seamless deployment.

---

## **Tech Stack**

| **Category**         | **Technology**        |
| -------------------- | --------------------- |
| **Backend**          | Node.js, Express.js   |
| **Database**         | PostgreSQL            |
| **ORM**              | Sequelize             |
| **Validation**       | Joi                   |
| **Authentication**   | JSON Web Tokens (JWT) |
| **Containerization** | Docker                |

---

## **Setup & Installation**

### Prerequisites

- Node.js (v16 or above)
- PostgreSQL
- Docker (optional for containerized setup)

### Steps

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd grocery-management-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the project root:

   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```

4. **Run Migrations**

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the Application**
   ```bash
   npm run start
   ```

---

## **Docker Setup**

1. **Build Docker Image**

   ```bash
   docker build -t qp-assessment .
   ```

2. **Run Docker Container**
   ```bash
   docker run -p 3000:3000 qp-assessment  // docker-compose up --build
   ```
