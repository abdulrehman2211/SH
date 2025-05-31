// src/pages/ContactPage.js
import React, { useState } from 'react';
import { FaTiktok, FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Import icons

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic (e.g., API call to a backend or service like Formspree/Netlify Forms)
    console.log('Form data submitted:', formData);
    alert('Message "sent"! (This is a demo, check console for data)');
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' }); // Clear form
    setTimeout(() => setSubmitted(false), 5000); // Reset submitted message after 5s
  };

  const socialLinks = [
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@zar_d0zi?_t=ZS-8woYAfrjtSR&_r=1',
      icon: <FaTiktok className="h-6 w-6" />,
      bgColor: 'bg-black hover:bg-gray-800', // TikTok often uses black
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1BcgH2KX8G/', // Ensure this link is correct for a page/profile
      icon: <FaFacebookF className="h-6 w-6" />,
      bgColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/zardoz_i?igsh=ZzBrMmJieG84Y3N3',
      icon: <FaInstagram className="h-6 w-6" />,
      bgColor: 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 hover:opacity-90', // Instagram gradient
    },
  ];

  return (
    <div className="bg-gray-50 py-12 lg:py-16"> {/* Increased padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16"> {/* Increased bottom margin */}
          <h2 className="text-base font-semibold text-brand-primary tracking-wide uppercase">Contact Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl font-serif">
            Get in Touch
          </p>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary lg:mx-auto">
            Have a question, feedback, or a custom Zardozi inquiry? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto"> {/* Centered content block */}
          {/* Contact Form Section */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-10">
            <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">Send Us a Message</h3>
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
                Thank you! Your message has been sent successfully. We'll get back to you shortly.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-brand-primary focus:border-brand-primary border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-brand-primary focus:border-brand-primary border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={5} // Increased rows for more space
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-brand-primary focus:border-brand-primary border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-brand-primary hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Direct Email and Social Links Section */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Or Connect With Us Directly
            </h3>
            <a
              href="mailto:zardozi80@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 mb-6 border border-gray-300 rounded-md shadow-sm text-base font-medium text-text-secondary hover:bg-gray-100 transition-colors"
            >
              <FaEnvelope className="h-5 w-5 mr-2 text-gray-500" />
              zardozi80@gmail.com
            </a>

            <div className="mt-4">
              <p className="text-sm text-text-secondary mb-3">Follow us on social media:</p>
              <div className="flex justify-center space-x-5">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 text-white rounded-full shadow-md transition-transform transform hover:scale-110 ${link.bgColor}`}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;