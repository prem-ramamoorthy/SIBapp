import React, { useState } from 'react';
import classNames from '../utils/classname';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setloading] = useState(false);
  const [message , setMessage ] = useState('') ;

  const Url = `${import.meta.env.VITE_BACKEND_SERVER}/auth/resetPassword`;
  const Options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email })
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch(Url, Options);
      const data = await response.json();

      if (data.message === "Password reset email sent successfully") {
        setMessage("Password reset link has been generated and sent successfully.");
      } else {
        console.log(data.message);
        setMessage("Unknown error occurred") ;
      }
    } catch (error) {
      setMessage(`Error occurred: ${error.message}`);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Reset Password
        </h2>
        {message && (
          <h2 className="text-blue-700 mb-2 p-1 text-center border-2 border-blue-800 rounded bg-blue-200/75 ">
            {message}
          </h2>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Enter your email address
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 mb-6"
            placeholder="example@mail.com"
          />
          <button
            type="submit"
            disabled={loading}
            className={classNames(
              "w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition-colors duration-200",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
