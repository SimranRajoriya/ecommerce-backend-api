# ecommerce-backend-api

This is my final project backend for an e-commerce application. I made this project using ASP.NET Core Web API with SQL Server and Entity Framework Core. The main idea of this project is to create APIs for a shopping application where users can register, login, view products, place orders, and admin can manage products, categories and order status.
I tried to include both basic and some advanced backend features so that the project looks close to a real-world backend system.
Technologies Used
ASP.NET Core 8 Web API
C#
SQL Server
Entity Framework Core
JWT Authentication
Swagger
MailKit
Git and GitHub
Features
Main Features
REST APIs
SQL Server database connection
Entity Framework Core Code First
JWT based login system
Role based authorization
CRUD operations
Pagination and filtering
Global exception handling
Swagger documentation
GitHub ready project
Extra Features
Refresh token system
Email notification setup
Product image upload API
Background service for pending orders
Rate limiting
Project Modules
The project has these main modules:
Auth module for register, login, refresh token and current user
Category module for managing product categories
Product module for product CRUD, filtering and image upload
Order module for placing orders and updating order status
Services for JWT, password hashing, emails, file upload and background job
Folder Structure
ECommerceBackend
│
├── Controllers
├── Data
├── DTOs
├── Middleware
├── Migrations
├── Models
├── Services
├── Program.cs
└── appsettings.json
Database Tables
I used Entity Framework Core migrations for creating the database tables.
Main tables are:
Users
RefreshTokens
Categories
Products
ProductImages
Orders
OrderItems
Default Admin Login
For testing admin APIs, I added one default admin user.
Email: admin@ecommerce.com
Password: Admin@123
Admin can create categories, add products, update products, delete products and update order status.
How to Run the Project
1. Clone the project
git clone YOUR_GITHUB_REPO_LINK
cd ECommerceBackend
2. Check database connection
Open appsettings.json and check the connection string.
Default connection string:
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=ECommerceBackendDb;Trusted_Connection=True;TrustServerCertificate=True"
}
If you are using normal SQL Server, change the server name according to your system.
3. Restore packages
dotnet restore
4. Create database
dotnet ef database update
5. Run project
dotnet run
6. Open Swagger
Open this URL in browser:
https://localhost:7097/swagger
If this port does not work, check the port in Properties/launchSettings.json.
Authentication Steps
First register a user from /api/auth/register
Login from /api/auth/login
Copy the accessToken from login response
Click on Authorize button in Swagger
Enter token like this:
Bearer your_token_here
After this, protected APIs can be tested.
API Endpoints
Auth APIs
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/revoke
GET  /api/auth/me
Category APIs
GET    /api/categories
POST   /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
Product APIs
GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
POST   /api/products/{id}/images
Order APIs
GET   /api/orders
POST  /api/orders
PATCH /api/orders/{id}/status
Product Search and Pagination
Products API supports pagination and filtering.
Example:
/api/products?pageNumber=1&pageSize=10&search=phone&minPrice=10000&maxPrice=80000&categoryId=1
Filters added:
search
categoryId
minPrice
maxPrice
isActive
pageNumber
pageSize
Sample Requests
Register
{
  "fullName": "Simran Kaur",
  "email": "simran@example.com",
  "password": "Password@123"
}
Login
{
  "email": "admin@ecommerce.com",
  "password": "Admin@123"
}
Add Product
{
  "name": "iPhone 15",
  "description": "Apple smartphone",
  "price": 79999,
  "stockQuantity": 20,
  "categoryId": 1,
  "isActive": true
}
Create Order
{
  "shippingAddress": "New Delhi, India",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
Email Notification
I added email service using MailKit. Right now SMTP values are empty in appsettings.json, so emails will be skipped if SMTP is not configured.
To send real emails, SMTP details can be added like this:
"Smtp": {
  "Host": "smtp.gmail.com",
  "Port": 587,
  "Username": "your-email@gmail.com",
  "Password": "your-app-password",
  "FromEmail": "your-email@gmail.com",
  "FromName": "E-Commerce Store",
  "EnableSsl": true
}
File Upload
Admin can upload product images from:
POST /api/products/{id}/images
Allowed image types:
jpg
jpeg
png
webp
Images are saved inside:
wwwroot/uploads/products
Rate Limiting
Rate limiting is also added to stop too many API requests.
Current limit:
100 requests per minute
Exception Handling
I added middleware for exception handling. This helps to return proper JSON response if any error happens.
Example:
{
  "success": false,
  "message": "Something went wrong. Please try again later.",
  "data": null
}
Background Service
There is one background service which checks pending orders after a fixed time and sends reminder emails for old pending orders.
File name:
PendingOrderReminderService.cs
GitHub Commands
After creating GitHub repository, these commands can be used:
git remote add origin YOUR_GITHUB_REPO_LINK
git branch -M main
git push -u origin main
What I Learned
While making this project, I learned how to:
Create REST APIs in ASP.NET Core
Connect Web API with SQL Server
Use Entity Framework Core migrations
Implement JWT authentication
Add role based authorization
Upload files in Web API
Use Swagger for API testing
Handle errors using middleware
Structure a backend project properly
Future Improvements
Some features that can be added later:
Payment gateway integration
Cart module
Wishlist module
Product reviews and ratings
Admin dashboard
Unit testing
