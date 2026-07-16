import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSpinner, FaArrowLeft, FaCalendarAlt, FaUser, FaClock } from "react-icons/fa";

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

          // Fetch all blogs to filter for related articles
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
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div className="text-left">
          <Link
            to="/magazine"
            className="inline-flex items-center gap-2 text-sm text-[#1F4027] hover:text-amber-800 font-semibold transition"
          >
            <FaArrowLeft size={10} /> Back to Magazine
          </Link>
        </div>

        {/* Blog Header Card */}
        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-md text-left space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <p className="text-gray-500 text-lg md:text-xl font-light italic">
              {blog.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-gray-50 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <FaUser className="text-[#c5a880]" /> By {blog.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#c5a880]" /> {formatDate(blog.createdAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-[#c5a880]" /> {blog.readTime}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-[16/9] bg-gray-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm text-left space-y-6 text-gray-600 text-lg font-light leading-relaxed">
          {renderFormattedContent(blog.content)}
          
          {/* Custom Quote callout */}
          <blockquote className="border-l-4 border-[#1F4027] pl-6 my-8 italic text-gray-800 font-medium font-display text-xl">
            "Travel is not just about visiting new landscapes; it is about returning home with new eyes."
          </blockquote>
        </div>

        {/* Related Posts Section */}
        {relatedBlogs.length > 0 && (
          <div className="pt-16 space-y-8">
            <div className="text-left space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-700 font-sans">More to Read</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-display">Related Articles</h2>
              <div className="w-12 h-0.5 bg-[#1F4027]"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {relatedBlogs.map((rBlog) => (
                <div
                  key={rBlog._id}
                  className="bg-white border border-gray-100/80 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="h-44 overflow-hidden relative bg-gray-100">
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
                      <h4 className="font-bold text-sm text-gray-900 group-hover:text-amber-800 transition line-clamp-2 leading-snug" title={rBlog.title}>
                        {rBlog.title}
                      </h4>
                    </div>
                    <Link
                      to={`/magazine/${rBlog._id}`}
                      className="text-xs font-semibold text-[#1F4027] hover:underline"
                    >
                      Read Story ➔
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Helper to parse inline formatting (like bold text **bold**)
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

// Custom Markdown-like parser for paragraphs, headers, and lists
const renderFormattedContent = (content) => {
  if (!content) return null;

  // Split by double newlines to separate blocks
  const blocks = content.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) return null;

    // Headers: # Header (H3 style), ## Sub-header (H4 style), ### Sub-sub-header (H5 style)
    if (trimmedBlock.startsWith("### ")) {
      return (
        <h5 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-2">
          {parseInlineFormatting(trimmedBlock.replace("### ", ""))}
        </h5>
      );
    }
    if (trimmedBlock.startsWith("## ")) {
      return (
        <h4 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {parseInlineFormatting(trimmedBlock.replace("## ", ""))}
        </h4>
      );
    }
    if (trimmedBlock.startsWith("# ")) {
      return (
        <h3 key={index} className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">
          {parseInlineFormatting(trimmedBlock.replace("# ", ""))}
        </h3>
      );
    }

    // Unordered Lists: lines starting with - or *
    if (trimmedBlock.startsWith("- ") || trimmedBlock.startsWith("* ")) {
      const lines = trimmedBlock.split("\n").map(l => l.trim()).filter(Boolean);
      return (
        <ul key={index} className="list-disc pl-6 space-y-2 my-4 text-gray-700">
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^[-*]\s+/, "");
            return <li key={lIdx}>{parseInlineFormatting(cleanLine)}</li>;
          })}
        </ul>
      );
    }

    // Ordered Lists: lines starting with numbers (e.g. 1. )
    if (/^\d+\.\s/.test(trimmedBlock)) {
      const lines = trimmedBlock.split("\n").map(l => l.trim()).filter(Boolean);
      return (
        <ol key={index} className="list-decimal pl-6 space-y-2 my-4 text-gray-700">
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^\d+\.\s+/, "");
            return <li key={lIdx}>{parseInlineFormatting(cleanLine)}</li>;
          })}
        </ol>
      );
    }

    // Blockquotes: lines starting with >
    if (trimmedBlock.startsWith("> ")) {
      const cleanQuote = trimmedBlock.replace(/^>\s+/, "");
      return (
        <blockquote key={index} className="border-l-4 border-[#1F4027] pl-6 my-6 italic text-gray-800 font-medium text-lg">
          {parseInlineFormatting(cleanQuote)}
        </blockquote>
      );
    }

    // Standard Paragraph
    return (
      <p key={index} className="text-gray-600 leading-relaxed font-light mb-4">
        {parseInlineFormatting(trimmedBlock)}
      </p>
    );
  });
};

export default BlogDetails;
