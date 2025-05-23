import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Film,
  PlayCircle,
  Search,
  Tv,
  Clapperboard,
  ThumbsUp,
  Flame,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock featured movies data
  const featuredMovies = [
    {
      id: 1,
      title: "The Adventure Begins",
      category: "Action",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
    },
    {
      id: 2,
      title: "Mystery of the Deep",
      category: "Thriller",
      image:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&q=80",
    },
    {
      id: 3,
      title: "Endless Horizons",
      category: "Sci-Fi",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80",
    },
    {
      id: 4,
      title: "Forgotten Memories",
      category: "Drama",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <Hero />

      {/* Featured Movies Section */}
      <section id="featured" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Movies</h2>
            <Link
              href="/dashboard"
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              View All <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMovies.map((movie, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-w-2 aspect-h-3 w-full">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-[300px] object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-xl font-semibold">{movie.title}</h3>
                  <p className="text-blue-400">{movie.category}</p>
                  <button className="mt-2 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                    <PlayCircle className="mr-2 w-4 h-4" /> Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Film className="w-8 h-8" />,
                title: "Action",
                count: "250+ Movies",
              },
              {
                icon: <Tv className="w-8 h-8" />,
                title: "Drama",
                count: "180+ Movies",
              },
              {
                icon: <Clapperboard className="w-8 h-8" />,
                title: "Comedy",
                count: "200+ Movies",
              },
              {
                icon: <ThumbsUp className="w-8 h-8" />,
                title: "Thriller",
                count: "120+ Movies",
              },
            ].map((category, index) => (
              <Link
                href="/dashboard"
                key={index}
                className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-blue-400 dark:text-blue-300 mb-4 flex justify-center">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-400">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Free Movies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">HD</div>
              <div className="text-blue-200">Quality Streaming</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Watching Now</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Unlimited movies, completely free. No subscription, no credit card,
            just press play.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Library
            <Flame className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
