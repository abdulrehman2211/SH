// src/pages/CartPage.js
import React, { useState } /* No need for local useEffect for cartItems */ from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, XMarkIcon, PlusIcon, MinusIcon, GiftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext'; // Import the useCart hook

const CartPage = () => {
  // Get cart items and functions from the CartContext
  const { cartItems, removeItemFromCart, updateItemQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');

  // Local state for gift options (if not part of global cart item state)
  // For simplicity, this example assumes gift options are managed locally on this page.
  // A more robust solution might integrate gift options into the CartContext item structure.
  const [itemGiftOptions, setItemGiftOptions] = useState({});

  const handleToggleGiftBox = (itemId) => {
    setItemGiftOptions(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        giftBoxAdded: !prev[itemId]?.giftBoxAdded,
        giftMessage: !prev[itemId]?.giftBoxAdded ? '' : prev[itemId]?.giftMessage,
      }
    }));
  };

  const handleGiftMessageChange = (itemId, message) => {
     setItemGiftOptions(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        giftMessage: message,
      }
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateItemQuantity(productId, newQuantity); // Use context function
  };

  const handleRemoveItem = (productId) => {
    removeItemFromCart(productId); // Use context function
  };

  const handleApplyCoupon = () => {
    console.log(`TODO: Apply coupon code: ${couponCode}`);
    alert(`Coupon "${couponCode}" applied (demo)!`);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Gift box cost calculation based on local itemGiftOptions state
  const giftBoxCost = Object.keys(itemGiftOptions).reduce((sum, itemId) => {
    return sum + (itemGiftOptions[itemId]?.giftBoxAdded ? 4.95 : 0);
  }, 0);
  const shippingEstimate = subtotal > 0 ? 5.99 : 0; // Example shipping
  const taxEstimate = subtotal * 0.08; // Example 8% tax
  const orderTotal = subtotal + giftBoxCost + shippingEstimate + taxEstimate;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-10rem)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-serif">
              Shopping Cart
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 text-center">
              <ShoppingBagIcon className="w-16 h-16 text-brand-primary mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-text-primary mb-3">Your Cart is Empty</h2>
              <p className="text-text-secondary mb-8">
                Looks like you haven't added anything to your cart yet. <br />
                Start browsing our collections to find something you'll love!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7 bg-white shadow-lg rounded-lg p-6">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                  {cartItems.map((item) => {
                    const currentItemGiftOptions = itemGiftOptions[item.id] || { giftBoxAdded: false, giftMessage: '' };
                    return (
                    <li key={item.id} className="flex py-6 sm:py-8">
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageSrc || item.image} // Use imageSrc from context, fallback to item.image
                          alt={item.imageAlt || item.name}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link to={item.href || `/products/${item.id}`} className="font-medium text-text-primary hover:text-brand-primary">
                                  {item.name}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-text-secondary">{item.color || 'N/A'}</p>
                              {item.size && <p className="ml-4 pl-4 border-l border-gray-200 text-text-secondary">{item.size}</p>}
                            </div>
                            <p className="mt-1 text-sm font-medium text-text-primary">${item.price.toFixed(2)}</p>
                            {item.brand && <p className="mt-1 text-xs text-gray-500">{item.brand}</p>}
                            {item.styleInfo && <p className="mt-1 text-xs text-gray-500">{item.styleInfo}</p>}
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label htmlFor={`quantity-${item.id}`} className="sr-only">
                              Quantity, {item.name}
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md w-fit">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-text-secondary hover:bg-gray-100 rounded-l-md disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <MinusIcon className="h-4 w-4" />
                              </button>
                              <input
                                id={`quantity-${item.id}`}
                                name={`quantity-${item.id}`}
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                                className="w-12 border-transparent text-center text-sm text-text-primary focus:outline-none focus:ring-0"
                              />
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-text-secondary hover:bg-gray-100 rounded-r-md"
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Gift Box UI */}
                        <div className="mt-4">
                            {currentItemGiftOptions.giftBoxAdded && (
                            <div className="p-2 bg-gray-100 rounded-md text-xs">
                                <div className="flex items-center text-green-600 font-medium">
                                <GiftIcon className="h-4 w-4 mr-1.5"/> Natori Gift Box Added (+$4.95)
                                </div>
                                <input
                                type="text"
                                value={currentItemGiftOptions.giftMessage}
                                onChange={(e) => handleGiftMessageChange(item.id, e.target.value)}
                                placeholder="Gift Message"
                                className="mt-1 w-full text-xs p-1 border border-gray-300 rounded-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            )}
                            <button
                                onClick={() => handleToggleGiftBox(item.id)}
                                className={`mt-2 text-xs font-medium ${currentItemGiftOptions.giftBoxAdded ? 'text-red-600 hover:text-red-500' : 'text-indigo-600 hover:text-indigo-500'} flex items-center`}
                            >
                            <GiftIcon className="h-4 w-4 mr-1"/> {currentItemGiftOptions.giftBoxAdded ? 'Remove Gift Box' : 'Add Natori Gift Box'}
                            </button>
                        </div>
                      </div>
                    </li>
                  )})}
                </ul>

                {/* Coupon Code (same as before) */}
                <div className="mt-8">
                    {/* ... coupon code input and button ... */}
                    <label htmlFor="coupon-code" className="block text-sm font-medium text-text-secondary">Have a coupon?</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="text"
                            name="coupon-code"
                            id="coupon-code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-brand-primary focus:ring-brand-primary sm:text-sm px-3 py-2"
                            placeholder="Enter coupon code"
                        />
                        <button
                            type="button"
                            onClick={handleApplyCoupon}
                            className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                        > Apply
                        </button>
                    </div>
                </div>
              </section>

              {/* Order summary (same as before, calculations use context cartItems via localCartItems) */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-white shadow-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                {/* ... (rest of the order summary JSX) ... */}
                <h2 id="summary-heading" className="text-xl font-semibold text-text-primary">
                  Order summary
                </h2>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-text-secondary">Subtotal</dt>
                    <dd className="text-sm font-medium text-text-primary">${subtotal.toFixed(2)}</dd>
                  </div>
                   {giftBoxCost > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <dt className="text-sm text-text-secondary">Gift Boxes</dt>
                        <dd className="text-sm font-medium text-text-primary">${giftBoxCost.toFixed(2)}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-text-secondary">
                      <span>Shipping estimate</span>
                    </dt>
                    <dd className="text-sm font-medium text-text-primary">${shippingEstimate.toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-text-secondary">
                      <span>Tax estimate</span>
                    </dt>
                    <dd className="text-sm font-medium text-text-primary">${taxEstimate.toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-text-primary">Order total</dt>
                    <dd className="text-base font-medium text-text-primary">${orderTotal.toFixed(2)}</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-brand-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
                  > Checkout
                  </button>
                </div>
                 <div className="mt-6 text-center text-sm">
                    <p> or{' '}
                    <Link to="/products" className="font-medium text-brand-primary hover:text-button-primary-hover">
                        Continue Shopping
                        <span aria-hidden="true"> →</span>
                    </Link>
                    </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;