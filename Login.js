// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaGithub, FaFacebookF } from 'react-icons/fa'; // Import actual icons
import { EyeIcon, EyeSlashIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    alert('Login functionality not implemented yet.');
  };

  // SocialLinkButton component (now an anchor tag)
  const SocialLinkButton = ({ icon, label, bgColor, hoverBgColor, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full sm:w-auto flex-1 flex items-center justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${bgColor} ${hoverBgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-login-form-bg focus:ring-login-accent transition-all duration-150 transform hover:scale-105`}
      // Ensure login-form-bg and login-accent are defined in your tailwind.config.js
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{label}</span>
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-login-bg-start via-login-bg-mid to-login-bg-end p-4 relative overflow-hidden font-sans">
      {/* Abstract decorative shapes (simplified) */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-ping-slow animation-delay-2000"></div> {/* Ensure animation-delay-2000 is defined or use inline style */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-sky-500 rounded-3xl opacity-15 blur-2xl animate-float animation-delay-1000 transform rotate-45"></div> {/* Ensure animation-delay-1000 is defined */}
      <div className="absolute bottom-1/3 left-1/4 w-52 h-52 bg-purple-500 rounded-full opacity-10 blur-3xl animate-float-reverse"></div>


      <div className="relative z-10 w-full max-w-md bg-login-form-bg backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl text-white border border-slate-700"> {/* Added border for definition */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="text-3xl font-bold font-serif text-brand-primary hover:opacity-80 transition-opacity"> {/* Ensure brand-primary is defined */}
              Zardozi80
            </span>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back!</h2>
          <p className="mt-2 text-sm text-login-text-dim">Sign in to continue to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-login-text-light mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-login-input-bg border border-login-input-border rounded-lg placeholder-login-text-dim text-white focus:outline-none focus:ring-2 focus:ring-login-accent focus:border-login-accent transition-all text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-login-text-light">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-login-accent hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-login-input-bg border border-login-input-border rounded-lg placeholder-login-text-dim text-white focus:outline-none focus:ring-2 focus:ring-login-accent focus:border-login-accent transition-all text-sm pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-login-text-dim hover:text-login-text-light"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-login-accent hover:bg-login-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-login-form-bg focus:ring-login-accent transition-all duration-150 transform hover:scale-[1.03]"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-login-form-bg text-login-text-dim rounded-full">or continue with</span> {/* Ensure login-form-bg provides enough contrast or adjust text color */}
            </div>
          </div>

          {/* UPDATED SOCIAL LOGIN BUTTONS */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <SocialLinkButton
              icon={<FaGoogle className="w-5 h-5" />}
              label="Google"
              bgColor="bg-red-600" // Standard Google red
              hoverBgColor="hover:bg-red-700"
              href="https://www.google.com"
            />
            <SocialLinkButton
              icon={<FaGithub className="w-5 h-5" />}
              label="GitHub"
              bgColor="bg-gray-800" // Standard GitHub dark
              hoverBgColor="hover:bg-gray-900"
              href="https://www.github.com"
            />
            <SocialLinkButton
              icon={<FaFacebookF className="w-5 h-5" />}
              label="Facebook"
              bgColor="bg-blue-600" // Standard Facebook blue
              hoverBgColor="hover:bg-blue-700"
              href="https://www.facebook.com"
            />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-login-text-dim">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-medium text-login-accent hover:underline transition-colors">
            Register for free
          </Link>
        </p>
      </div>

      {/* Fullscreen toggle icon */}
      <button
        title="Toggle Fullscreen"
        onClick={() => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => console.error("Fullscreen request failed:", err));
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }}
        className="absolute bottom-5 right-5 bg-black bg-opacity-40 text-white p-2.5 rounded-full hover:bg-opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-login-accent"
        >
        <ArrowTopRightOnSquareIcon className="w-5 h-5 transform group-hover:scale-110" />
      </button>
    </div>
  );
};

export default LoginPage;