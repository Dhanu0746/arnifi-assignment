import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobs } from './applicationsSlice';
import Navbar from '../../components/Navbar';

export default function AppliedJobsPage() {
    const dispatch = useDispatch();
    const { appliedJobs, loading } = useSelector((state) => state.applications);

    useEffect(() => {
        dispatch(fetchAppliedJobs());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Applied Jobs</h2>
                    <p className="text-gray-500 text-sm mt-1">{appliedJobs.length} application(s)</p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading...</div>
                ) : appliedJobs.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">You haven't applied to any jobs yet.</div>
                ) : (
                    <div className="space-y-4">
                        {appliedJobs.map((app) => (
                            <div key={app._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{app.job.position}</h3>
                                    <p className="text-blue-600 font-medium text-sm">{app.job.companyName}</p>
                                    <p className="text-gray-500 text-sm mt-1">📍 {app.job.location}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${app.job.type === 'Full Time'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {app.job.type}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Applied {new Date(app.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}