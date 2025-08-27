import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  User,
  GraduationCap,
  BookOpen,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  PieChart,
  FileText,
  Mail,
  Phone,
  MapPin,
  Award,
  Target,
  Zap,
  Globe,
  Shield,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  // Mock data
  const dashboardStats = {
    totalStudents: 2847,
    totalFaculty: 156,
    activeFeedback: 23,
    avgRating: 4.2,
    responseRate: 87,
    improvement: 12
  };

  const chartData = [
    { name: 'Jan', responses: 240, satisfaction: 4.1 },
    { name: 'Feb', responses: 320, satisfaction: 4.3 },
    { name: 'Mar', responses: 180, satisfaction: 3.9 },
    { name: 'Apr', responses: 390, satisfaction: 4.4 },
    { name: 'May', responses: 450, satisfaction: 4.6 },
    { name: 'Jun', responses: 380, satisfaction: 4.2 },
    { name: 'Jul', responses: 520, satisfaction: 4.5 }
  ];

  const pieData = [
    { name: 'Excellent', value: 45, color: '#10B981' },
    { name: 'Good', value: 32, color: '#3B82F6' },
    { name: 'Average', value: 18, color: '#F59E0B' },
    { name: 'Poor', value: 5, color: '#EF4444' }
  ];

  const recentFeedback = [
    {
      id: 1,
      student: 'Anonymous',
      course: 'Computer Science 101',
      faculty: 'Dr. Sarah Wilson',
      rating: 5,
      comment: 'Excellent teaching methodology and clear explanations.',
      date: '2024-08-25',
      status: 'new'
    },
    {
      id: 2,
      student: 'Anonymous',
      course: 'Mathematics 201',
      faculty: 'Prof. John Davis',
      rating: 3,
      comment: 'Course content is good but needs more practical examples.',
      date: '2024-08-24',
      status: 'reviewed'
    },
    {
      id: 3,
      student: 'Anonymous',
      course: 'Physics 301',
      faculty: 'Dr. Emily Chen',
      rating: 4,
      comment: 'Great lab sessions and interactive demonstrations.',
      date: '2024-08-23',
      status: 'addressed'
    }
  ];

  const facultyData = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      department: 'Computer Science',
      courses: 3,
      rating: 4.7,
      responses: 89,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Prof. John Davis',
      department: 'Mathematics',
      courses: 2,
      rating: 4.2,
      responses: 67,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      department: 'Physics',
      courses: 4,
      rating: 4.5,
      responses: 102,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'feedback', label: 'Feedback Management', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'faculty', label: 'Faculty Analytics', icon: <Users className="w-5 h-5" /> },
    { id: 'students', label: 'Student Insights', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'courses', label: 'Course Management', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const StatCard = ({ title, value, change, icon, color = "blue" }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
      indigo: "from-indigo-500 to-indigo-600"
    };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {change && (
            <div className={`flex items-center space-x-1 text-sm font-semibold ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4" />
              <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-blue-100">Here's what's happening at your institution today</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard 
          title="Total Students" 
          value={dashboardStats.totalStudents.toLocaleString()} 
          change={5}
          icon={<Users className="w-6 h-6 text-white" />}
          color="blue"
        />
        <StatCard 
          title="Total Faculty" 
          value={dashboardStats.totalFaculty} 
          change={2}
          icon={<GraduationCap className="w-6 h-6 text-white" />}
          color="green"
        />
        <StatCard 
          title="Active Campaigns" 
          value={dashboardStats.activeFeedback} 
          change={-3}
          icon={<MessageSquare className="w-6 h-6 text-white" />}
          color="purple"
        />
        <StatCard 
          title="Avg Rating" 
          value={`${dashboardStats.avgRating}/5`} 
          change={8}
          icon={<Star className="w-6 h-6 text-white" />}
          color="orange"
        />
        <StatCard 
          title="Response Rate" 
          value={`${dashboardStats.responseRate}%`} 
          change={12}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          color="pink"
        />
        <StatCard 
          title="Improvement" 
          value={`+${dashboardStats.improvement}%`} 
          change={15}
          icon={<Target className="w-6 h-6 text-white" />}
          color="indigo"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Feedback Trends</h3>
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="responses" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <RechartsPieChart data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Feedback</h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2">
            <span>View All</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {recentFeedback.map((feedback) => (
            <div key={feedback.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">{feedback.course}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{feedback.faculty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      feedback.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      feedback.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {feedback.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{feedback.comment}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{feedback.date}</span>
                  <div className="flex space-x-2">
                    <button className="hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button className="hover:text-green-600"><CheckCircle className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFacultyAnalytics = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Faculty Analytics</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search faculty..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {facultyData.map((faculty) => (
          <div key={faculty.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img 
                  src={faculty.image} 
                  alt={faculty.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                  <p className="text-gray-600 mb-2">{faculty.department}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>{faculty.courses} Courses</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span>{faculty.responses} Responses</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(faculty.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{faculty.rating}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress bars for different metrics */}
            <div className="mt-6 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Student Engagement</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Satisfaction</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">EduFeedback</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-xl h-screen sticky top-0">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduFeedback</h1>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {activeTab === 'dashboard' ? 'Dashboard Overview' : 
                   activeTab === 'faculty' ? 'Faculty Analytics' : 
                   activeTab.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-6 h-6" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="font-semibold text-gray-900">Admin User</p>
                    <p className="text-sm text-gray-500">Springfield University</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'faculty' && renderFacultyAnalytics()}
            
            {/* Placeholder for other tabs */}
            {!['dashboard', 'faculty'].includes(activeTab) && (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200/50 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module
                </h3>
                <p className="text-gray-600 mb-6">
                  This section is under development. Advanced {activeTab} management features coming soon!
                </p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;