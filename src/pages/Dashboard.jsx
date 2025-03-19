import { useEffect, useState } from 'react';
import { fetchPaginatedTasks, createTask, updateTask, deleteTask, importTasks } from '../api/taskApi';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import Pagination from '../components/Pagination';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
    const [sheetUrl, setSheetUrl] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    // ✅ Load Paginated Tasks on Page Load
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchPaginatedTasks(currentPage, 5);
                setTasks(data.tasks);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        loadTasks();
    }, [currentPage]);

    // ✅ Handle New Task Submit
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) {
            alert('⚠️ Task title is required!');
            return;
        }

        const task = await createTask(newTask);
        setTasks([...tasks, task]);
        setNewTask({ title: '', description: '', dueDate: '' });
    };

    // ✅ Handle Task Delete
    const handleDeleteTask = async (id) => {
        if (!window.confirm('❌ Are you sure you want to delete this task?')) return;

        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
            toast.success("Task deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete task!");
        }
    };


    // ✅ Handle Edit Task
    const handleUpdateTask = async (updatedTask) => {
        try {
            const newTaskData = await updateTask(updatedTask._id, updatedTask);
            setTasks(tasks.map(task => (task._id === updatedTask._id ? newTaskData : task)));
            setEditTask(null); // Close modal
            toast.success("Task updated successfully!");
        } catch (error) {
            toast.error("Failed to update task!");
        }
    };



    // ✅ Validate Google Sheet Link
    const isValidGoogleSheetLink = (url) => {
        return /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/.test(url);
    };

    // ✅ Handle Google Sheets Import
    const handleImportTasks = async () => {
        if (!sheetUrl.trim()) {
            toast.warn("⚠️ Please enter a Google Sheets link!");
            return;
        }

        if (!isValidGoogleSheetLink(sheetUrl)) {
            toast.error("❌ Invalid Google Sheets link. Please enter a valid public link!");
            return;
        }

        try {
            await importTasks(sheetUrl);
            setSheetUrl('');
            toast.success("✅ Tasks imported successfully!");
            window.location.reload();
        } catch (error) {
            toast.error("❌ Failed to import tasks. Please check the sheet and try again.");
        }
    };


    // ✅ Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully!");
        navigate('/');
    };


    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Task Manager</h2>
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 btn-danger hover:bg-red-600"
            >
                Logout
            </button>

            {/* ✅ Add Task Form */}
            <form onSubmit={handleTaskSubmit} className="mb-6 flex gap-2">
                <input type="text" placeholder="Task Title" value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
                <input type="text" placeholder="Description" value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                <input type="date" value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                <button type="submit" className="btn-primary">Add</button>
            </form>

            {/* ✅ Google Sheets Import */}
            {/* ✅ Google Sheets Import */}
            <div className="mb-6">
                <label className="block font-semibold text-gray-700">Import Tasks from Google Sheets</label>
                <div className="flex gap-2 mt-2">
                    <input
                        type="text"
                        placeholder="Enter Google Sheets URL (Make sure it's public)"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <button
                        onClick={handleImportTasks}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Import
                    </button>
                </div>
                {/* ✅ Example Format */}
                <p className="text-sm text-gray-600 mt-2">
                    🔹 <strong>Required Columns in Google Sheet:</strong> <br />
                    <code className="bg-gray-200 p-1 rounded block mt-1">
                        | Title | Description | DueDate (YYYY-MM-DD) | Completed (true/false) |
                    </code>
                    <br />
                    Example Row: <br />
                    <code className="bg-gray-200 p-1 rounded block">
                        | Task 1 | Sample Task | 2024-05-10 | false |
                    </code>
                </p>
            </div>


            {/* ✅ Task List with Search & Filters */}
            <TaskList tasks={tasks} setEditTask={setEditTask} handleDeleteTask={handleDeleteTask} />

            {/* ✅ Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

            {/* ✅ Edit Task Modal */}
            {editTask && <TaskModal task={editTask} onClose={() => setEditTask(null)} onSave={handleUpdateTask} />}
        </div>
    );
};

export default Dashboard;
