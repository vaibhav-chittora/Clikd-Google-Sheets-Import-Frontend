import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTasks, updateTask } from '../api/taskApi';
import { toast } from 'react-toastify';

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const loadTask = async () => {
            const tasks = await fetchTasks();
            const foundTask = tasks.find(t => t._id === id);
            if (!foundTask) {
                toast.error('Task not found!');
                navigate('/dashboard');
                return;
            }
            setTask(foundTask);
        };
        loadTask();
    }, [id, navigate]);

    const toggleComplete = async () => {
        try {
            const updatedTask = await updateTask(task._id, { completed: !task.completed });
            setTask(updatedTask);
            toast.success(`Task marked as ${updatedTask.completed ? 'Completed' : 'Pending'}`);
        } catch (error) {
            toast.error('Error updating task');
        }
    };

    if (!task) return <p className="text-center mt-10 text-gray-500">Loading task details...</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-3xl font-bold text-gray-800">{task.title}</h2>
            <p className="text-gray-600 mt-2">{task.description || "No description provided"}</p>
            <p className="text-sm text-gray-500 mt-1">
                Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}
            </p>
            <p className={`mt-4 px-3 py-1 text-white inline-block rounded ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}`}>
                {task.completed ? 'Completed' : 'Pending'}
            </p>
            <div className="mt-6 flex gap-2">
                <button
                    onClick={toggleComplete}
                    className={`w-full py-2 rounded text-white transition cursor-pointer 
                        ${task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded cursor-pointer"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;
