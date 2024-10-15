import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';



const Signin = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  function handlePasswordShow(){
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex justify-center screenHeight bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign In</h2>
        
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <div className='flex gap-2 items-center'>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button className='flex items-center justify-center px-4 py-2 mt-2 text-gray-900 bg-white border-gray-300 rounded-lg hover:bg-gray-100  dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600' onClick={handlePasswordShow}>{showPassword ? <IoMdEye /> :<IoMdEyeOff />}</button>
          </div>
         
        </div>


        {/* Sign In Button */}
        <button className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Sign In
        </button>

        {/* Continue with Google Button */}
        <button className="w-full flex items-center justify-center px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Don't have an account?{' '}
          <Link to={"/signup"} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
