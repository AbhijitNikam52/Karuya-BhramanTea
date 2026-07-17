import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSpinner, FaChevronLeft, FaCalendarAlt, FaUser, FaClock, FaBookOpen } from "react-icons/fa";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4010/api";
        
        // Fetch current blog details
        const blogResponse = await fetch(`${apiUrl}/v1/blogs/${id}`);
        const blogData = await blogResponse.json();

        if (blogResponse.ok && blogData.success) {
          setBlog(blogData.data);

          // Fetch related articles
          const allResponse = await fetch(`${apiUrl}/v1/blogs`);
          const allData = await allResponse.json();
          if (allResponse.ok && allData.success) {
            const filtered = allData.data
              .filter((b) => b._id !== blogData.data._id)
              .slice(0, 3);
            setRelatedBlogs(filtered);
          }
        } else {
          setError(blogData.message || "Failed to load the article details.");
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Could not connect to the server. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-[#1F4027] mx-auto" />
          <p className="text-gray-500 font-light">Loading article details...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] px-6 text-center space-y-6">
        <div className="text-4xl">⚠️</div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">Article Not Found</h2>
          <p className="text-gray-500 font-light text-sm">
            {error || "The article you are trying to view does not exist or has been deleted."}
          </p>
        </div>
        <Link
          to="/magazine"
          className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3 rounded-full font-semibold transition shadow-sm text-sm"
        >
          Back to Magazine
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen pb-16">
      
      {/* 1. Hero Header Section (TourHero & GalleryDetails Style) */}
      <section className="relative">
        <div
          className="h-[480px] bg-cover bg-center flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${blog.image})`,
          }}
        >
          {/* Blurred background backing */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-md opacity-25 scale-105"
            style={{ backgroundImage: `url(${blog.image})` }}
          />
          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>
          
          {/* Hero text overlay */}
          <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400 bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-sm">
              {blog.category} Journal
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-md">
              {blog.title}
            </h1>
            {blog.subtitle && (
              <p className="text-gray-250 max-w-2xl mx-auto text-sm md:text-base font-light italic">
                {blog.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 2. Floating Info Details Card */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl max-w-5xl mx-auto p-6 md:p-8 -mt-16 relative z-10">
          <div className="grid md:grid-cols-4 gap-6 text-center items-center">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Author</p>
              <p className="font-bold text-gray-800 text-sm md:text-base flex items-center justify-center gap-1.5">
                <FaUser className="text-amber-700 text-xs" />
                <span>{blog.author || "Admin"}</span>
              </p>
            </div>
            
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Published Date</p>
              <p className="font-bold text-gray-800 text-sm md:text-base flex items-center justify-center gap-1.5">
                <FaCalendarAlt className="text-amber-700 text-xs" />
                <span>{formatDate(blog.createdAt)}</span>
              </p>
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Read Time</p>
              <p className="font-bold text-[#1F4027] text-sm md:text-base flex items-center justify-center gap-1.5">
                <FaClock className="text-[#1F4027] text-xs" />
                <span>{blog.readTime || "5 Min Read"}</span>
              </p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
              <Link 
                to="/magazine"
                className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3.5 rounded-full font-medium transition duration-300 shadow-md hover:shadow-lg text-xs md:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FaChevronLeft size={10} /> Back to Journal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Article Content & Sidebar Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Main Article Content */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm space-y-6 text-gray-650 font-light text-sm md:text-base leading-relaxed text-left">
            {renderFormattedContent(blog.content)}
            
            <blockquote className="border-l-4 border-[#1F4027] pl-6 my-8 italic text-gray-800 font-medium font-display text-lg md:text-xl">
              "Travel is not just about visiting new landscapes; it is about returning home with new eyes."
            </blockquote>
          </div>

          {/* Quick Info Sidebar */}
          <div className="bg-amber-50/40 border border-amber-100/50 p-6 rounded-3xl space-y-5 text-left">
            <div className="flex items-center gap-2 text-[#1F4027]">
              <FaBookOpen className="text-sm" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Karuya Journals</h3>
            </div>
            
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Explore custom reviews, wildlife sighting trackers, Spiti Valley guidelines, and Darjeeling packing lists curated by our experienced naturalists.
            </p>
            
            <div className="border-t border-amber-200/20 pt-4">
              <Link
                to="/packages"
                className="text-xs font-semibold text-[#1F4027] hover:text-amber-800 flex items-center gap-1"
              >
                <span>Browse active packages</span> <span>➔</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Related Posts Section (At Bottom) */}
        {relatedBlogs.length > 0 && (
          <div className="pt-12 space-y-6 border-t border-gray-200/60">
            <div className="text-left space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-700">More to Read</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-display">Related Articles</h2>
              <div className="w-12 h-0.5 bg-[#1F4027]"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {relatedBlogs.map((rBlog) => (
                <div
                  key={rBlog._id}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="h-44 overflow-hidden relative bg-gray-150">
                    <img
                      src={rBlog.image}
                      alt={rBlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                        {rBlog.category}
                      </span>
                      <h4 className="font-bold text-xs md:text-sm text-gray-900 group-hover:text-amber-800 transition line-clamp-2 leading-snug">
                        {rBlog.title}
                      </h4>
                    </div>
                    <Link
                      to={`/magazine/${rBlog._id}`}
                      className="text-xs font-semibold text-[#1F4027] hover:underline flex items-center gap-1"
                    >
                      <span>Read Story</span> <span>➔</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}

// Inline formatting parser (supporting **bold** markup tags)
const parseInlineFormatting = (text) => {
  if (!text) return "";
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Formatted block parsing engine
const renderFormattedContent = (content) => {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) return null;

    // Headers
    if (trimmedBlock.startsWith("### ")) {
      return (
        <h5 key={index} className="text-base md:text-lg font-bold text-gray-900 mt-6 mb-2">
          {parseInlineFormatting(trimmedBlock.replace("### ", ""))}
        </h5>
      );
    }
    if (trimmedBlock.startsWith("## ")) {
      return (
        <h4 key={index} className="text-lg md:text-xl font-bold text-gray-900 mt-8 mb-3">
          {parseInlineFormatting(trimmedBlock.replace("## ", ""))}
        </h4>
      );
    }
    if (trimmedBlock.startsWith("# ")) {
      return (
        <h3 key={index} className="text-xl md:text-2xl font-extrabold text-gray-900 mt-10 mb-4">
          {parseInlineFormatting(trimmedBlock.replace("# ", ""))}
        </h3>
      );
    }

    // Unordered Lists
    if (trimmedBlock.startsWith("- ") || trimmedBlock.startsWith("* ")) {
      const lines = trimmedBlock.split("\n").map(l => l.trim()).filter(Boolean);
      return (
        <ul key={index} className="list-disc pl-6 space-y-2 my-4 text-gray-700 text-xs md:text-sm">
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^[-*]\s+/, "");
            return <li key={lIdx}>{parseInlineFormatting(cleanLine)}</li>;
          })}
        </ul>
      );
    }

    // Ordered Lists
    if (/^\d+\.\s/.test(trimmedBlock)) {
      const lines = trimmedBlock.split("\n").map(l => l.trim()).filter(Boolean);
      return (
        <ol key={index} className="list-decimal pl-6 space-y-2 my-4 text-gray-700 text-xs md:text-sm">
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^\d+\.\s+/, "");
            return <li key={lIdx}>{parseInlineFormatting(cleanLine)}</li>;
          })}
        </ol>
      );
    }

    // Blockquotes
    if (trimmedBlock.startsWith("> ")) {
      const cleanQuote = trimmedBlock.replace(/^>\s+/, "");
      return (
        <blockquote key={index} className="border-l-4 border-[#1F4027] pl-6 my-6 italic text-gray-800 font-medium text-base md:text-lg">
          {parseInlineFormatting(cleanQuote)}
        </blockquote>
      );
    }

    // Paragraph
    return (
      <p key={index} className="text-gray-600 leading-relaxed font-light mb-4 text-xs md:text-sm">
        {parseInlineFormatting(trimmedBlock)}
      </p>
    );
  });
};

export default BlogDetails;
