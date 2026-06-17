# Apna Bazar - E-Commerce Frontend

A modern, responsive React-based e-commerce frontend for the **Apna Bazar** shopping application. Built with Vite, Tailwind CSS, and modern state management.

## 🎯 Features

### Customer Features
- **Product Browsing**: Browse and search products by category and price
- **Shopping Cart**: Add/remove items with quantity adjustment
- **Checkout**: Secure checkout with address and payment information
- **Order Management**: View order history and status
- **User Authentication**: Register and login functionality
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Product Management**: Create, edit, and delete products
- **Category Management**: Manage product categories
- **Inventory Management**: Track stock quantities
- **Order Tracking**: View and manage customer orders

## 🚀 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Routing**: React Router v6

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── AdminDashboard.jsx
│   ├── store/
│   │   ├── authStore.js
│   │   └── cartStore.js
│   ├── api/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SimranRajoriya/ecommerce-backend-api.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your backend API URL:
   ```env
   VITE_API_URL=https://localhost:7097
   VITE_API_TIMEOUT=10000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will open at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Color Palette
- **Primary**: `#2874f0` (Blue)
- **Primary Dark**: `#1f4a8a`
- **Secondary**: `#ff9f00` (Orange)
- **Success**: `#31a24c` (Green)
- **Danger**: `#e74c3c` (Red)

### Typography
- **Font**: Roboto
- **Font Sizes**: 12px to 32px

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔑 Key Pages

### Public Pages
- **Home** (`/`): Landing page with featured products
- **Products** (`/products`): Product listing with filters
- **Product Detail** (`/products/:id`): Detailed product information
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration

### Protected Pages
- **Cart** (`/cart`): Shopping cart management
- **Checkout** (`/checkout`): Order placement
- **Orders** (`/orders`): Order history
- **Admin Dashboard** (`/admin`): Admin panel (Admin only)

## 🔐 Authentication

### State Management
Authentication state is managed using Zustand and persisted in localStorage:
- User information
- Access token
- Refresh token

### Protected Routes
Routes requiring authentication are wrapped with `ProtectedRoute` component:

```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

For admin-only routes:

```jsx
<ProtectedRoute adminOnly>
  <AdminDashboard />
</ProtectedRoute>
```

## 🛒 Shopping Flow

1. **Browse**: Customer browses products
2. **Search**: Filter by category, price range, or search term
3. **Add to Cart**: Add items with quantity
4. **Review Cart**: Adjust quantities or remove items
5. **Checkout**: Fill delivery details
6. **Place Order**: Confirm order placement
7. **Track Order**: View order status in Orders page

## 🧪 Demo Credentials

**Admin Account:**
- Email: `admin@ecommerce.com`
- Password: `Admin@123`

**Customer Account:**
- Email: `customer@example.com`
- Password: `Password@123`

## 📡 API Integration

The frontend communicates with the backend API at `https://localhost:7097`. 

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

**Products**
- `GET /api/products` - List products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

**Categories**
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (Admin)

**Orders**
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Place order
- `PATCH /api/orders/{id}/status` - Update order status (Admin)

## 🚀 Performance Optimizations

- Lazy loading for pages
- Image optimization
- Efficient state management
- Skeleton loading states
- Debounced search

## 📝 Git Workflow

Branch: `frontend/apna-bazar`

Make sure to:
1. Pull latest changes
2. Create feature branches
3. Write clear commit messages
4. Push to remote repository

## 🤝 Contributing

To contribute to this project:
1. Create a new feature branch
2. Make your changes
3. Commit with clear messages
4. Push to your branch
5. Create a pull request

## 📄 License

This project is part of the Apna Bazar e-commerce platform.

## 🆘 Troubleshooting

### CORS Issues
If you face CORS errors, make sure your backend is configured to accept requests from `http://localhost:5173`

### API Connection Issues
- Check if backend is running at the configured URL
- Verify the `.env` file has correct API URL
- Ensure SSL certificates are trusted (for localhost)

### Port Already in Use
```bash
npm run dev -- --port 5174
```

## 📞 Support

For issues or questions, contact support at `support@apnabazar.com`

---

**Happy Shopping with Apna Bazar! 🛍️**
