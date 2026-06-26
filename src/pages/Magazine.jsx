import { useState } from "react";
import { Link } from "react-router-dom";
import defaultArticleImg from "../assets/castle.jpg";
import tigerImg from "../assets/tiger.jpg";
import hillImg from "../assets/hill.jpg";

function Magazine() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Travel Guides", "Tea Culture", "Spiritual"];

  const blogs = [
    {
      id: 1,
      title: "The Art of Slow Travel: Finding Peace in Himalayan Monasteries",
      excerpt: "In a world focused on checklist tourism, slow travel invites you to stop, listen, and immerse. Explore the quiet monasteries of Spiti and Ladakh.",
      category: "Travel Guides",
      date: "June 15, 2026",
      readTime: "6 min read",
      image: hillImg,
      author: "Rahul Sharma"
    },
    {
      id: 2,
      title: "From Leaf to Steep: The Story Behind Karuya Darjeeling Premium Tea",
      excerpt: "Darjeeling tea is globally celebrated for its muscatel flavor. Go behind the scenes at our tea estates to see how leaves are plucked and crafted.",
      category: "Tea Culture",
      date: "May 22, 2026",
      readTime: "8 min read",
      image: defaultArticleImg,
      author: "Aditi Gokhale"
    },
    {
      id: 3,
      title: "Tadoba Jungle Safaris: A Beginner's Guide to Tiger Sightings",
      excerpt: "Tadoba-Andhari Tiger Reserve is a crown jewel of national safaris. Here are the top tips for booking gates, seasons, and maximizing your wildlife sightings.",
      category: "Travel Guides",
      date: "April 10, 2026",
      readTime: "5 min read",
      image: tigerImg,
      author: "Vikram Patil"
    },
    {
      id: 4,
      title: "Angkor Wat Temple Trail: Walk through the Pages of Hindu Epic",
      excerpt: "Angkor Wat stands as the largest religious monument in the world. Unveil the rich historic carvings, stone bas-reliefs, and architecture in Cambodia.",
      category: "Spiritual",
      date: "March 18, 2026",
      readTime: "10 min read",
      image: defaultArticleImg,
      author: "Sanjay Dev"
    }
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "All" || blog.category === activeTab;
    return matchesSearch && matchesCategory;
  });

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
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] bg-gray-50/50"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border border-gray-100/80 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
          >
            {/* Image Box */}
            <div className="h-56 overflow-hidden relative">
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
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-800 transition leading-snug">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-400">By {blog.author}</span>
                <Link
                  to={`/magazine/${blog.id}`}
                  className="text-xs font-semibold text-[#1F4027] hover:underline uppercase tracking-wider"
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

        <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="flex-grow px-5 py-3 rounded-full text-gray-800 focus:outline-none text-sm placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold px-8 py-3 rounded-full text-sm shadow-md hover:scale-105 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Magazine;
