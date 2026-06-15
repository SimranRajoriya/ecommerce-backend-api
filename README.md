# E-Commerce Backend API

ASP.NET Core 8 Web API project for an internship/final project submission. It includes RESTful APIs, SQL Server integration, Entity Framework Core, JWT authentication, authorization, CRUD operations, pagination, filtering, exception handling, Swagger documentation, refresh tokens, email notifications, file upload APIs, a background service, and rate limiting.

## Features

- RESTful APIs for auth, products, categories, and orders
- SQL Server + Entity Framework Core
- JWT access tokens and refresh tokens
- Role-based authorization: `Admin` and `Customer`
- Product/category CRUD
- Product pagination and filtering
- Global exception handling middleware
- Swagger UI with Bearer token support
- Email notifications for registration, order creation, and order status updates
- Product image upload API
- Background service for pending order reminders
- Fixed-window API rate limiting

## Setup

1. Update `appsettings.json` connection string.
2. Create the database:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

3. Run the API:

```bash
dotnet run
```

4. Open Swagger:

```text
https://localhost:5001/swagger
```

## Important Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/products?pageNumber=1&pageSize=10&search=phone`
- `POST /api/products` Admin only
- `POST /api/products/{id}/images` Admin only
- `GET /api/categories`
- `POST /api/orders`
- `PATCH /api/orders/{id}/status` Admin only

## GitHub Submission Tips

- Create a GitHub repository named `ecommerce-backend-api`.
- Push this project folder.
- Add screenshots of Swagger UI and SQL Server tables in the README if your internship requires proof.
