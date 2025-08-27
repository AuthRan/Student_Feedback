import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Heart, 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
  Globe, 
  Lightbulb,
  ArrowLeft,
  MessageSquare,
  BookOpen,
  Star,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  BarChart3,
  Handshake,
  Rocket,
  Eye
} from 'lucide-react';
import Footer from './Footer';

const About = () => {
  const [animatedStats, setAnimatedStats] = useState({
    institutions: 0,
    students: 0,
    feedback: 0,
    satisfaction: 0
  });

  // Animate stats on component mount
  useEffect(() => {
    const targets = { institutions: 500, students: 50000, feedback: 1000000, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animate = (key, target) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    };

    Object.entries(targets).forEach(([key, target]) => animate(key, target));
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Get instant insights with our powerful analytics dashboard that processes feedback in real-time."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Enterprise-grade security ensures your data is protected with end-to-end encryption."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Our dedicated support team is available round-the-clock to assist with any queries."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Reporting",
      description: "Generate comprehensive reports with actionable insights to drive institutional improvements."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Executive Officer",
      description: "Former Dean of Education Technology at Stanford with 15+ years in EdTech innovation.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      description: "Ex-Google engineer specializing in scalable education platforms and AI-driven analytics.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Head of Product",
      description: "Educational psychologist with expertise in student feedback systems and institutional improvement.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Alex Rodriguez",
      role: "Head of Design",
      description: "Award-winning UX designer focused on creating intuitive educational technology interfaces.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Founded with a vision to revolutionize educational feedback systems across institutions."
    },
    {
      year: "2020",
      title: "First Launch",
      description: "Successfully launched our platform with 10 pilot institutions and 5,000 students."
    },
    {
      year: "2021",
      title: "Rapid Growth",
      description: "Expanded to 100+ institutions with advanced analytics and mobile applications."
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Introduced AI-powered insights and sentiment analysis for deeper feedback understanding."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Reached 500+ institutions worldwide with multi-language support and regional customization."
    },
    {
      year: "2024",
      title: "Innovation Continues",
      description: "Leading the future with advanced predictive analytics and personalized feedback systems."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduFeedback
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50">
              <Heart className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700 font-medium">Made with passion for education</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduFeedback
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to bridge the communication gap between students, faculty, and administrators 
            through innovative feedback technology that drives educational excellence.
          </p>

          {/* Animated Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <div className="text-3xl font-bold text-blue-600 mb-2">{animatedStats.institutions}+</div>
              <div className="text-gray-600">Institutions</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <div className="text-3xl font-bold text-purple-600 mb-2">{animatedStats.students.toLocaleString()}+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <div className="text-3xl font-bold text-pink-600 mb-2">{animatedStats.feedback.toLocaleString()}+</div>
              <div className="text-gray-600">Feedback Responses</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{animatedStats.satisfaction}%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To empower educational institutions worldwide with cutting-edge feedback technology that 
                transforms how students, faculty, and administrators communicate, collaborate, and improve 
                the learning experience together.
              </p>
              <div className="space-y-3">
                {['Enhance student engagement', 'Improve teaching quality', 'Drive institutional excellence'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become the global standard for educational feedback systems, fostering a world where 
                every student's voice is heard, every educator is empowered to excel, and every institution 
                continuously evolves toward educational perfection.
              </p>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/50">
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-emerald-600" />
                  <span className="text-emerald-800 font-semibold">Global Impact by 2030</span>
                </div>
                <p className="text-emerald-700 mt-2">
                  Reaching 10,000+ institutions and 10 million students worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we build technology for education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly push boundaries to create breakthrough solutions that transform educational experiences 
                and set new industry standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in the power of bringing students, educators, and institutions together to create 
                meaningful change in education.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to delivering the highest quality solutions that exceed expectations and 
                drive continuous improvement in education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose EduFeedback?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built our platform with cutting-edge features designed specifically for educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to revolutionizing educational feedback systems worldwide
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate educators, technologists, and innovators working together to transform education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <Rocket className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join hundreds of educational institutions already using EduFeedback to enhance 
              student engagement and drive educational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">EduFeedback</span>
          </div>
          <p className="text-gray-400 mb-6">Transforming education through innovative feedback technology</p>
          <p className="text-gray-500">© 2024 EduFeedback. All rights reserved. Made with ❤️ for education.</p>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
};

export default About;