import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API, { getCsrfCookie } from '../api';
import Badge from '../components/Badge';

const MilkExpensePage = () => {
  const { user } = useAuth();
  const [expenses, setExpeses] = useState([]);
  const [records, setRecords] = useState([]);
  const [month, setMonth] = useState('');
  const [id, setId] = useState('');

  const [isVisibleAddForm, setIsVisibleAddForm] = useState(false);

  const toggleVisibility = () => {
    setIsVisibleAddForm(!isVisibleAddForm); // Toggle the state
    defaultForm();
  };

  const fetchExpense = async () => {
    const { data } = await API.get('/api/milkexpense');
    setExpeses(data);
  };

  useEffect(() => {
    defaultForm();

    if (user) fetchExpense();
  }, [user]);

  const defaultForm = () => {
    const days = Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      morning: "",
      evening: "",
    }));
    setRecords(days);
  }

  const addExpense = async () => {
    let url = '/api/milkexpense';
    if (id) {
      url = url + '/'+id;
    }
    const { data } = await API.post(url, { month, day_wise_ltr: records });
    if (id) {
      setExpeses(expenses.map(t => (t.id === id ? data : t)));
    } else {
      setExpeses([data, ...expenses]);
    }
    setMonth('');
    setId('');
  };

    const startEdit = async (expense) => {
      try {
        setIsVisibleAddForm(true);
        setMonth(expense.month); // e.g. "2025-10"
        setId(expense.id);

        // Fetch saved day-wise data for that month
        //const { data } = await API.get(`/api/milkexpense/${expense.id}`);
        const data = expense.day_wise_ltr;

        // Merge fetched data into existing 31-day array (to handle missing days)
        const days = Array.from({ length: 31 }, (_, i) => ({
          day: i + 1,
          morning: "",
          evening: "",
        }));

        const merged = days.map((d) => {
          const found = data.find((r) => r.day === d.day);
          return found ? found : d;
        });

        setRecords(merged);
      } catch (err) {
        console.error(err);
        alert("Failed to load records for editing");
      }
    };

  const deleteExpense = async (id) => {
    await API.delete(`/api/milkexpense/${id}`);
    setExpeses(expenses.filter(t => t.id !== id));
  };

  const cancel = async(expense) => {
    //setTitle('');
    setMonth('');
    //setAmount('');
    setId('');
  };

    const handleChange = (index, field, value) => {
        setRecords((prev) => {
          const updated = [...prev];
          updated[index][field] = value;
          return updated;
        });
    };
  if (!user) return <div>Please login</div>;

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Milk Expense <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-1 px-2 rounded add-new" onClick={toggleVisibility}>Add New</button></h2>
        <div className={ !isVisibleAddForm ? 'hidden' : '' }>
            <input type="month" className="w-full border border-gray-300 rounded p-2 mb-4" value={month} onChange={e => setMonth(e.target.value)} placeholder="Date" />
            <div className="relative overflow-x-auto mb-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Day
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Morning
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Evening
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { records.map((record, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={record.day}>
                                <td className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <input key={record.day} type="text" placeholder={`${record.day}`} className="w-full border border-gray-300 rounded p-2" value={record.day} readonly/>
                                </td>
                                <td className="px-6 py-1">
                                    <input type="number" step="0.1" min="1" className="w-full border border-gray-300 rounded p-2" value={record.morning} onChange={(e) => handleChange(index, "morning", e.target.value)} placeholder="Liter" />
                                </td>
                                <td className="px-6 py-1">
                                    <input type="number" step="0.1" min="1" className="w-full border border-gray-300 rounded p-2" value={record.evening} onChange={(e) => handleChange(index, "evening", e.target.value)} placeholder="Liter" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
                    onClick={addExpense}
                  >
                    Save All
                </button>
            </div>
        </div>
        <h2 className="text-2xl font-bold mt-4">List</h2>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Liter
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Per Ltr Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
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
                              {expense.name}
                            </span>
                        </th>
                        <td className="px-6 py-4">
                            {expense.month}
                        </td>
                        <td className="px-6 py-4">
                            {expense.total_ltr}
                        </td>
                        <td className="px-6 py-4">
                            ₹{expense.per_ltr_price}
                        </td>
                        <td className="px-6 py-4">
                            ₹{expense.total_amount}
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

export default MilkExpensePage;
