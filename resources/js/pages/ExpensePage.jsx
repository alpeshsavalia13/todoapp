import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API, { getCsrfCookie } from '../api';
import Badge from '../components/Badge';

const ExpensePage = () => {
  const { user } = useAuth();
  const [expenses, setExpeses] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [id, setId] = useState('');

  const fetchExpense = async () => {
    const { data } = await API.get('/api/expense');
    setExpeses(data);
  };

  useEffect(() => {
    if (user) fetchExpense();
  }, [user]);

  const addExpense = async () => {
    let url = '/api/expense';
    if (id) {
      url = url + '/'+id;
    }
    const { data } = await API.post(url, { title, date, amount });
    if (id) {
      setExpeses(expenses.map(t => (t.id === id ? data : t)));
    } else {

      setExpeses([data, ...expenses]);
    }
    setTitle('');
    setDate('');
    setAmount('');
    setId('');
  };

  const startEdit = async(expense) => {
    setTitle(expense.title);
    setDate(expense.date);
    setAmount(expense.amount);
    setId(expense.id);
  };

  const deleteExpense = async (id) => {
    await API.delete(`/api/expense/${id}`);
    setExpeses(expenses.filter(t => t.id !== id));
  };

  const cancel = async(expense) => {
    setTitle('');
    setDate('');
    setAmount('');
    setId('');
  };

  if (!user) return <div>Please login</div>;

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Expense</h2>
        <input className="w-full border border-gray-300 rounded p-2 mb-4" value={title} onChange={e => setTitle(e.target.value)} placeholder="New Expense" />
        <input type="date" className="w-full border border-gray-300 rounded p-2 mb-4" value={date} onChange={e => setDate(e.target.value)} placeholder="Date" />
        <input type="number" step="0.1" min="1" className="w-full border border-gray-300 rounded p-2 mb-4" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount in ₹" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={addExpense}> { id ? 'Update' : 'Add'}</button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded ml-2" onClick={() => cancel()}>Cancel</button>
        <h2 className="text-2xl font-bold mt-4">List</h2>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={expense.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <span
                              style={{ cursor: 'pointer' }}
                            >
                              {expense.date}
                            </span>
                        </th>
                        <td className="px-6 py-4">
                            ₹{expense.amount}
                        </td>
                        <td className="px-6 py-4">
                            {expense.title}
                        </td>
                        <td className="px-6 py-4">
                            {expense.created_at}
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => startEdit(expense)}><Badge color="blue">Edit</Badge></button>
                            <button onClick={() => deleteExpense(expense.id)} className="ml-1"><Badge color="red">Delete</Badge></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ExpensePage;
