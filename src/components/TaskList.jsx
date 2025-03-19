import { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, setEditTask, handleDeleteTask }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // ✅ Filter & Search Logic
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === 'all' ||
            (filterStatus === 'completed' && task.completed) ||
            (filterStatus === 'pending' && !task.completed))
    );

    return (
        <div className="border rounded-md p-4">
            {/* 🔍 Search & Filter Controls */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="p-2 border rounded w-2/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border rounded w-1/3"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* 📌 Task Table */}
            <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Due Date</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <tr key={task._id} className="border-t">
                                {/* ✅ Clickable Task Title */}
                                <td className="p-3">
                                    <Link to={`/task/${task._id}`} className="text-blue-500 hover:underline">
                                        {task.title}
                                    </Link>
                                </td>
                                <td className="p-3">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs rounded ${task.completed ? 'bg-green-200' : 'bg-yellow-200'}`}>
                                        {task.completed ? 'Completed' : 'Pending'}
                                    </span>
                                </td>
                                <td className="p-3 flex justify-center gap-2">
                                    <button
                                        onClick={() => setEditTask(task)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="p-3 text-center text-gray-500">
                                No tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
