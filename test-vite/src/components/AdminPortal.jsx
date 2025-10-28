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
  ExternalLink,
  Copy,
  Send,
  Link as LinkIcon,
  UserCheck,
  Calendar as CalendarIcon,
  LogOut,
  Home,
  ChevronLeft,
  Save,
  RotateCcw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  
  // Admin info (would come from authentication)
  const [adminInfo, setAdminInfo] = useState({
    name: 'Dr. John Smith',
    institute: 'ABC University',
    department: 'Computer Science',
    email: 'admin@abcuniversity.edu'
  });

  // Feedback creation state
  const [showCreateFeedback, setShowCreateFeedback] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    title: '',
    description: '',
    department: '',
    year: '',
    section: '',
    subject: '',
    faculty: '',
    deadline: '',
    anonymous: true,
    allowMultipleSubmissions: false,
    questions: [
      {
        id: 1,
        type: 'rating',
        question: 'How would you rate the overall teaching quality?',
        required: true,
        options: []
      }
    ]
  });

  // Mock data - in real app, this would come from API
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

  const [activeFeedbackCampaigns, setActiveFeedbackCampaigns] = useState([
    {
      id: 1,
      title: 'Computer Science - 3rd Year Feedback',
      department: 'Computer Science',
      year: '3rd',
      section: 'A',
      subject: 'Data Structures',
      faculty: 'Dr. Sarah Wilson',
      responses: 45,
      totalStudents: 60,
      deadline: '2024-12-15',
      status: 'active',
      createdAt: '2024-09-01',
      link: `${window.location.origin}/survey/cse-3rd-a-ds-001`,
      anonymous: true,
      questions: 8
    },
    {
      id: 2,
      title: 'Mathematics Feedback - Class 11',
      department: 'Mathematics',
      year: '11th',
      section: 'B',
      subject: 'Advanced Mathematics',
      faculty: 'Prof. John Davis',
      responses: 32,
      totalStudents: 40,
      deadline: '2024-12-20',
      status: 'active',
      createdAt: '2024-09-05',
      link: `${window.location.origin}/survey/math-11th-b-adv-002`,
      anonymous: true,
      questions: 6
    },
    {
      id: 3,
      title: 'Physics Lab Feedback - 2nd Year',
      department: 'Physics',
      year: '2nd',
      section: 'C',
      subject: 'Physics Laboratory',
      faculty: 'Dr. Emily Chen',
      responses: 28,
      totalStudents: 35,
      deadline: '2024-12-10',
      status: 'draft',
      createdAt: '2024-09-10',
      link: `${window.location.origin}/survey/phy-2nd-c-lab-003`,
      anonymous: false,
      questions: 10
    }
  ]);

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Commerce', 'Mechanical Engineering', 'Electrical Engineering'];
  const years = ['1st', '2nd', '3rd', '4th', '11th', '12th'];
  const sections = ['A', 'B', 'C', 'D', 'E'];
  const questionTypes = [
    { value: 'rating', label: 'Rating Scale (1-5)', icon: '⭐' },
    { value: 'text', label: 'Text Response', icon: '📝' },
    { value: 'multiple', label: 'Multiple Choice', icon: '🔘' },
    { value: 'checkbox', label: 'Multiple Select', icon: '☑️' },
    { value: 'yesno', label: 'Yes/No', icon: '✅' }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'feedback', label: 'Feedback Management', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'create-feedback', label: 'Create Feedback', icon: <Plus className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics & Reports', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'faculty', label: 'Faculty Management', icon: <Users className="w-5 h-5" /> },
    { id: 'students', label: 'Student Database', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'courses', label: 'Course Management', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'rating',
      question: '',
      required: true,
      options: []
    };
    setFeedbackForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const handleRemoveQuestion = (questionId) => {
    if (feedbackForm.questions.length <= 1) {
      alert('At least one question is required!');
      return;
    }
    setFeedbackForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleQuestionChange = (questionId, field, value) => {
    setFeedbackForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleAddOption = (questionId) => {
    setFeedbackForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, options: [...(q.options || []), ''] }
          : q
      )
    }));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setFeedbackForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId   
          ? { 
              ...q, 
              options: q.options.map((opt, idx) => 
                idx === optionIndex ? value : opt
              )
            }
          : q
      )
    }));
  };

  const handleRemoveOption = (questionId, optionIndex) => {
    setFeedbackForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options.filter((_, idx) => idx !== optionIndex)
            }
          : q
      )
    }));
  };

  const generateSurveyLink = () => {
    const { department, year, section, subject } = feedbackForm;
    const linkId = `${department.toLowerCase().replace(/\s+/g, '-')}-${year}-${section.toLowerCase()}-${subject.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    return `${window.location.origin}/survey/${linkId}`;
  };

  const handleCreateFeedback = async () => {
    // Validation
    if (!feedbackForm.title || !feedbackForm.department || !feedbackForm.year || !feedbackForm.section || !feedbackForm.subject || !feedbackForm.faculty || !feedbackForm.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    if (feedbackForm.questions.some(q => !q.question.trim())) {
      alert('Please fill in all question texts');
      return;
    }

    // Create new feedback campaign
    const newCampaign = {
      id: Date.now(),
      title: feedbackForm.title,
      description: feedbackForm.description,
      department: feedbackForm.department,
      year: feedbackForm.year,
      section: feedbackForm.section,
      subject: feedbackForm.subject,
      faculty: feedbackForm.faculty,
      responses: 0,
      totalStudents: Math.floor(Math.random() * 50) + 20, // Mock total students
      deadline: feedbackForm.deadline,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      link: generateSurveyLink(),
      anonymous: feedbackForm.anonymous,
      allowMultipleSubmissions: feedbackForm.allowMultipleSubmissions,
      questions: feedbackForm.questions.length,
      questionsData: feedbackForm.questions
    };

    setActiveFeedbackCampaigns(prev => [newCampaign, ...prev]);
    
    alert('Feedback form created successfully! 🎉');
    setShowCreateFeedback(false);
    setActiveTab('feedback');
    
    // Reset form
    setFeedbackForm({
      title: '',
      description: '',
      department: '',
      year: '',
      section: '',
      subject: '',
      faculty: '',
      deadline: '',
      anonymous: true,
      allowMultipleSubmissions: false,
      questions: [
        {
          id: 1,
          type: 'rating',
          question: 'How would you rate the overall teaching quality?',
          required: true,
          options: []
        }
      ]
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Survey link copied to clipboard! 📋');
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this feedback campaign? This action cannot be undone.')) {
      setActiveFeedbackCampaigns(prev => prev.filter(c => c.id !== campaignId));
      alert('Campaign deleted successfully');
    }
  };

  const handleStatusChange = (campaignId, newStatus) => {
    setActiveFeedbackCampaigns(prev => 
      prev.map(c => 
        c.id === campaignId ? { ...c, status: newStatus } : c
      )
    );
    alert(`Campaign status updated to ${newStatus}`);
  };

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

  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{adminInfo.institute}</h1>
            <p className="text-sm text-gray-600">Admin Portal</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm"
            />
          </div>
          
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">{notifications}</span>
                </div>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{adminInfo.name}</p>
              <p className="text-xs text-gray-500">{adminInfo.department}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {adminInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">InstiForm</h2>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">Check our documentation for detailed guides</p>
            <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-50">
              View Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedbackManagement = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feedback Management</h2>
          <p className="text-gray-600 mt-1">Manage all your feedback campaigns</p>
        </div>
        <button
          onClick={() => {
            setShowCreateFeedback(true);
            setActiveTab('create-feedback');
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeFeedbackCampaigns.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeFeedbackCampaigns.filter(c => c.status === 'draft').length}</p>
              <p className="text-sm text-gray-600">Draft</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeFeedbackCampaigns.reduce((acc, c) => acc + c.responses, 0)}</p>
              <p className="text-sm text-gray-600">Total Responses</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((activeFeedbackCampaigns.reduce((acc, c) => acc + c.responses, 0) / activeFeedbackCampaigns.reduce((acc, c) => acc + c.totalStudents, 1)) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Avg Response Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">All Campaigns</h3>
            <div className="flex items-center space-x-3">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {activeFeedbackCampaigns.map((campaign) => (
            <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{campaign.title}</h4>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                      campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                    {campaign.anonymous && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Anonymous
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>{campaign.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Year {campaign.year} - {campaign.section}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{campaign.subject}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{campaign.faculty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => setSelectedFeedback(campaign)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => copyToClipboard(campaign.link)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Copy Link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <div className="relative group">
                    <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <button 
                        onClick={() => handleStatusChange(campaign.id, campaign.status === 'active' ? 'draft' : 'active')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                      >
                        {campaign.status === 'active' ? 'Make Draft' : 'Activate'}
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                        Duplicate
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                        Export Results
                      </button>
                      <button 
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                      >
                        Delete Campaign
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Response Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {campaign.responses}/{campaign.totalStudents}
                  </div>
                  <div className="text-sm text-blue-700">
                    {Math.round((campaign.responses / campaign.totalStudents) * 100)}% completed
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Deadline</span>
                  </div>
                  <div className="text-lg font-bold text-orange-900">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-orange-700">
                    {Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Questions</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {campaign.questions}
                  </div>
                  <div className="text-sm text-green-700">
                    Total questions
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <LinkIcon className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">Survey Link</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      value={campaign.link} 
                      readOnly 
                      className="text-xs bg-white border border-gray-300 rounded px-2 py-1 flex-1 truncate"
                    />
                    <button 
                      onClick={() => copyToClipboard(campaign.link)}
                      className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${Math.min((campaign.responses / campaign.totalStudents) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreateFeedback = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('feedback')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Feedback Form</h2>
            <p className="text-gray-600 mt-1">Design a comprehensive feedback form for students</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
        <div className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <span>Basic Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Title *</label>
                <input
                  type="text"
                  value={feedbackForm.title}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, title: e.target.value}))}
                  placeholder="e.g., Computer Science 3rd Year Mid-Semester Feedback"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                <select
                  value={feedbackForm.department}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, department: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Year *</label>
                <select
                  value={feedbackForm.year}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, year: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year} Year</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Section *</label>
                <select
                  value={feedbackForm.section}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, section: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Submission Deadline *</label>
                <input
                  type="date"
                  value={feedbackForm.deadline}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, deadline: e.target.value}))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject/Course *</label>
                <input
                  type="text"
                  value={feedbackForm.subject}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, subject: e.target.value}))}
                  placeholder="e.g., Data Structures and Algorithms"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Faculty Name *</label>
                <input
                  type="text"
                  value={feedbackForm.faculty}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, faculty: e.target.value}))}
                  placeholder="e.g., Dr. Sarah Wilson"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                value={feedbackForm.description}
                onChange={(e) => setFeedbackForm(prev => ({...prev, description: e.target.value}))}
                placeholder="Brief description of this feedback campaign and what you hope to achieve..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all"
              />
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={feedbackForm.anonymous}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, anonymous: e.target.checked}))}
                  className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Anonymous Responses</div>
                  <div className="text-sm text-gray-500">Students' identities will not be recorded</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={feedbackForm.allowMultipleSubmissions}
                  onChange={(e) => setFeedbackForm(prev => ({...prev, allowMultipleSubmissions: e.target.checked}))}
                  className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Allow Multiple Submissions</div>
                  <div className="text-sm text-gray-500">Students can update their responses</div>
                </div>
              </label>
            </div>
          </div>

          {/* Questions Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">2</span>
              </div>
              <span>Feedback Questions</span>
            </h3>

            <div className="space-y-6">
              {feedbackForm.questions.map((question, index) => (
                <div key={question.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">Question {index + 1}</span>
                    </div>
                    {feedbackForm.questions.length > 1 && (
                      <button
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                      <select
                        value={question.type}
                        onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        {questionTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={question.required}
                          onChange={(e) => handleQuestionChange(question.id, 'required', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Required Question</span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Text *</label>
                    <textarea
                      value={question.question}
                      onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                      placeholder="Enter your question here..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical transition-all"
                    />
                  </div>

                  {/* Options for multiple choice and checkbox questions */}
                  {(question.type === 'multiple' || question.type === 'checkbox') && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">Answer Options</label>
                        <button
                          onClick={() => handleAddOption(question.id)}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                        >
                          + Add Option
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {(question.options || []).map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-500">{optionIndex + 1}</span>
                            </div>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <button
                              onClick={() => handleRemoveOption(question.id, optionIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Remove Option"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {(!question.options || question.options.length === 0) && (
                          <p className="text-sm text-gray-500 italic py-2">Click "Add Option" to add answer choices</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Preview for rating questions */}
                  {question.type === 'rating' && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <div key={rating} className="flex flex-col items-center">
                            <Star className="w-6 h-6 text-gray-300" />
                            <span className="text-xs text-gray-500">{rating}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview for yes/no questions */}
                  {question.type === 'yesno' && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name={`preview-${question.id}`} disabled />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name={`preview-${question.id}`} disabled />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  onClick={handleAddQuestion}
                  className="px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Another Question</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-8 border-t-2 border-gray-200">
            <button
              onClick={() => {
                if (window.confirm('Are you sure? All unsaved changes will be lost.')) {
                  setActiveTab('feedback');
                }
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  // Save as draft logic here
                  alert('Saved as draft!');
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Draft</span>
              </button>
              
              <button
                onClick={handleCreateFeedback}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span>Create & Activate Campaign</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {adminInfo.name}!</h1>
            <p className="text-blue-100">Here's what's happening at {adminInfo.institute} today</p>
            <div className="mt-4 flex items-center space-x-4 text-blue-100">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => {
            setActiveTab('create-feedback');
            setShowCreateFeedback(true);
          }}
          className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create New Campaign</h3>
              <p className="text-sm text-gray-600">Start collecting feedback</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Campaigns</h3>
              <p className="text-sm text-gray-600">View and edit existing forms</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Analytics</h3>
              <p className="text-sm text-gray-600">Detailed reports & insights</p>
            </div>
          </div>
        </button>
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
          value={activeFeedbackCampaigns.filter(c => c.status === 'active').length} 
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
          title="This Month" 
          value={`+${dashboardStats.improvement}%`} 
          change={15}
          icon={<Target className="w-6 h-6 text-white" />}
          color="indigo"
        />
      </div>

      {/* Recent Activity & Charts */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Campaigns */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Campaigns</h3>
            <button
              onClick={() => setActiveTab('feedback')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all →
            </button>
          </div>
          
          <div className="space-y-4">
            {activeFeedbackCampaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    campaign.status === 'active' ? 'bg-green-500' : 
                    campaign.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                    <p className="text-sm text-gray-600">{campaign.department} • {campaign.faculty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{campaign.responses}/{campaign.totalStudents}</div>
                  <div className="text-xs text-gray-500">
                    {Math.round((campaign.responses / campaign.totalStudents) * 100)}% complete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Surveys</span>
              <span className="font-semibold text-gray-900">
                {activeFeedbackCampaigns.filter(c => c.status === 'active').length}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Responses</span>
              <span className="font-semibold text-gray-900">
                {activeFeedbackCampaigns.reduce((acc, c) => acc + c.responses, 0)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Rating</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900">{dashboardStats.avgRating}/5</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="font-semibold text-green-600">+{dashboardStats.improvement}%</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{dashboardStats.responseRate}%</div>
              <div className="text-sm text-gray-600">Overall Response Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${dashboardStats.responseRate}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Response Trends */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Response Trends</h3>
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Satisfaction Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Satisfaction Breakdown</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-600 mt-1">Comprehensive insights into feedback performance</p>
      </div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-sm text-gray-600">Total Responses</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.2/5</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">+12%</p>
              <p className="text-sm text-gray-600">Month Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="responses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Department Performance</h3>
          <div className="space-y-4">
            {['Computer Science', 'Mathematics', 'Physics', 'Chemistry'].map((dept, index) => {
              const score = [4.5, 4.2, 4.0, 3.8][index];
              const responses = [450, 320, 280, 210][index];
              return (
                <div key={dept} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{dept}</h4>
                    <p className="text-sm text-gray-600">{responses} responses</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{score}/5</span>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(score / 5) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderSection = (title, description) => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      
      <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200/50 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Settings className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-600 mb-6">This section is under development and will be available soon.</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all">
          Get Notified
        </button>
      </div>
    </div>
  );

  // Main render function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'feedback':
        return renderFeedbackManagement();
      case 'create-feedback':
        return renderCreateFeedback();
      case 'analytics':
        return renderAnalytics();
      case 'faculty':
        return renderPlaceholderSection('Faculty Management', 'Manage faculty members and their profiles');
      case 'students':
        return renderPlaceholderSection('Student Database', 'Access and manage student information');
      case 'courses':
        return renderPlaceholderSection('Course Management', 'Organize and manage courses and subjects');
      case 'settings':
        return renderPlaceholderSection('Settings', 'Configure system preferences and admin settings');
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        {renderSidebar()}
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Header */}
          {renderHeader()}
          
          {/* Page Content */}
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Campaign Details</h3>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedFeedback.title}</h4>
                  <p className="text-gray-600">{selectedFeedback.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Department:</span>
                    <span className="ml-2 font-medium">{selectedFeedback.department}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Faculty:</span>
                    <span className="ml-2 font-medium">{selectedFeedback.faculty}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Subject:</span>
                    <span className="ml-2 font-medium">{selectedFeedback.subject}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>
                    <span className="ml-2 font-medium">{new Date(selectedFeedback.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Response Progress</span>
                    <span className="text-sm text-gray-600">
                      {selectedFeedback.responses}/{selectedFeedback.totalStudents}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{width: `${(selectedFeedback.responses / selectedFeedback.totalStudents) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;