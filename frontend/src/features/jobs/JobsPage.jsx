import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, applyToJob, setAppliedJobIds } from './jobsSlice';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

export default function JobsPage() {
    const dispatch = useDispatch();
    const { jobs, loading, applyingId, appliedJobIds } = useSelector((state) => state.jobs);

    const [search, setSearch] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        dispatch(fetchJobs());
        // fetch already applied job ids
        api.get('/applications').then((res) => {
            const ids = res.data.map((app) => app.job._id);
            dispatch(setAppliedJobIds(ids));
        });
    }, [dispatch]);

    const locations = [...new Set(jobs.map((j) => j.location))];

    const filtered = jobs.filter((job) => {
        const matchSearch = job.companyName.toLowerCase().includes(search.toLowerCase());
        const matchLocation = locationFilter ? job.location === locationFilter : true;
        const matchType = typeFilter ? job.type === typeFilter : true;
        return matchSearch && matchLocation && matchType;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Browse Jobs</h2>
                    <p className="text-gray-500 text-sm mt-1">{filtered.length} jobs available</p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Search by company name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Locations</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Types</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                    </select>
                </div>

                {/* Jobs Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading jobs...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">No jobs found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((job) => {
                            const alreadyApplied = appliedJobIds.includes(job._id);
                            const isApplying = applyingId === job._id;

                            return (
                                <div key={job._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.type === 'Full Time'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {job.type}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">{job.position}</h3>
                                        <p className="text-blue-600 font-medium text-sm mt-1">{job.companyName}</p>
                                        <p className="text-gray-500 text-sm mt-1">📍 {job.location}</p>
                                    </div>

                                    <button
                                        onClick={() => dispatch(applyToJob(job._id))}
                                        disabled={alreadyApplied || isApplying}
                                        className={`mt-5 w-full py-2 rounded-lg text-sm font-semibold transition ${alreadyApplied
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {isApplying ? 'Applying...' : alreadyApplied ? 'Applied ✓' : 'Apply Now'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}