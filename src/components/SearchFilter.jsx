import { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter }) => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
    };

    const handleFilter = (e) => {
        setFilter(e.target.value);
        onFilter(e.target.value);
    };

    return (
        <div className="flex flex-wrap gap-4 mb-4">
            {/* 🔍 Search Input */}
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchText}
                onChange={handleSearch}
                className="p-2 border rounded w-full md:w-1/2"
            />

            {/* 📌 Status Filter Dropdown */}
            <select
                value={filter}
                onChange={handleFilter}
                className="p-2 border rounded w-full md:w-1/4"
            >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    );
};

export default SearchFilter;
