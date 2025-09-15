import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API, { getCsrfCookie } from '../api';
import Badge from '../components/Badge';

const TodoPage = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');

  const fetchTodos = async () => {
    const { data } = await API.get('/api/todos');
    setTodos(data);
  };

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const addTodo = async () => {
    let url = '/api/todos';
    if (id) {
      url = url + '/'+id;
    }
    const { data } = await API.post(url, { title });
    if (id) {
      setTodos(todos.map(t => (t.id === id ? data : t)));
    } else {

      setTodos([data, ...todos]);
    }
    setTitle('');
    setId('');
  };

  const startEdit = async(todo) => {
    setTitle(todo.title);
    setId(todo.id);
  };

  const toggleComplete = async (todo) => {
    const { data } = await API.post(`/api/todos/${todo.id}`, { completed: !todo.completed });
    setTodos(todos.map(t => t.id === todo.id ? data : t));
  };

  const deleteTodo = async (id) => {
    await API.delete(`/api/todos/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  const cancel = async(todo) => {
    setTitle('');
    setId('');
  };

  if (!user) return <div>Please login</div>;

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Todo</h2>
        <input className="w-full border border-gray-300 rounded p-2 mb-4" value={title} onChange={e => setTitle(e.target.value)} placeholder="New Todo" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={addTodo}> { id ? 'Update' : 'Add'}</button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded ml-2" onClick={() => cancel()}>Cancel</button>
        <h2 className="text-2xl font-bold mt-4">List</h2>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
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
                    {todos.map(todo => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={todo.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <span
                              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                              onClick={() => toggleComplete(todo)}
                            >
                              {todo.title}
                            </span>
                        </th>
                        <td className="px-6 py-4">
                            {todo.created_at}
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => startEdit(todo)}><Badge color="blue">Edit</Badge></button>
                            <button onClick={() => deleteTodo(todo.id)} className="ml-1"><Badge color="red">Delete</Badge></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default TodoPage;
