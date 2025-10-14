import React, { useState } from "react";
import {
  GraduationCap,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  ArrowLeft,
  FileText,
  Users,
  Calendar,
  Globe,
  BookOpen,
} from "lucide-react";

const InstiForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: "",
    instituteType: "",
    establishedYear: "",
    affiliationBoard: "",
    email: "",
    phone: "",
    alternatePhone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    adminName: "",
    adminDesignation: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
    totalStudents: "",
    totalFaculty: "",
    departments: "",
    description: "",
    agreeTerms: false,
    agreeNewsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const instituteTypes = [
    "University",
    "Engineering College",
    "Medical College",
    "Arts & Science College",
    "Management Institute",
    "Technical Institute",
    "Research Institute",
    "School (10+2)",
    "Other",
  ];

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.instituteName.trim()) newErrors.instituteName = "Institute name is required";
      if (!formData.instituteType) newErrors.instituteType = "Institute type is required";
      if (!formData.establishedYear) newErrors.establishedYear = "Established year is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = "Enter valid 10-digit phone number";
    }
    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Enter valid 6-digit pincode";
    }
    if (step === 3) {
      if (!formData.adminName.trim()) newErrors.adminName = "Admin name is required";
      if (!formData.adminDesignation.trim()) newErrors.adminDesignation = "Designation is required";
      if (!formData.adminEmail.trim()) newErrors.adminEmail = "Admin email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) newErrors.adminEmail = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      try {
        const response = await fetch("http://localhost:5000/api/institute/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            establishedYear: Number(formData.establishedYear),
            totalStudents: formData.totalStudents ? Number(formData.totalStudents) : undefined,
            totalFaculty: formData.totalFaculty ? Number(formData.totalFaculty) : undefined,
            departments: formData.departments ? Number(formData.departments) : undefined,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          alert("Institute registered successfully!");
          console.log("Registration successful:", data);
          setIsSubmitting(false);
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Registration failed, please check your input.");
          console.error("Registration failed:", errorData);
          setIsSubmitting(false);
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("A server error occurred! Make sure your backend is running on http://localhost:5000");
        setIsSubmitting(false);
      }
    }
  };

  const renderFormField = ({ label, name, type = "text", placeholder, icon: Icon, required = false, options = null, rows = null }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />}
        {type === "select" ? (
          <select
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <option value="">{placeholder}</option>
            {options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            rows={rows || 3}
            className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
          />
        ) : type === "password" ? (
          <div className="relative">
            <input
              type={name === "password" ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password")}
              value={formData[name]}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
            />
            <button
              type="button"
              onClick={() => name === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {(name === "password" ? showPassword : showConfirmPassword) ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        ) : (
          <input
            type={type}
            value={formData[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
          />
        )}
      </div>
      {errors[name] && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= step ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {currentStep > step ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 3 && <div className={`w-20 h-1 mx-2 ${currentStep > step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span className={currentStep >= 1 ? 'font-semibold text-blue-600' : ''}>Basic Info</span>
        <span className={currentStep >= 2 ? 'font-semibold text-blue-600' : ''}>Address</span>
        <span className={currentStep >= 3 ? 'font-semibold text-blue-600' : ''}>Admin Account</span>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="flex justify-between pt-8 border-t">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
          currentStep === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>
      {currentStep < 3 ? (
        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <span>Continue</span>
          <ArrowLeft className="w-5 h-5 rotate-180" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          } text-white`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Registering...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Register Institute</span>
            </>
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Institute Registration</h1>
              <p className="text-gray-600">Join the EduFeedback platform</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            {renderProgressBar()}
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "Institute Name",
                    name: "instituteName",
                    placeholder: "Enter institute name",
                    icon: Building2,
                    required: true,
                  })}
                  {renderFormField({
                    label: "Institute Type",
                    name: "instituteType",
                    type: "select",
                    placeholder: "Select institute type",
                    icon: GraduationCap,
                    options: instituteTypes,
                    required: true,
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "Established Year",
                    name: "establishedYear",
                    type: "number",
                    placeholder: "e.g., 1990",
                    icon: Calendar,
                    required: true,
                  })}
                  {renderFormField({
                    label: "Affiliation/Board",
                    name: "affiliationBoard",
                    placeholder: "e.g., AICTE, UGC, CBSE",
                    icon: FileText,
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "institute@example.com",
                    icon: Mail,
                    required: true,
                  })}
                  {renderFormField({
                    label: "Phone Number",
                    name: "phone",
                    placeholder: "10-digit phone number",
                    icon: Phone,
                    required: true,
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "Alternate Phone",
                    name: "alternatePhone",
                    placeholder: "Optional alternate number",
                    icon: Phone,
                  })}
                  {renderFormField({
                    label: "Website",
                    name: "website",
                    placeholder: "https://www.example.com",
                    icon: Globe,
                  })}
                </div>
                {renderNavigation()}
              </div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {renderFormField({
                  label: "Complete Address",
                  name: "address",
                  type: "textarea",
                  placeholder: "Enter full address with landmark",
                  icon: MapPin,
                  required: true,
                  rows: 3,
                })}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "City",
                    name: "city",
                    placeholder: "Enter city name",
                    icon: Building2,
                    required: true,
                  })}
                  {renderFormField({
                    label: "State",
                    name: "state",
                    type: "select",
                    placeholder: "Select state",
                    icon: MapPin,
                    options: indianStates,
                    required: true,
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "Pincode",
                    name: "pincode",
                    placeholder: "6-digit pincode",
                    icon: MapPin,
                    required: true,
                  })}
                  {renderFormField({
                    label: "Country",
                    name: "country",
                    placeholder: "Country",
                    icon: Globe,
                  })}
                </div>
                {renderNavigation()}
              </div>
            )}

            {/* Step 3: Admin Account & Additional Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Admin Account Details</h3>
                  <p className="text-blue-700 text-sm">This account will be used for institute administration and management.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "Admin Full Name",
                    name: "adminName",
                    placeholder: "Enter admin name",
                    icon: User,
                    required: true,
                  })}
                  {renderFormField({
                    label: "Admin Designation",
                    name: "adminDesignation",
                    placeholder: "e.g., Principal, Director",
                    icon: User,
                    required: true,
                  })}
                </div>
                
                {renderFormField({
                  label: "Admin Email",
                  name: "adminEmail",
                  type: "email",
                  placeholder: "admin@institute.com",
                  icon: Mail,
                  required: true,
                })}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField({
                    label: "Password",
                    name: "password",
                    type: "password",
                    placeholder: "Minimum 8 characters",
                    icon: Lock,
                    required: true,
                  })}
                  {renderFormField({
                    label: "Confirm Password",
                    name: "confirmPassword",
                    type: "password",
                    placeholder: "Re-enter password",
                    icon: Lock,
                    required: true,
                  })}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Additional Information (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    {renderFormField({
                      label: "Total Students",
                      name: "totalStudents",
                      type: "number",
                      placeholder: "Number of students",
                      icon: Users,
                    })}
                    {renderFormField({
                      label: "Total Faculty",
                      name: "totalFaculty",
                      type: "number",
                      placeholder: "Number of faculty",
                      icon: Users,
                    })}
                    {renderFormField({
                      label: "Departments",
                      name: "departments",
                      type: "number",
                      placeholder: "Number of departments",
                      icon: BookOpen,
                    })}
                  </div>
                  {renderFormField({
                    label: "Institute Description",
                    name: "description",
                    type: "textarea",
                    placeholder: "Brief description about the institute (optional)",
                    rows: 3,
                  })}
                </div>

                <div className="space-y-4 pt-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                      {" "}and{" "}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.agreeTerms}</span>
                    </div>
                  )}
                  
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeNewsletter}
                      onChange={(e) => handleInputChange("agreeNewsletter", e.target.checked)}
                      className="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Subscribe to our newsletter for updates and announcements
                    </span>
                  </label>
                </div>
                
                {renderNavigation()}
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@edufeedback.com"
              className="text-blue-600 hover:underline"
            >
              support@edufeedback.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstiForm;