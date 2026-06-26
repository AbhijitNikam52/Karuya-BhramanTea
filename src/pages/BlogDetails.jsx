import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import defaultArticleImg from "../assets/castle.jpg";
import tigerImg from "../assets/tiger.jpg";
import hillImg from "../assets/hill.jpg";

function BlogDetails() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blogs = [
    {
      id: 1,
      title: "The Art of Slow Travel: Finding Peace in Himalayan Monasteries",
      subtitle: "Why stopping, listening, and immersing will change how you travel.",
      category: "Travel Guides",
      date: "June 15, 2026",
      readTime: "6 min read",
      image: hillImg,
      author: "Rahul Sharma",
      content: [
        "In our fast-paced modern world, tourism has often devolved into a checklist of sights, a race to take photos, and a hurry to move to the next landmark. Slow travel is a rebellion against this trend. It is an invitation to unpack your bags, stay in one place, and let the local rhythm dictate your days. Nowhere is this philosophy more rewarding than in the high-altitude monasteries of Leh, Ladakh, and Spiti Valley.",
        "Perched on craggy peaks that seem to touch the heavens, these ancient Tibetan Buddhist monasteries (known as Gompas) have stood for over a thousand years. When you visit places like Key Monastery in Spiti or Thiksey in Ladakh under a slow travel itinerary, you aren't just taking photos from a distance. You have the time to sit quietly in the prayer halls, listening to the rhythmic low chants of the monks, smelling the juniper incense, and feeling the chill of mountain stone beneath you.",
        "Spending a few days near a monastery allows you to observe the monk's daily chores, participate in morning prayers, and enjoy simple local meals. It teaches you that the true joy of travel isn't found in covering distance, but in finding depth. By slowing down, you give the mountains a chance to speak to you, returning home with peace rather than exhaustion."
      ]
    },
    {
      id: 2,
      title: "From Leaf to Steep: The Story Behind Karuya Darjeeling Premium Tea",
      subtitle: "A journey through the mist-shrouded organic tea gardens of Darjeeling.",
      category: "Tea Culture",
      date: "May 22, 2026",
      readTime: "8 min read",
      image: defaultArticleImg,
      author: "Aditi Gokhale",
      content: [
        "Often referred to as the 'Champagne of Teas', Darjeeling tea is celebrated worldwide for its unique muscatel flavor and floral notes. But what makes a cup of tea from this small Himalayan region so distinctive? The secret lies in the combination of altitude, acidic soil, misty weather, and the meticulous art of orthodox tea processing.",
        "At Karuya, we believe in honoring this heritage. Our organic tea estates are nestled in the rolling slopes of Darjeeling, where the cool breeze and morning fog slow the growth of the tea leaves, concentrating their natural oils and flavors. The process begins at dawn when local pickers gently pluck the 'two leaves and a bud' from the Camellia sinensis bushes.",
        "From there, the leaves undergo a series of traditional steps: withering to reduce moisture, rolling to bruise the leaves and start oxidation, precise oxidation to develop the muscatel character, and final firing to seal the flavor. When you steep a cup of Karuya Darjeeling Gold, you are tasting a centuries-old craft shaped by sun, soil, and dedication."
      ]
    },
    {
      id: 3,
      title: "Tadoba Jungle Safaris: A Beginner's Guide to Tiger Sightings",
      subtitle: "Top tips on booking safaris, gate selection, and wildlife photography.",
      category: "Travel Guides",
      date: "April 10, 2026",
      readTime: "5 min read",
      image: tigerImg,
      author: "Vikram Patil",
      content: [
        "Tadoba-Andhari Tiger Reserve, nestled in the heart of Maharashtra, is one of India's oldest and most successful tiger conservation reserves. Its dry deciduous teak forests and deep lakes support a thriving population of Bengal Tigers, leopards, sloth bears, and wild dogs. If you are planning your first jungle safari, Tadoba is the premier location for tiger sightings.",
        "To get the most out of your trip, booking in advance is essential. Safari slots are strictly limited and sell out months ahead, particularly for the core zones like Moharli and Kolara. While the core zones are famous, Tadoba's buffer zones are equally rich in wildlife and have produced some of the most memorable tiger sightings in recent years.",
        "The best time to visit for tiger sightings is during the dry summer months of March to May, when water sources shrink, forcing tigers to gather near lakes. However, the post-monsoon months of October to January offer lush green scenery and comfortable weather. Remember to pack neutral-colored clothing, bring a good pair of binoculars, and keep quiet inside the park to respect the wild inhabitants."
      ]
    },
    {
      id: 4,
      title: "Angkor Wat Temple Trail: Walk through the Pages of Hindu Epic",
      subtitle: "Unveiling the historic carvings, stone bas-reliefs, and architecture in Cambodia.",
      category: "Spiritual",
      date: "March 18, 2026",
      readTime: "10 min read",
      image: defaultArticleImg,
      author: "Sanjay Dev",
      content: [
        "In the dense jungles of northern Cambodia lies Angkor Wat, the largest religious monument in the world. Built in the early 12th century by King Suryavarman II, it was originally dedicated to the Hindu deity Vishnu, representing the cosmic Mount Meru—the home of the devas in Hindu mythology.",
        "Walking through the stone causeways of Angkor Wat is like walking through a physical manifestation of ancient epic scriptures. The outer gallery walls feature hundreds of meters of intricate bas-relief carvings. Here, you can witness the famous 'Churning of the Ocean of Milk' (Samudra Manthan), where devas and asuras pull the serpent Vasuki to extract the nectar of immortality.",
        "Other galleries depict scenes from the Ramayana and Mahabharata, including the Battle of Kurukshetra. As the morning sun rises behind the five iconic sandstone towers, reflecting in the outer lotus ponds, one cannot help but stand in awe of the spiritual devotion and architectural genius of the Khmer Empire."
      ]
    }
  ];

  const currentBlog = blogs.find((b) => b.id === parseInt(id)) || blogs[0];
  const relatedBlogs = blogs.filter((b) => b.id !== currentBlog.id).slice(0, 3);

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div className="text-left">
          <Link
            to="/magazine"
            className="inline-flex items-center gap-2 text-sm text-[#1F4027] hover:text-amber-800 font-semibold transition"
          >
            <span>←</span> Back to Magazine
          </Link>
        </div>

        {/* Blog Header Card */}
        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-md text-left space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
            {currentBlog.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            {currentBlog.title}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light italic">
            {currentBlog.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-50 text-xs text-gray-400 font-medium">
            <span>By {currentBlog.author}</span>
            <span>•</span>
            <span>{currentBlog.date}</span>
            <span>•</span>
            <span>{currentBlog.readTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-[16/9] bg-gray-100">
          <img
            src={currentBlog.image}
            alt={currentBlog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm text-left space-y-6 text-gray-600 text-lg font-light leading-relaxed">
          {currentBlog.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          
          {/* Custom Quote callout */}
          <blockquote className="border-l-4 border-[#1F4027] pl-6 my-8 italic text-gray-800 font-medium font-display text-xl">
            "Travel is not just about visiting new landscapes; it is about returning home with new eyes."
          </blockquote>
        </div>

        {/* Related Posts Section */}
        <div className="pt-16 space-y-8">
          <div className="text-left space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700 font-sans">More to Read</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-display">Related Articles</h2>
            <div className="w-12 h-0.5 bg-[#1F4027]"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {relatedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-100/80 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                      {blog.category}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-amber-800 transition line-clamp-2 leading-snug">
                      {blog.title}
                    </h4>
                  </div>
                  <Link
                    to={`/magazine/${blog.id}`}
                    className="text-xs font-semibold text-[#1F4027] hover:underline"
                  >
                    Read Story ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default BlogDetails;
