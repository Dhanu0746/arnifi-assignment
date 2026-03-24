import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
} from '../jobs/jobsSlice';
import Navbar from '../../components/Navbar';

const emptyForm = { companyName: '', position: '', type: 'Full Time', location: '' };

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { jobs, loading } = useSelector((state) => state.jobs);

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Only show jobs posted by this admin
    const myJobs = jobs.filter((j) => j.postedBy?._id === user?.id || j.postedBy === user?.id);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        if (editingId) {
            await dispatch(updateJob({ id: editingId, data: form }));
            setSuccessMsg('Job updated successfully!');
        } else {
            await dispatch(createJob(form));
            setSuccessMsg('Job created successfully!');
        }
        setForm(emptyForm);
        setEditingId(null);
        setSubmitLoading(false);
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleEdit = (job) => {
        setEditingId(job._id);
        setForm({
            companyName: job.companyName,
            position: job.position,
            type: job.type,
            location: job.location,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            dispatch(deleteJob(id));
        }
    };

    const handleCancel = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

                {/* Job Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        {editingId ? '✏️ Edit Job' : '➕ Post a New Job'}
                    </h2>

                    {successMsg && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Arnifi"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={form.position}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Frontend Intern"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Dubai"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="sm:col-span-2 flex gap-3">
                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-60"
                            >
                                {submitLoading ? 'Saving...' : editingId ? 'Update Job' : 'Post Job'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-lg text-sm transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Jobs Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">My Posted Jobs</h2>

                    {loading ? (
                        <div className="text-center py-10 text-gray-400">Loading...</div>
                    ) : myJobs.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">No jobs posted yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                                        <th className="pb-3 pr-4">Company</th>
                                        <th className="pb-3 pr-4">Position</th>
                                        <th className="pb-3 pr-4">Type</th>
                                        <th className="pb-3 pr-4">Location</th>
                                        <th className="pb-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {myJobs.map((job) => (
                                        <tr key={job._id} className="hover:bg-gray-50 transition">
                                            <td className="py-3 pr-4 font-medium text-gray-900">{job.companyName}</td>
                                            <td className="py-3 pr-4 text-gray-600">{job.position}</td>
                                            <td className="py-3 pr-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.type === 'Full Time'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {job.type}
                                                </span>
                                            </td>
                                            <td className="py-3 pr-4 text-gray-600">{job.location}</td>
                                            <td className="py-3 flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(job)}
                                                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-lg transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job._id)}
                                                    className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-1.5 rounded-lg transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}