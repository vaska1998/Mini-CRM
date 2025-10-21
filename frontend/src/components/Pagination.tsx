interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, total, limit, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="flex justify-center gap-2 mt-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Prev
            </button>
            <span className="px-2 py-1 text-gray-700">{page} / {totalPages}</span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
