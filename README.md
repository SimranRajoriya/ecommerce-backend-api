# ecommerce-backend-api

A real-world ASP.NET Core Web API backend for an e-commerce application. This project is built for  authentication, authorization, SQL Server database integration, CRUD APIs, pagination, filtering, file uploads, email notifications, background jobs, rate limiting, Swagger documentation, and refresh tokens.

## Tech Stack

- ASP.NET Core 8 Web API
- C#
- SQL Server
- Entity Framework Core
- JWT Authentication
- Role-Based Authorization
- Swagger / OpenAPI
- MailKit for email notifications
- EF Core Migrations
- Git / GitHub

## Mandatory Features Covered

| Requirement | Status |
| --- | --- |
| RESTful APIs | Completed |
| SQL Server integration | Completed |
| Entity Framework Core | Completed |
| JWT Authentication | Completed |
| Authorization | Completed |
| CRUD operations | Completed |
| Pagination and filtering | Completed |
| Exception handling | Completed |
| Swagger documentation | Completed |
| GitHub repository ready | Completed |

## Bonus Features Covered

| Bonus Feature | Status |
| --- | --- |
| Refresh tokens | Completed |
| Email notifications | Completed |
| File upload APIs | Completed |
| Background services | Completed |
| Rate limiting | Completed |

## Project Modules

- Authentication and registration
- JWT access token generation
- Refresh token renewal and revoke
- Admin and customer roles
- Category management
- Product management
- Product image upload
- Product pagination and filtering
- Order placement
- Order status update
- Email notifications
- Pending order background reminder
- Global exception handling

## Folder Structure

```text
ECommerceBackend/
├── Controllers/
│   ├── AuthController.cs
│   ├── CategoriesController.cs
│   ├── ProductsController.cs
│   └── OrdersController.cs
├── Data/
│   ├── AppDbContext.cs
│   └── DbInitializer.cs
├── DTOs/
├── Middleware/
├── Migrations/
├── Models/
├── Services/
├── Program.cs
├── appsettings.json
└── README.md
```

## Database Tables

The project uses Entity Framework Core Code First approach. Main tables:

- Users
- RefreshTokens
- Categories
- Products
- ProductImages
- Orders
- OrderItems

## Default Admin Account

When the application starts, it seeds a default admin user.

```text
Email: admin@ecommerce.com
Password: Admin@123
Role: Admin
```

Use this account to login and access admin-only APIs such as creating products, updating products, deleting products, creating categories, and updating order status.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPO_URL
cd ECommerceBackend
```

### 2. Configure SQL Server

Open `appsettings.json` and update the connection string if needed.

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=ECommerceBackendDb;Trusted_Connection=True;TrustServerCertificate=True"
}
```

For SQL Server Management Studio, you can use a connection string like:

```json
"DefaultConnection": "Server=YOUR_SERVER_NAME;Database=ECommerceBackendDb;Trusted_Connection=True;TrustServerCertificate=True"
```

### 3. Restore Packages

```bash
dotnet restore
```

### 4. Apply Database Migration

```bash
dotnet ef database update
```

### 5. Run the Project

```bash
dotnet run
```

### 6. Open Swagger

```text
https://localhost:7097/swagger
```

If HTTPS port is different on your system, check `Properties/launchSettings.json`.

## Authentication Flow

1. Register as a customer using `/api/auth/register`.
2. Login using `/api/auth/login`.
3. Copy the returned `accessToken`.
4. Open Swagger and click `Authorize`.
5. Paste the token in this format:

```text
Bearer YOUR_ACCESS_TOKEN
```

6. Now protected APIs can be accessed.

## Important API Endpoints

### Auth

| Method | Endpoint | Access |
| --- | --- | --- |
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/refresh` | Public |
| POST | `/api/auth/revoke` | Authenticated |
| GET | `/api/auth/me` | Authenticated |

### Categories

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/categories` | Public |
| POST | `/api/categories` | Admin |
| PUT | `/api/categories/{id}` | Admin |
| DELETE | `/api/categories/{id}` | Admin |

### Products

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/products` | Public |
| GET | `/api/products/{id}` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/{id}` | Admin |
| DELETE | `/api/products/{id}` | Admin |
| POST | `/api/products/{id}/images` | Admin |

### Orders

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/orders` | Customer/Admin |
| POST | `/api/orders` | Customer/Admin |
| PATCH | `/api/orders/{id}/status` | Admin |

## Product Filtering and Pagination

Example:

```text
GET /api/products?pageNumber=1&pageSize=10&search=phone&minPrice=10000&maxPrice=80000&categoryId=1&isActive=true
```

Supported filters:

- `search`
- `categoryId`
- `minPrice`
- `maxPrice`
- `isActive`
- `pageNumber`
- `pageSize`

## Sample Register Request

```json
{
  "fullName": "Simran Kaur",
  "email": "simran@example.com",
  "password": "Password@123"
}
```

## Sample Login Request

```json
{
  "email": "admin@ecommerce.com",
  "password": "Admin@123"
}
```

## Sample Product Request

```json
{
  "name": "iPhone 15",
  "description": "Latest Apple smartphone",
  "price": 79999,
  "stockQuantity": 20,
  "categoryId": 1,
  "isActive": true
}
```

## Sample Order Request

```json
{
  "shippingAddress": "New Delhi, India",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

## Email Configuration

Email notifications are implemented using MailKit. To enable real emails, update the `Smtp` section in `appsettings.json`.

```json
"Smtp": {
  "Host": "smtp.gmail.com",
  "Port": 587,
  "Username": "your-email@gmail.com",
  "Password": "your-app-password",
  "FromEmail": "your-email@gmail.com",
  "FromName": "E-Commerce Store",
  "EnableSsl": true
}
```

If SMTP is not configured, the application will skip sending emails and log the email event.

## File Upload

Product images can be uploaded using:

```text
POST /api/products/{id}/images
```

Supported file formats:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

Uploaded files are stored under:

```text
wwwroot/uploads/products
```

## Rate Limiting

The API uses fixed-window rate limiting:

```text
100 requests per minute per user/IP
```

If the limit is exceeded, the API returns:

```text
429 Too Many Requests
```

## Exception Handling

The project includes global exception handling middleware. It returns consistent JSON responses instead of exposing internal server errors.

Example response:

```json
{
  "success": false,
  "message": "Something went wrong. Please try again later.",
  "data": null
}
```

## Background Service

The background service checks pending orders every 6 hours and sends reminder emails for orders that are pending for more than 24 hours.

File:

```text
Services/PendingOrderReminderService.cs
```

## How to Push to GitHub

Create an empty GitHub repository, then run:

```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
