import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Star,
  MessageSquare,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  User,
  Settings,
  Bell,
  Search,
  Plus,
  Send,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
  Target,
  Zap,
  Heart,
  ThumbsUp,
  ChevronRight,
  ChevronDown,
  Filter,
  Download,
  Share,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  Home,
  BarChart3,
  Globe,
  Sparkles,
  Trophy,
  Activity,
  PenTool,
  FileText,
} from "lucide-react";

const StudentPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prefEmail, setPrefEmail] = useState(true);
  const [prefPush, setPrefPush] = useState(true);
  const [prefTips, setPrefTips] = useState(false);
  const [theme, setTheme] = useState("light");

  const [studentCampaigns, setStudentCampaigns] = useState([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignsError, setCampaignsError] = useState("");
  // Add this useEffect to fetch campaigns when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        if (!token) {
          setCampaignsError("No authentication token found");
          setCampaignsLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/students/campaigns",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await response.json();
        setStudentCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setCampaignsError(err.message);
      } finally {
        setCampaignsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Mock student data
  const studentData = {
    name: "Alex Johnson",
    studentId: "CS2024001",
    semester: "6th Semester",
    branch: "Computer Science",
    cgpa: 8.7,
    completedFeedbacks: 12,
    pendingFeedbacks: 3,
    achievementPoints: 850,
  };

  const enrolledCourses = [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      code: "CS301",
      faculty: "Dr. Sarah Wilson",
      credits: 4,
      progress: 75,
      lastFeedback: "2024-08-20",
      rating: 4,
      status: "active",
      color: "blue",
    },
    {
      id: 2,
      name: "Database Management Systems",
      code: "CS302",
      faculty: "Prof. Michael Chen",
      credits: 3,
      progress: 60,
      lastFeedback: null,
      rating: 0,
      status: "pending",
      color: "green",
    },
    {
      id: 3,
      name: "Software Engineering",
      code: "CS303",
      faculty: "Dr. Emily Davis",
      credits: 4,
      progress: 90,
      lastFeedback: "2024-08-22",
      rating: 5,
      status: "completed",
      color: "purple",
    },
    {
      id: 4,
      name: "Computer Networks",
      code: "CS304",
      faculty: "Prof. John Miller",
      credits: 3,
      progress: 45,
      lastFeedback: "2024-08-15",
      rating: 3,
      status: "active",
      color: "orange",
    },
  ];

  const recentFeedbacks = [
    {
      id: 1,
      course: "Software Engineering",
      faculty: "Dr. Emily Davis",
      rating: 5,
      comment: "Excellent course structure and practical assignments!",
      date: "2024-08-22",
      status: "submitted",
      likes: 12,
    },
    {
      id: 2,
      course: "Data Structures & Algorithms",
      faculty: "Dr. Sarah Wilson",
      rating: 4,
      comment: "Great teaching methodology, would love more coding practice.",
      date: "2024-08-20",
      status: "reviewed",
      likes: 8,
    },
    {
      id: 3,
      course: "Computer Networks",
      faculty: "Prof. John Miller",
      rating: 3,
      comment: "Course content is good but needs more interactive sessions.",
      date: "2024-08-15",
      status: "addressed",
      likes: 5,
    },
  ];

  const [feedbackList, setFeedbackList] = useState(recentFeedbacks);

  const achievements = [
    {
      id: 1,
      title: "Feedback Champion",
      description: "Completed 10+ feedback forms",
      icon: "🏆",
      color: "yellow",
      earned: true,
    },
    {
      id: 2,
      title: "Early Bird",
      description: "First to submit feedback 5 times",
      icon: "🌅",
      color: "blue",
      earned: true,
    },
    {
      id: 3,
      title: "Constructive Critic",
      description: "Detailed feedback appreciated by faculty",
      icon: "💡",
      color: "purple",
      earned: true,
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Submit feedback for 30 days straight",
      icon: "👑",
      color: "orange",
      earned: false,
    },
    {
      id: 5,
      title: "Community Helper",
      description: "Help 100+ students with feedback",
      icon: "🤝",
      color: "green",
      earned: false,
    },
    {
      id: 6,
      title: "Master Reviewer",
      description: "Complete 50+ comprehensive reviews",
      icon: "⭐",
      color: "pink",
      earned: false,
    },
  ];

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    {
      id: "courses",
      label: "My Courses",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "feedback",
      label: "My Feedback",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: "analytics",
      label: "My Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const StatCard = ({
    title,
    value,
    change,
    icon,
    color = "blue",
    subtitle = "",
  }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
      yellow: "from-yellow-500 to-yellow-600",
    };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
          {typeof change === "number" && (
            <div
              className={`flex items-center space-x-1 text-sm font-semibold ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>
                {change > 0 ? "+" : ""}
                {change}%
              </span>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    );
  };

  const CourseCard = ({ course }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
    };

    const statusColors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
    };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-16 h-16 bg-gradient-to-r ${
              colorClasses[course.color]
            } rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
          >
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              statusColors[course.status]
            }`}
          >
            {course.status}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
        <p className="text-gray-600 mb-1">
          {course.code} • {course.faculty}
        </p>
        <p className="text-sm text-gray-500 mb-4">{course.credits} Credits</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${
                colorClasses[course.color]
              } h-2 rounded-full transition-all duration-500`}
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < course.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                } cursor-pointer hover:text-yellow-400 transition-colors`}
                onClick={() => {
                  setSelectedCourse(course);
                  setRating(i + 1);
                  setShowFeedbackForm(true);
                }}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              {course.rating || "Rate"}
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => {
                setSelectedCourse(course);
                setShowFeedbackForm(true);
              }}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hey {studentData.name}! 👋
              </h1>
              <p className="text-purple-100 mb-4">
                Ready to share your thoughts and shape your education?
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{studentData.cgpa}</div>
                  <div className="text-sm text-purple-100">CGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {studentData.completedFeedbacks}
                  </div>
                  <div className="text-sm text-purple-100">Feedback Given</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {studentData.achievementPoints}
                  </div>
                  <div className="text-sm text-purple-100">
                    Achievement Points
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold">{studentData.studentId}</p>
                <p className="text-purple-100 text-sm">{studentData.branch}</p>
                <p className="text-purple-100 text-sm">
                  {studentData.semester}
                </p>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Courses Enrolled"
          value={enrolledCourses.length}
          icon={<BookOpen className="w-6 h-6 text-white" />}
          color="blue"
        />
        <StatCard
          title="Pending Feedback"
          value={studentData.pendingFeedbacks}
          icon={<Clock className="w-6 h-6 text-white" />}
          color="orange"
          subtitle="Submit soon!"
        />

        <StatCard
          title="Achievements Earned"
          value={achievements.filter((a) => a.earned).length}
          icon={<Trophy className="w-6 h-6 text-white" />}
          color="yellow"
          subtitle={`${
            achievements.length - achievements.filter((a) => a.earned).length
          } more to unlock`}
        />
        <StatCard
          title="Feedback Score"
          value={`${Math.round(
            (studentData.completedFeedbacks /
              (studentData.completedFeedbacks + studentData.pendingFeedbacks)) *
              100
          )}%`}
          icon={<Target className="w-6 h-6 text-white" />}
          color="green"
          subtitle="Keep it up!"
        />
      </div>

      {/* Available Feedback Forms from Database */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Available Feedback Forms
        </h3>

        {campaignsLoading ? (
          <div className="text-center py-8 text-gray-600">
            Loading feedback forms...
          </div>
        ) : campaignsError ? (
          <div className="text-center py-8 text-red-600">{campaignsError}</div>
        ) : studentCampaigns.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No feedback forms available for you at this time.
          </div>
        ) : (
          <div className="space-y-3">
            {studentCampaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  setSelectedCourse({ ...campaign, type: "campaign" });
                  setShowFeedbackForm(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {campaign.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {campaign.questions.length} questions • Deadline:{" "}
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pending Feedback */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Pending Feedback
            </h3>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
              {studentData.pendingFeedbacks} pending
            </span>
          </div>

          <div className="space-y-4">
            {enrolledCourses
              .filter(
                (course) => course.status === "pending" || !course.lastFeedback
              )
              .slice(0, 2)
              .map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200/50"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{course.name}</p>
                    <p className="text-sm text-gray-600">{course.faculty}</p>
                  </div>
                  <button
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 flex items-center space-x-2"
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowFeedbackForm(true);
                    }}
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Recent Achievements
            </h3>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>

          <div className="space-y-4">
            {achievements
              .filter((a) => a.earned)
              .slice(0, 3)
              .map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {achievement.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Recent Feedback Activity
          </h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {feedbackList.slice(0, 3).map((feedback) => (
            <div
              key={feedback.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">
                      {feedback.course}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      feedback.status === "submitted"
                        ? "bg-blue-100 text-blue-800"
                        : feedback.status === "reviewed"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {feedback.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{feedback.comment}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{feedback.date}</span>
                  <div className="flex items-center space-x-3">
                    <button
                      className="flex items-center space-x-1 hover:text-blue-600"
                      onClick={() => {
                        setFeedbackList((list) =>
                          list.map((f) =>
                            f.id === feedback.id
                              ? { ...f, likes: f.likes + 1 }
                              : f
                          )
                        );
                      }}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{feedback.likes}</span>
                    </button>
                    <button className="hover:text-blue-600">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourses = () => {
    const filtered = enrolledCourses.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.faculty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-700 font-medium">
                  No courses matched your search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAchievements = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Achievements
        </h2>
        <p className="text-gray-600 mb-8">
          Keep giving great feedback to unlock more badges!
        </p>

        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">
              {achievements.filter((a) => a.earned).length}
            </div>
            <div className="text-gray-600">Earned</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">
              {achievements.length -
                achievements.filter((a) => a.earned).length}
            </div>
            <div className="text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">
              {studentData.achievementPoints}
            </div>
            <div className="text-gray-600">Points</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 ${
              achievement.earned
                ? "border-green-200 ring-2 ring-green-100 hover:shadow-xl"
                : "border-gray-200 opacity-60 hover:opacity-80"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{achievement.icon}</div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  achievement.earned ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {achievement.title}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  achievement.earned ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {achievement.description}
              </p>
              {achievement.earned ? (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Earned!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">In Progress</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Feedback</h2>
        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2"
          onClick={() => {
            const firstPending =
              enrolledCourses.find(
                (c) => c.status === "pending" || !c.lastFeedback
              ) || enrolledCourses[0];
            setSelectedCourse(firstPending);
            setShowFeedbackForm(true);
          }}
        >
          <PenTool className="w-4 h-4" />
          <span>New Feedback</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {feedbackList.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">{fb.course}</p>
                <p className="text-sm text-gray-600">{fb.faculty}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {fb.date}
              </span>
            </div>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < fb.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm mb-4">{fb.comment}</p>
            <div className="flex items-center justify-between text-sm">
              <span
                className={`px-2 py-1 rounded-full ${
                  fb.status === "submitted"
                    ? "bg-blue-100 text-blue-800"
                    : fb.status === "reviewed"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {fb.status}
              </span>
              <div className="flex items-center space-x-3 text-gray-600">
                <button
                  className="flex items-center space-x-1 hover:text-blue-600"
                  onClick={() =>
                    setFeedbackList((list) =>
                      list.map((f) =>
                        f.id === fb.id ? { ...f, likes: f.likes + 1 } : f
                      )
                    )
                  }
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{fb.likes}</span>
                </button>
                <button className="hover:text-purple-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="hover:text-red-600"
                  onClick={() =>
                    setFeedbackList((list) =>
                      list.filter((f) => f.id !== fb.id)
                    )
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => {
    const avgCourseProgress = Math.round(
      enrolledCourses.reduce((s, c) => s + c.progress, 0) /
        enrolledCourses.length
    );
    const avgRating =
      Math.round(
        (enrolledCourses.reduce((s, c) => s + (c.rating || 0), 0) /
          (enrolledCourses.filter((c) => c.rating > 0).length || 1)) *
          10
      ) / 10;

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">My Analytics</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Avg Course Progress"
            value={`${avgCourseProgress}%`}
            icon={<Activity className="w-6 h-6 text-white" />}
            color="purple"
          />
          <StatCard
            title="Avg Rating Given"
            value={`${avgRating}/5`}
            icon={<Star className="w-6 h-6 text-white" />}
            color="yellow"
          />
          <StatCard
            title="Total Feedback"
            value={feedbackList.length}
            icon={<MessageSquare className="w-6 h-6 text-white" />}
            color="blue"
          />
          <StatCard
            title="Pending Items"
            value={studentData.pendingFeedbacks}
            icon={<Clock className="w-6 h-6 text-white" />}
            color="orange"
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Course Progress Overview
          </h3>
          <div className="space-y-4">
            {enrolledCourses.map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-800">{c.name}</span>
                  <span className="text-gray-600">{c.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      c.color === "blue"
                        ? "from-blue-500 to-blue-600"
                        : c.color === "green"
                        ? "from-green-500 to-green-600"
                        : c.color === "purple"
                        ? "from-purple-500 to-purple-600"
                        : "from-orange-500 to-orange-600"
                    }`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Download Reports</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Feedback Summary (PDF)</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Course Progress (CSV)</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 border rounded-xl">
              <span className="text-gray-700">Email notifications</span>
              <input
                type="checkbox"
                checked={prefEmail}
                onChange={() => setPrefEmail((v) => !v)}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between p-3 border rounded-xl">
              <span className="text-gray-700">Push notifications</span>
              <input
                type="checkbox"
                checked={prefPush}
                onChange={() => setPrefPush((v) => !v)}
                className="w-5 h-5"
              />
            </label>
            <label className="flex items-center justify-between p-3 border rounded-xl">
              <span className="text-gray-700">Product tips</span>
              <input
                type="checkbox"
                checked={prefTips}
                onChange={() => setPrefTips((v) => !v)}
                className="w-5 h-5"
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Appearance</h3>
          <div className="flex items-center gap-3">
            {["light", "system", "dark"].map((opt) => (
              <button
                key={opt}
                onClick={() => setTheme(opt)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === opt
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-800 border-gray-300"
                } capitalize`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Theme selection is visual only in this demo.
          </p>
        </div>

        <div className="flex items-center justify-end">
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  // Feedback Modal
  const FeedbackModal = () => {
    if (!showFeedbackForm || !selectedCourse) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setShowFeedbackForm(false)}
        ></div>
        <div className="relative bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Submit Feedback
            </h3>
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h4 className="font-bold text-gray-900 mb-1">
              {selectedCourse.type === "campaign"
                ? selectedCourse.title
                : selectedCourse.name}
            </h4>
            <p className="text-gray-600 text-sm">
              {selectedCourse.code} • {selectedCourse.faculty}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Overall Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
              <span className="ml-4 text-lg font-semibold text-gray-700">
                {rating > 0 && `${rating}/5`}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Your Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Share your thoughts about the course, teaching methodology, assignments, etc..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Feedback submitted:", {
                  course: selectedCourse.id,
                  rating,
                  feedback: feedbackText,
                });
                setFeedbackList((list) => [
                  {
                    id: Math.max(0, ...list.map((f) => f.id)) + 1,
                    course: selectedCourse.name,
                    faculty: selectedCourse.faculty,
                    rating,
                    comment: feedbackText,
                    date: new Date().toISOString().slice(0, 10),
                    status: "submitted",
                    likes: 0,
                  },
                  ...list,
                ]);
                setShowFeedbackForm(false);
                setRating(0);
                setFeedbackText("");
              }}
              disabled={!rating || !feedbackText.trim()}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-10 w-72 h-full bg-white shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Student Portal</p>
                  <p className="text-xs text-gray-500">{studentData.name}</p>
                </div>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl ${
                    activeTab === item.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div className="hidden lg:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Student Portal</p>
                <p className="text-xs text-gray-500">
                  {studentData.semester} • {studentData.branch}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="p-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {notifications}
                </span>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
              AJ
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 mr-6">
            <nav className="bg-white rounded-2xl border border-gray-200 p-4 sticky top-6">
              <ul className="space-y-1">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl ${
                        activeTab === item.id
                          ? "bg-purple-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "courses" && renderCourses()}
            {activeTab === "feedback" && renderFeedback()}
            {activeTab === "achievements" && renderAchievements()}
            {activeTab === "analytics" && renderAnalytics()}
            {activeTab === "settings" && renderSettings()}
          </main>
        </div>
      </div>

      <FeedbackModal />
    </div>
  );
};

export default StudentPortal;
