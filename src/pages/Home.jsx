import { useNavigate } from "react-router-dom";
import { FaUsers, FaGlobe, FaPlane, FaBus } from "react-icons/fa";

/* Images */
import heroImg from "../assets/tiger.jpg";

/* Stats Banner Image */
import statsBannerImg from "../assets/lion.jpg";

/* NEW Get Ready Banner Image */
import getReadyImg from "../assets/hill.jpg";

/* OPTIONAL Default Article Image */
import defaultArticleImg from "../assets/castle.jpg";

function Home() {
  const navigate = useNavigate();

  /* ================= SAMPLE ARTICLES (ADMIN DATA) ================= */

  // Later this will come from backend API
  const articles = [
    {
      id: 1,
      title:
        "Welcome to Karuya BhramanTea : Celebrate New Year With Karuya BhramanTea",
      description:
        "The merry season is not far and celebrating the New Year in a new way is truly a great experience.",
      category: "Uncategorized",
      date: "October 25, 2018",

      // Admin uploaded image URL
      image: defaultArticleImg,
    },

    {
      id: 2,
      title: "Top Wildlife Tours You Must Experience",
      description:
        "Explore unforgettable wildlife journeys across India's finest national parks.",
      category: "Wildlife",
      date: "November 10, 2018",

      image: defaultArticleImg,
    },
  ];

  return (
    <div>
      {/* ================= HERO SECTION ================= */}

      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Welcome to Karuya BhramanTea
          </h1>

          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Explore the world with curated travel experiences designed to create
            lifelong memories.
          </p>
        </div>
      </section>

      {/* ================= ABOUT TEXT SECTION ================= */}

      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-4 text-amber-900">
            Karuya BhramanTea
          </h2>

          <div className="w-20 h-1 bg-blue-500 mb-8"></div>

          <div className="text-gray-700 text-lg leading-relaxed space-y-6 text-left">
            <p>
              Karuya BhramanTea is a venture, started by a dream to fulfil
              “Dreams To Travel The World”.
            </p>

            <p>
              We vision to bring world to you just in baby steps, leaving your
              footprints in sweet memories.
            </p>

            <p>
              Here, we are to give you best corporate and executive deals,
              distinctive experiences, and thoughtful insights with the
              wide–range of packages.
            </p>

            <p>
              Karuya BhramanTea was started in 2018, with perfect blend of
              National as well as International Tours.
            </p>

            <h3 className="text-xl font-semibold pt-4">Who We Are</h3>

            <p>
              Karuya BhramanTea is your most well-travelled friend, the one with
              elegant style and within connections and reach. Who you call once
              you need advice on where to travel, where to stay, and what to try
              and do once you get there. We travel.
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => navigate("/about")}
              className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-md hover:bg-blue-500 hover:text-white transition"
            >
              VIEW MORE
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTER ================= */}

      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${statsBannerImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center space-y-10">
          <h2 className="text-4xl font-bold">Stats Counter</h2>

          <p>You are on the Count.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-6">
            <div className="border-2 border-white rounded-full p-10 flex flex-col items-center">
              <FaUsers size={35} />
              <h3 className="text-3xl font-bold mt-4">0</h3>
              <p className="mt-2 text-sm">Number of Customers</p>
            </div>

            <div className="border-2 border-white rounded-full p-10 flex flex-col items-center">
              <FaGlobe size={35} />
              <h3 className="text-3xl font-bold mt-4">0</h3>
              <p className="mt-2 text-sm">Number of Trips</p>
            </div>

            <div className="border-2 border-white rounded-full p-10 flex flex-col items-center">
              <FaPlane size={35} />
              <h3 className="text-3xl font-bold mt-4">0</h3>
              <p className="mt-2 text-sm">Trips Types</p>
            </div>

            <div className="border-2 border-white rounded-full p-10 flex flex-col items-center">
              <FaBus size={35} />
              <h3 className="text-3xl font-bold mt-4">0</h3>
              <p className="mt-2 text-sm">Travel with Bus</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GET READY BANNER ================= */}

      <section
        className="relative py-24 bg-cover bg-center text-white text-center"
        style={{
          backgroundImage: `url(${getReadyImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl font-bold">Get Ready</h2>

          <p className="text-lg">Pull Your Socks and Get Ready on Your Toes.</p>

          <button className="bg-blue-500 px-8 py-3 rounded-lg hover:bg-blue-600 transition">
            BROWSE PACKAGE
          </button>
        </div>
      </section>

      {/* ================= LATEST ARTICLES ================= */}

      <section className="py-16 px-6 max-w-6xl mx-auto text-center space-y-10">
        <h2 className="text-4xl font-bold">Latest Articles</h2>

        <p className="text-gray-600">Check out our Latest Blog Posts.</p>

        {/* Dynamic Articles */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              {/* Dynamic Image */}

              <img
                src={article.image}
                alt={article.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6 text-left space-y-3">
                <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full">
                  {article.category}
                </span>

                <p className="text-sm text-gray-500">{article.date}</p>

                <h3 className="font-semibold text-lg">{article.title}</h3>

                <p className="text-gray-600 text-sm">{article.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Posts */}

        <button
          onClick={() => navigate("/blogs")}
          className="mt-6 bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-900 transition"
        >
          View All Posts
        </button>
      </section>
    </div>
  );
}

export default Home;
