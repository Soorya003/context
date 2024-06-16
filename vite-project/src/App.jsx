import React, { createContext, useContext, useReducer } from 'react';

// Define initial state with products data
const initialState = {
  cartItems: [],
  products: [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "data:image/jpeg;base64,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",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    },
    {
      "id": 2,
      "title": "iPhone X",
      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      "price": 899,
      "discountPercentage": 17.94,
      "rating": 4.44,
      "stock": 34,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/2/1.jpg",
        "https://i.dummyjson.com/data/products/2/2.jpg",
        "https://i.dummyjson.com/data/products/2/3.jpg",
        "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
      ]
    },
    {
      "id": 3,
      "title": "Samsung Universe 9",
      "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
      "price": 1249,
      "discountPercentage": 15.46,
      "rating": 4.09,
      "stock": 36,
      "brand": "Samsung",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/3/1.jpg"
      ]
    },
    {
      "id": 4,
      "title": "OPPOF19",
      "description": "OPPO F19 is officially announced on April 2021.",
      "price": 280,
      "discountPercentage": 17.91,
      "rating": 4.3,
      "stock": 123,
      "brand": "OPPO",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/4.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
      ]
    },
    {
      "id": 5,
      "title": "Huawei P30",
      "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      "price": 499,
      "discountPercentage": 10.58,
      "rating": 4.09,
      "stock": 32,
      "brand": "Huawei",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/5/1.jpg",
        "https://i.dummyjson.com/data/products/5/2.jpg",
        "https://i.dummyjson.com/data/products/5/3.jpg"
      ]
    }
  ]
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    default:
      return state;
  }
};

// Create Context
const CartContext = createContext();

// Create Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = item => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);


function App() {
  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          <h1>Shopping Cart</h1>
        </header>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

// ProductList component to display products and add to cart button
function ProductList() {
  const { products, addToCart } = useCart();

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cart component to display items in the cart
function Cart() {
  const { cartItems, updateQuantity } = useCart();

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveFromCart = id => {
    // Implement remove from cart functionality if needed
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.title}</p>
            <p>Price: ${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
              min="1"
            />
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: ${totalPrice}</p>
      </div>
    </div>
  );
}

export default App;

