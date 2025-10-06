import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import ExpensePage from './pages/ExpensePage';
import HomePage from './pages/HomePage';
import LogoutPage from './pages/LogoutPage';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import logo from './assets/img/logo.png';

function App() {
    const { user } = useAuth();
  return (
    <>
    <main className="row-start-2 row-end-3 col-span-full md:col-start-2 md:col-end-3 bg-white p-6 overflow-y-auto">

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className="">
                <Link to="/"><img src={logo} alt="Logo" className="h-16 mx-auto mb-4" /></Link>
            </div>
            <div className=" text-center">
                <h1 className="text-2xl font-bold mb-0"><strong>My Tracker</strong></h1>
            </div>
            <div className="text-right mr-3">
                {!user ? (
                    <div>
                      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </div>
                  ) : (
                    <div className="">
                        <h3 className="font-bold">Welcome { user.name }, </h3>
                        <Link to="/todo">Todo List</Link> | 
                        <Link to="/expense" className="ml-1">Expense List</Link> | 
                        <Link to="/logout" className="ml-1">Logout</Link>
                    </div>
                )}
            </div>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/todo" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute><ExpensePage /></ProtectedRoute>} />
        </Routes>
    </main>
    </>
  );
}

export default App;
