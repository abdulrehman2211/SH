// src/pages/Cart.js (or your chosen path for this component)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, XMarkIcon, PlusIcon, MinusIcon, ArrowRightIcon, GiftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext'; // Adjust path if CartContext.js is elsewhere

const Cart = () => { // Renamed component to Cart
  const {
    cartItems,
    removeItemFromCart,
    updateItemQuantity,
    toggleGiftOption,  // Assuming these are available from your useCart hook
    updateGiftMessage // Assuming these are available from your useCart hook
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    updateItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeItemFromCart(productId);
  };

  const handleApplyCoupon = () => {
    // TODO: Implement actual coupon logic
    console.log(`Applying coupon: ${couponCode}`);
    alert(`Coupon "${couponCode}" applied (demo)!`);
  };

  // --- Calculations ---
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const giftBoxCost = cartItems.reduce((sum, item) => sum + (item.giftBoxAdded ? 4.95 : 0), 0);
  const shippingCost = subtotal > 0 ? 5.99 : 0; // Example shipping logic
  const taxEstimate = subtotal * 0.08; // Example 8% tax
  const grandTotal = subtotal + giftBoxCost + shippingCost + taxEstimate;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl text-center mb-12 font-serif">
          Shopping Cart
        </h1>

        {/* Form tag wraps both cart items and summary for potential single submission */}
        <form className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            {cartItems.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 md:p-12 text-center border border-gray-200">
                <ShoppingBagIcon className="w-20 h-20 text-brand-primary opacity-50 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-text-primary mb-3">Your cart is currently empty.</h2>
                <p className="text-text-secondary mb-8">
                  Add some beautiful Zardozi pieces to your cart to see them here!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-brand-primary px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200 bg-white shadow-md rounded-t-lg">
                  {cartItems.map((item, productIdx) => ( // Changed product to item for clarity within map
                    <li key={item.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageSrc || item.image || 'https://via.placeholder.com/100x120.png?text=No+Image'}
                          alt={item.imageAlt || item.name || 'Product image'}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link to={item.href || `/products/${item.id}`} className="font-medium text-text-primary hover:text-brand-primary">
                                  {item.name || 'Product Name'}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-text-secondary">{item.color || 'N/A'}</p>
                              {item.size && <p className="ml-4 border-l border-gray-200 pl-4 text-text-secondary">{item.size}</p>}
                            </div>
                            <p className="mt-1 text-sm font-medium text-text-primary">${item.price ? item.price.toFixed(2) : '0.00'}</p>
                            {item.brand && <p className="mt-1 text-xs text-gray-500">{item.brand}</p>}
                            {item.styleInfo && <p className="mt-1 text-xs text-gray-500">{item.styleInfo}</p>}
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                              Quantity, {item.name}
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md w-fit">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 py-1.5 text-gray-500 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
                                disabled={item.quantity <= 0}
                              >
                                <MinusIcon className="h-5 w-5" />
                              </button>
                              <input
                                id={`quantity-${productIdx}`}
                                name={`quantity-${productIdx}`}
                                type="number"
                                min="0"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value, 10);
                                  if (!isNaN(val)) {
                                    handleQuantityChange(item.id, val);
                                  } else if (e.target.value === '') {
                                    handleQuantityChange(item.id, 0);
                                  }
                                }}
                                className="w-12 border-transparent text-center text-sm text-text-primary focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1.5 text-gray-500 hover:bg-gray-100 rounded-r-md"
                              >
                                <PlusIcon className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="absolute top-0 right-0">
                              <button type="button" onClick={() => handleRemoveItem(item.id)} className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500">
                                <span className="sr-only">Remove</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Gift Box UI */}
                        {( 'giftBoxAdded' in item ) && ( // Conditionally render if item can have gift options
                            <div className="mt-4">
                                {item.giftBoxAdded && (
                                <div className="p-2 bg-gray-100 rounded-md text-xs">
                                    <div className="flex items-center text-green-600 font-medium">
                                    <GiftIcon className="h-4 w-4 mr-1.5"/> Natori Gift Box Added (+$4.95)
                                    </div>
                                    <input
                                    type="text"
                                    value={item.giftMessage || ''}
                                    onChange={(e) => updateGiftMessage(item.id, e.target.value)}
                                    placeholder="Gift Message"
                                    className="mt-1 w-full text-xs p-1 border border-gray-300 rounded-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                )}
                                <button
                                    onClick={() => toggleGiftOption(item.id)}
                                    className={`mt-2 text-xs font-medium ${item.giftBoxAdded ? 'text-red-600 hover:text-red-500' : 'text-indigo-600 hover:text-indigo-500'} flex items-center`}
                                >
                                <GiftIcon className="h-4 w-4 mr-1"/> {item.giftBoxAdded ? 'Remove Gift Box' : 'Add Natori Gift Box'}
                                </button>
                            </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Coupon Code Input */}
                <div className="mt-8 p-6 bg-white rounded-b-lg border-x border-b border-gray-200 shadow-md sm:rounded-lg sm:border">
                  <label htmlFor="coupon-code" className="block text-sm font-medium text-text-secondary">
                    Have a coupon code?
                  </label>
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
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* Order summary */}
          {cartItems.length > 0 && (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-white shadow-md px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-gray-200"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-text-primary">
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
                  <dd className="text-sm font-medium text-text-primary">${shippingCost.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-text-secondary">
                    <span>Tax estimate</span>
                  </dt>
                  <dd className="text-sm font-medium text-text-primary">${taxEstimate.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-text-primary">Order total</dt>
                  <dd className="text-base font-medium text-text-primary">${grandTotal.toFixed(2)}</dd>
                </div>
              </dl>
              <div className="mt-8">
                <button
                  type="submit" // Part of the <form> that wraps the cart items and summary
                  className="w-full rounded-md border border-transparent bg-brand-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 text-center text-sm">
                <p>
                  <Link to="/products" className="font-medium text-brand-primary hover:text-button-primary-hover">
                    Continue Shopping
                    <ArrowRightIcon className="inline w-4 h-4 ml-1" />
                  </Link>
                </p>
              </div>
            </section>
          )}
        </form> {/* End of form */}
      </div>
    </div>
  );
};

export default Cart; // Changed export name to Cart