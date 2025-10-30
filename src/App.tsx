import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';

const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
  </div>
);

function App() {

  return (
    <>
     <ErrorBoundary>
      <Router>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </Suspense>
          </div>
        </CartProvider>
      </Router>
    </ErrorBoundary>
    </>
  )
}

export default App
