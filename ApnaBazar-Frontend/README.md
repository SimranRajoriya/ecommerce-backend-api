# ApnaBazar - E-Commerce Frontend 🛍️

**Production-Quality Flipkart-Style E-Commerce Frontend**

Built with **React 19 + TypeScript + Vite + Tailwind CSS**, seamlessly integrated with ASP.NET Core backend.

## ✨ Features

### Customer Features
- 🏠 **Home Page** - Beautiful banner carousel with categories
- 🔍 **Product Search & Filters** - By category, price range, search query
- 📄 **Product Pagination** - 12 products per page
- 📦 **Product Details Page** - Full product information with images
- 🛒 **Shopping Cart** - LocalStorage persistence, cart updates
- 🔐 **User Authentication** - JWT auth with refresh tokens
- 📋 **My Orders** - View order history with status tracking
- 💳 **Checkout** - Complete order placement flow

### Admin Features
- 📊 **Admin Dashboard** - Overview with key metrics
- 📦 **Product Management** - Add, edit, delete products
- 🏷️ **Category Management** - Manage product categories
- 📬 **Order Management** - Update order status
- 📤 **Image Upload** - Product image management

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **UI Framework** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router v7 |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Build Tool** | Vite |
| **State Management** | React Context API |

## 📋 Prerequisites

- **Node.js** 18+
- **Backend** running at `http://localhost:5186`

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd ApnaBazar-Frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Start Backend (in another terminal)

```bash
cd ../ECommerceBackend
dotnet run
```

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@ecommerce.com | Admin@123 |
| **Customer** | Create a new account | Your password |

## 📁 Project Structure

```
ApnaBazar-Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── ProductCard.tsx  # Product card component
│   │   ├── Banner.tsx       # Banner carousel
│   │   ├── Filters.tsx      # Product filters
│   │   └── Footer.tsx       # Footer component
│   ├── context/             # React Context for state management
│   │   ├── AuthContext.tsx  # Authentication context
│   │   └── CartContext.tsx  # Shopping cart context
│   ├── pages/               # Route pages
│   │   ├── Home.tsx         # Home page
│   │   ├── ProductDetail.tsx# Product detail page
│   │   ├── Cart.tsx         # Shopping cart page
│   │   ├── MyOrders.tsx     # Orders page
│   │   ├── auth/
│   │   │   ├── Login.tsx    # Login page
│   │   │   └── Register.tsx # Registration page
│   │   └── admin/
│   │       └── AdminDashboard.tsx  # Admin panel
│   ├── services/            # API layer
│   │   └── api.ts          # Axios instance with interceptors
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # All type definitions
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── README.md              # This file
```

## 🔗 API Integration

The frontend connects to these backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/revoke` - Logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products with pagination & filters
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)
- `POST /api/products/{id}/images` - Upload product images (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/{id}` - Update category (Admin)
- `DELETE /api/categories/{id}` - Delete category (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/{id}/status` - Update order status (Admin)

## ⚙️ Configuration

Vite is configured to proxy `/api` and `/uploads` to the backend:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5186',
      changeOrigin: true,
      secure: false
    }
  }
}
```

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Highlights

- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Flipkart-Inspired UI** - Modern, clean, and user-friendly interface
- **Product Cards** - Beautiful cards with ratings, prices, and quick add-to-cart
- **Dynamic Banner** - Auto-rotating carousel with categories
- **Smooth Animations** - Hover effects and transitions
- **Color Scheme** - Professional blue, yellow, and gray palette
- **Icons** - Lucide React icons for consistency

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Token Refresh** - Automatic token refresh on expiry
- **Axios Interceptors** - Request/response interceptors for auth
- **LocalStorage** - Secure token and user data storage
- **Protected Routes** - Role-based access control

## 📊 State Management

### Authentication (AuthContext)
- User login/register/logout
- Token management
- Role-based access (Admin/Customer)

### Shopping Cart (CartContext)
- Add/remove items from cart
- Update quantities
- Persist cart in LocalStorage
- Calculate totals

## 🎯 Internship Portfolio Highlights

✅ **Full-Stack Integration** - Complete frontend-backend integration  
✅ **Professional Code Quality** - TypeScript, proper architecture, best practices  
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **JWT Authentication** - Secure auth with refresh tokens  
✅ **State Management** - React Context for global state  
✅ **API Integration** - Axios with interceptors  
✅ **Admin Panel** - Complete admin management system  
✅ **E-Commerce Flow** - Search, filters, cart, checkout, orders  
✅ **User Experience** - Fast, smooth, intuitive interface  
✅ **Production Ready** - Optimized, clean, deployable code  

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the dist folder to Netlify
```

## 📞 Support

For issues or questions:
1. Check the backend API is running
2. Verify the connection string in `vite.config.ts`
3. Check browser console for errors
4. Verify backend is responding to `/api/categories`

## 📝 License

This project is for internship purposes. Created with ❤️ for learning.

---

**Built for Excellence in Internship** ⭐  
Make your mark with ApnaBazar - A production-quality e-commerce platform!
