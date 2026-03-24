import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <Link to={user?.role === 'admin' ? '/admin' : '/jobs'}>
                <span className="text-xl font-bold text-blue-600">Arnifi Jobs</span>
            </Link>

            <div className="flex items-center gap-6">
                {user?.role === 'user' && (
                    <>
                        <Link to="/jobs" className="text-sm text-gray-600 hover:text-blue-600 font-medium">
                            Browse Jobs
                        </Link>
                        <Link to="/applied" className="text-sm text-gray-600 hover:text-blue-600 font-medium">
                            Applied Jobs
                        </Link>
                    </>
                )}

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                        Hi, <span className="font-medium text-gray-800">{user?.name}</span>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-1.5 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}