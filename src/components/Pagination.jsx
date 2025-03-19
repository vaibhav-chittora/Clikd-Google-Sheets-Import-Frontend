const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-green-500 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
