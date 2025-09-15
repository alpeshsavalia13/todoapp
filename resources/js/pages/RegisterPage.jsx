import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="password"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Confirm Password"
          onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
    </>
  );
};

export default RegisterPage;
