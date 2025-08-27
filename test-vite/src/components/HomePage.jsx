import React, { useState } from 'react';
import { GraduationCap, Users, MessageSquare, Star, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from "react-router-dom";
import Footer from './Footer';
const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduFeedback
                </h1>
                <p className="text-sm text-gray-600">Student Voice Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Student
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Feedback Experience
              </span>
            </h2>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
          </div>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empower educational institutions with seamless feedback collection, 
            insightful analytics, and improved student-teacher communication
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">1M+</div>
              <div className="text-gray-600">Feedback Responses</div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Register Institute Card */}
            <div 
              className={`relative group transform transition-all duration-300 hover:scale-105 ${
                hoveredCard === 'register' ? 'z-10' : ''
              }`}
              onMouseEnter={() => setHoveredCard('register')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Register Institute</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Start your feedback journey by registering your educational institution and unlock powerful insights
                  </p>
                  <Link to="/instiform">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 hover:cursor-pointer transition-all duration-300 flex items-center justify-center group">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Admin Login Card */}
            <div 
              className={`relative group transform transition-all duration-300 hover:scale-105 ${
                hoveredCard === 'admin' ? 'z-10' : ''
              }`}
              onMouseEnter={() => setHoveredCard('admin')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Portal</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Access comprehensive analytics, manage feedback campaigns, and monitor institutional performance
                  </p>

                  <Link to="/admin">
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center group hover:cursor-pointer">
                    Admin Login
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Student Login Card */}
            <div 
              className={`relative group transform transition-all duration-300 hover:scale-105 ${
                hoveredCard === 'student' ? 'z-10' : ''
              }`}
              onMouseEnter={() => setHoveredCard('student')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-pink-600" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Access</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Share your voice, provide valuable feedback, and help improve your educational experience
                  </p>
                  
                  <Link to="/student">
                  <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 flex items-center justify-center group hover:cursor-pointer">
                    Student Login
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-20 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Choose EduFeedback?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-time Feedback</h4>
                <p className="text-gray-600 text-sm">Collect and analyze feedback instantly with our advanced system</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Smart Analytics</h4>
                <p className="text-gray-600 text-sm">Get actionable insights with comprehensive reporting tools</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Easy Integration</h4>
                <p className="text-gray-600 text-sm">Seamlessly integrate with your existing educational systems</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      < Footer />
    </div>
  );
};

export default HomePage;