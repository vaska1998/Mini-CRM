import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-4">
            <div className="text-lg font-semibold">Mini CRM</div>
            <div className="flex gap-4">
                <Link
                    to="/companies"
                    className={`hover:text-blue-400 ${location.pathname === '/companies' ? 'text-blue-400' : ''}`}
                >
                    Companies
                </Link>
                <Link
                    to="/employees"
                    className={`hover:text-blue-400 ${location.pathname === '/employees' ? 'text-blue-400' : ''}`}
                >
                    Employees
                </Link>
            </div>
        </div>
    );
}

export default Header;
