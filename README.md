# Product Management Web Application

A modern e-commerce product management application built with React, TypeScript, and Vite. This application allows users to browse products, add them to cart, and proceed to checkout.

## 🚀 Features

- **Product Listing**: View all available products with images, prices, and descriptions
- **Product Details**: Detailed view of each product
- **Shopping Cart**: Add/remove products and manage quantities
- **Checkout Process**: Secure checkout flow
- **Responsive Design**: Works on desktop and mobile devices
- **State Management**: Using React Context API for cart management
- **Type Safety**: Built with TypeScript for better developer experience

## 🛠️ Setup Instructions

1. **Prerequisites**
   - Node.js (v16 or later)
   - npm or yarn

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_URL=your_api_url_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🏗️ Project Structure

```
src/
├── components/      # Reusable UI components
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services and utilities
└── App.tsx         # Main application component
```

## 🧪 Testing

To run tests:

```bash
npm test
# or
yarn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📝 Notes

- This project uses Vite for fast development and building
- ESLint and Prettier are configured for code quality
- The application is built with a mobile-first approach
```
