import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { FaSpinner, FaSearch } from "react-icons/fa";

function Magazine() {
  const { showToast } = useNotification();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Tea Culture", "Spiritual"];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4010/api";
        const response = await fetch(`${apiUrl}/v1/blogs`);
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        } else {
          setError(data.message || "Failed to retrieve articles");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Could not connect to the server. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "All" || blog.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    showToast("Thanks for subscribing to our newsletter!", "success");
    e.target.reset();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Karuya Chronicles</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Blogs & Magazine
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 font-light text-lg">
          Dive into our journals on remote travel destinations, organic tea culture, and cultural expeditions.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === category
                  ? "bg-[#1F4027] text-white shadow-sm"
                  : "bg-gray-50 text-gray-500 hover:bg-amber-50 hover:text-amber-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] bg-gray-50/50"
          />
          <FaSearch className="absolute right-3.5 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-24 space-y-4">
          <FaSpinner className="animate-spin text-4xl text-[#1F4027] mx-auto" />
          <p className="text-gray-400 text-sm">Loading articles...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div className="text-center py-20 max-w-md mx-auto space-y-4">
          <div className="text-4xl">⚠️</div>
          <p className="text-gray-500 text-sm font-light">{error}</p>
        </div>
      )}

      {/* Blogs Grid */}
      {!loading && !error && (
        <>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border border-gray-100/80 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
              >
                {/* Image Box */}
                <div className="h-56 overflow-hidden relative bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-amber-50/90 backdrop-blur-sm text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                      <span>{formatDate(blog.createdAt)}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-800 transition leading-snug line-clamp-2" title={blog.title}>
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-400">By {blog.author}</span>
                    <Link
                      to={`/magazine/${blog._id}`}
                      className="text-xs font-semibold text-[#1F4027] hover:text-amber-800 transition uppercase tracking-wider"
                    >
                      Read Story ➔
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No articles match your search parameters.</p>
            </div>
          )}
        </>
      )}

      {/* Newsletter signup */}
      <div className="max-w-3xl mx-auto mt-20 bg-[#1F4027] rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold font-display">Subscribe to Karuya BhramanTea</h3>
          <p className="text-emerald-100 text-sm font-light max-w-md mx-auto">
            Get early alerts on organic tea stock arrivals, holiday trek vouchers, and itinerary updates.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="flex-grow px-5 py-3 rounded-full text-gray-800 focus:outline-none text-sm placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold px-8 py-3 rounded-full text-sm shadow-md hover:scale-105 transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Magazine;
