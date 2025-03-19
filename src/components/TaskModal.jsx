import { useState } from 'react';

const TaskModal = ({ task, onClose, onSave }) => {
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask(prev => ({
            ...prev,
            [name]: name === 'completed' ? value === 'true' : value
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>

                <label className="block text-sm font-semibold">Title</label>
                <input
                    type="text"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block text-sm font-semibold">Description</label>
                <textarea
                    name="description"
                    value={updatedTask.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block text-sm font-semibold">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString().split('T')[0] : ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block text-sm font-semibold">Status</label>
                <select
                    name="completed"
                    value={updatedTask.completed}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                >
                    <option value="false">Pending</option>
                    <option value="true">Completed</option>
                </select>

                <div className="flex justify-between">
                    <button onClick={() => onSave(updatedTask)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                    <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
