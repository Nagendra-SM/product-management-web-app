import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Loader2, Check } from 'lucide-react';
import { api } from '../services/api';
import type { Product } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await api.getProductById(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        });
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
      </div>
    );
  }

  // Create an array of images (using the main image for demo, in a real app you might have multiple images)
  const productImages = [
    product.image,
    product.image.replace(/\.jpg$/, '-2.jpg'),
    product.image.replace(/\.jpg$/, '-3.jpg'),
  ].filter(Boolean);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage] || product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to main image if thumbnail fails to load
                        if (e.currentTarget.src !== product.image) {
                          e.currentTarget.src = product.image;
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-3">
                  {product.title}
                </h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center bg-amber-50 px-2.5 py-0.5 rounded-full">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="ml-1 text-sm font-medium text-amber-800">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ${(product.price / 10).toFixed(2)} per month (10 months)
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium ${
                      added
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart ({quantity} {quantity > 1 ? 'items' : 'item'})
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900">Shipping & Returns</h3>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>• Free standard shipping on orders over $50</li>
                  <li>• 30-day return policy</li>
                  <li>• Secure checkout with SSL encryption</li>
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900">Details</h3>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex">
                    <span className="w-24 text-gray-500">Category</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-500">In Stock</span>
                    <span className="text-green-600 font-medium">In Stock (Ships in 1-2 days)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
