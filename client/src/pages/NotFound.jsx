import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen dark:text-white  dark:bg-slate-900 bg-gray-100">
      <div className="text-center px-6 md:px-12">
        <h1 className="text-9xl font-bold ">404</h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold ">
          Oops! Page not found
        </h2>
        <p className="mt-2  text-base md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>
        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-3 text-sm md:text-base font-medium  bg-blue-600 hover:bg-blue-700 rounded-md shadow-md"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
