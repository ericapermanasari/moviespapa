"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome, FaFilm, FaTv, FaSearch, FaStar, FaUsers, FaGlobe, FaPlay, FaAward, FaCalendarAlt, FaHeart, FaRocket, FaEye, FaCrown, FaShieldAlt } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      {/* Enhanced Hero Section dengan animasi yang lebih halus */}
      <div className="relative bg-gradient-to-br from-orange-900/80 via-purple-900/60 to-slate-900 py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599809519-364a47ae3cde?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        
        {/* Floating animation elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-500/15 rounded-full blur-lg animate-float-fast"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/25 to-purple-500/25 px-6 py-3 rounded-full mb-8 border border-orange-500/30 backdrop-blur-sm">
            <FaCrown className="text-yellow-400 text-lg" />
            <span className="text-yellow-300 font-bold text-lg">#1 Movie Database in United States</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-glow">
            Moviespapa
          </h1>
          <p className="text-2xl md:text-4xl font-light mb-6 text-gray-200 animate-fade-in">
            Ultimate Movie & TV Series Database
          </p>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Your ultimate guide to <span className="text-orange-400 font-bold">10,000+ movies</span>, <span className="text-purple-400 font-bold">5,000+ TV series</span>, expert reviews, and real-time streaming availability. Discover cinematic masterpieces with our intelligent recommendation system.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Link href="/" className="group bg-gradient-to-r from-blue-600 to-purple-700 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center gap-4 shadow-2xl hover:shadow-orange-500/30 hover:scale-105 transform-gpu">
              <FaHome className="text-xl group-hover:scale-125 transition-transform duration-300" /> 
              Explore Home
            </Link>
            <Link href="/movie/genre/action" className="group bg-gradient-to-r from-green-600 to-emerald-700 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center gap-4 shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform-gpu">
              <FaFilm className="text-xl group-hover:scale-125 transition-transform duration-300" /> 
              Browse Movies
            </Link>
            <Link href="/tv-show/genre/drama" className="group bg-gradient-to-r from-red-600 to-pink-700 hover:from-purple-600 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center gap-4 shadow-2xl hover:shadow-purple-500/30 hover:scale-105 transform-gpu">
              <FaTv className="text-xl group-hover:scale-125 transition-transform duration-300" /> 
              TV Series
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-lg text-gray-400">
            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <FaEye className="text-green-400 text-xl" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <FaShieldAlt className="text-blue-400 text-xl" />
              <span>Verified Content</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <FaRocket className="text-yellow-400 text-xl" />
              <span>Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Enhanced Main Content dengan glass effect */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 p-10 rounded-3xl shadow-2xl backdrop-blur-lg border border-gray-700/30">
          
          {/* Introduction Section dengan gambar cinematic */}
          <section className="mb-24">
            <div className="text-center mb-20">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 group">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=700"
                  alt="Moviespapa - Premier movie database platform with comprehensive film and TV series information"
                  width={1920}
                  height={700}
                  className="rounded-3xl transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-left max-w-2xl">
                  <h2 className="text-5xl md:text-6xl font-black mb-6 text-white leading-tight">
                    Discover Cinematic Excellence with <span className="text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">Moviespapa</span>
                  </h2>
                  <p className="text-2xl text-gray-300 leading-relaxed">
                    America's most comprehensive movie and TV series platform featuring real-time updates, expert reviews, and intelligent recommendations.
                  </p>
                </div>
              </div>
              
              <div className="max-w-5xl mx-auto space-y-8">
                <p className="text-xl text-gray-400 leading-relaxed text-justify">
                  <strong className="text-orange-400 text-2xl">Moviespapa</strong> stands as America's premier destination for comprehensive movie and TV series information, offering an unparalleled database that caters to both casual viewers and dedicated cinephiles. Our platform represents the culmination of years of development and community feedback, creating a space where entertainment enthusiasts can discover, explore, and engage with cinematic content like never before.
                </p>
                
                <p className="text-xl text-gray-400 leading-relaxed text-justify">
                  In today's rapidly evolving digital landscape, finding accurate, up-to-date information about movies and television shows can be challenging. <strong className="text-purple-400">Moviespapa solves this problem</strong> by providing a centralized hub that combines detailed metadata, user-generated content, and AI-powered recommendations to enhance your entertainment experience.
                </p>
              </div>
            </div>
          </section>

          {/* Enhanced Features Grid dengan hover effects */}
          <section className="mb-24">
            <div className="text-center mb-20">
              <div className="inline-block bg-gradient-to-r from-orange-500/20 to-purple-500/20 px-8 py-4 rounded-2xl border border-orange-500/30 mb-8 backdrop-blur-sm">
                <span className="text-orange-300 font-bold text-xl">PREMIUM FEATURES</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Ultimate Movie Experience
              </h2>
              <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Experience the future of movie discovery with our comprehensive suite of features designed for true entertainment enthusiasts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { icon: FaFilm, title: "10,000+ Movies", desc: "Comprehensive database from timeless classics to latest blockbusters with detailed metadata", color: "text-orange-400" },
                { icon: FaTv, title: "5,000+ TV Series", desc: "Complete TV show information with seasons, episodes, and character development tracking", color: "text-blue-400" },
                { icon: FaSearch, title: "AI-Powered Search", desc: "Advanced search with filters for genre, year, rating, director, and actor preferences", color: "text-purple-400" },
                { icon: FaStar, title: "Expert Reviews", desc: "Professional critics reviews combined with authentic community ratings and insights", color: "text-yellow-400" },
                { icon: FaUsers, title: "Community Driven", desc: "Join millions of movie enthusiasts sharing their passion and creating watchlists", color: "text-green-400" },
                { icon: FaGlobe, title: "Global Content Hub", desc: "International movies and TV series with multi-language subtitle support", color: "text-red-400" }
              ].map((feature, index) => (
                <div key={index} className="group bg-gradient-to-br from-gray-700/30 to-gray-800/50 p-10 rounded-3xl border border-gray-600/30 hover:border-orange-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
                  <div className={`text-6xl mb-8 ${feature.color} group-hover:scale-110 transition-transform duration-500 inline-flex p-5 bg-gray-700/40 rounded-3xl`}>
                    <feature.icon />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-400 group-hover:bg-clip-text">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Detailed Sections dengan improved SEO content */}
          <section className="mb-20 bg-gradient-to-r from-gray-800/30 to-gray-900/50 p-12 rounded-3xl border border-gray-700/40 backdrop-blur-sm">
            <div className="flex items-center gap-6 mb-12">
              <div className="bg-gradient-to-r from-orange-500/30 to-red-500/30 p-4 rounded-2xl">
                <FaFilm className="text-4xl text-orange-400" />
              </div>
              <h2 className="text-5xl font-black bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Complete Movie Database - America's #1 Source
              </h2>
            </div>
            
            <div className="space-y-10 text-justify">
              <p className="text-xl text-gray-300 leading-relaxed">
                <strong className="text-orange-400">Moviespapa</strong> has established itself as America's most trusted source for comprehensive movie and television information. Our platform serves as an extensive <strong className="text-blue-400">movie database</strong> that goes beyond basic listings to provide deep insights into every aspect of film and television production. With meticulous attention to detail, we've built a resource that film students, critics, and casual viewers alike can rely on for accurate, up-to-date information.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                What sets Moviespapa apart in the crowded space of entertainment platforms is our commitment to depth and accuracy. Each title in our database includes comprehensive details such as complete cast and crew information, production notes, filming locations, box office performance, critical reception, and multiple trailer versions. Our <strong className="text-purple-400">TV series database</strong> is equally detailed, featuring episode guides, season overviews, character arcs, and behind-the-scenes information that enhances the viewing experience.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                For those seeking information on <strong className="text-green-400">latest movies</strong>, our platform provides real-time updates on new releases, including limited theatrical runs, streaming exclusives, and international films making their debut in American markets. Our team of dedicated editors works around the clock to ensure that information about <strong className="text-red-400">popular TV shows</strong> is updated within hours of broadcast, complete with spoiler warnings and episode summaries that respect viewing preferences.
              </p>
            </div>
          </section>

          {/* Enhanced Quick Stats dengan animasi */}
          <section className="bg-gradient-to-r from-orange-900/30 via-purple-900/30 to-blue-900/30 rounded-3xl p-12 text-center mb-20 border border-orange-500/20 backdrop-blur-sm">
            <h3 className="text-4xl font-black mb-16 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              Moviespapa in Numbers
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { number: "10,000+", label: "Movies", icon: FaFilm, color: "text-orange-400" },
                { number: "5,000+", label: "TV Series", icon: FaTv, color: "text-blue-400" },
                { number: "2M+", label: "Active Users", icon: FaUsers, color: "text-green-400" },
                { number: "500K+", label: "Reviews", icon: FaStar, color: "text-yellow-400" }
              ].map((stat, index) => (
                <div key={index} className="group transform-gpu hover:scale-110 transition-all duration-500">
                  <stat.icon className={`text-5xl ${stat.color} mx-auto mb-6 group-hover:scale-125 transition-transform duration-300`} />
                  <div className="text-5xl font-black text-white mb-4">{stat.number}</div>
                  <div className="text-gray-300 font-bold text-xl">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Call to Action */}
          <section className="text-center py-20 bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-3xl border border-gray-700/40 backdrop-blur-sm">
            <h2 className="text-5xl md:text-6xl font-black mb-10 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              Begin Your Cinematic Journey Today!
            </h2>
            <p className="text-2xl text-gray-300 mb-14 max-w-4xl mx-auto leading-relaxed">
              Join our community of <span className="text-orange-400 font-bold">2 million+ movie enthusiasts</span> who trust Moviespapa for accurate information, genuine reviews, and personalized recommendations. Discover hidden gems, revisit classics, and stay updated with the latest releases—all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/" className="group bg-gradient-to-r from-blue-600 to-purple-700 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 flex items-center gap-4 shadow-2xl hover:shadow-orange-500/40 hover:scale-105 transform-gpu">
                <FaHome className="text-2xl group-hover:scale-125 transition-transform duration-300" /> 
                Explore Homepage
              </Link>
              <Link href="/movie/genre/action" className="group bg-gradient-to-r from-green-600 to-emerald-700 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 flex items-center gap-4 shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transform-gpu">
                <FaFilm className="text-2xl group-hover:scale-125 transition-transform duration-300" /> 
                Browse Movies
              </Link>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-10 text-xl text-gray-400">
              <div className="flex items-center gap-4 bg-slate-800/50 px-6 py-3 rounded-full backdrop-blur-sm">
                <FaCalendarAlt className="text-green-400 text-2xl" />
                <span>Daily Content Updates</span>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/50 px-6 py-3 rounded-full backdrop-blur-sm">
                <FaHeart className="text-red-400 text-2xl" />
                <span>Community Powered</span>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/50 px-6 py-3 rounded-full backdrop-blur-sm">
                <FaRocket className="text-yellow-400 text-2xl" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(10px) translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255,165,0,0.5)); }
          50% { filter: drop-shadow(0 0 30px rgba(255,165,0,0.8)); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1.5s ease-out; }
        .animate-slide-up { animation: slide-up 2s ease-out; }
      `}</style>
    </div>
  );
}