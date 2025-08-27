import React, { useState } from 'react';
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
  Calendar
} from 'lucide-react';

const InstiForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    instituteName: '',
    instituteType: '',
    establishedYear: '',
    affiliationBoard: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    website: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Admin Account
    adminName: '',
    adminDesignation: '',
    adminEmail: '',
    password: '',
    confirmPassword: '',
    
    // Additional Information
    totalStudents: '',
    totalFaculty: '',
    departments: '',
    description: '',
    
    // Terms
    agreeTerms: false,
    agreeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const instituteTypes = [
    'University',
    'Engineering College',
    'Medical College',
    'Arts & Science College',
    'Management Institute',
    'Technical Institute',
    'Research Institute',
    'School (10+2)',
    'Other'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
      if (!formData.instituteType) newErrors.instituteType = 'Institute type is required';
      if (!formData.establishedYear) newErrors.establishedYear = 'Established year is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit phone number';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
    }

    if (step === 3) {
      if (!formData.adminName.trim()) newErrors.adminName = 'Admin name is required';
      if (!formData.adminDesignation.trim()) newErrors.adminDesignation = 'Designation is required';
      if (!formData.adminEmail.trim()) newErrors.adminEmail = 'Admin email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) newErrors.adminEmail = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('Institute registered successfully!');
      setIsSubmitting(false);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${currentStep >= step 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                {currentStep > step ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`
                  w-16 h-1 mx-2
                  ${currentStep > step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          Basic Information
        </span>
        <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          Address Details
        </span>
        <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
          Admin Account
        </span>
      </div>
    </div>
  );

  const renderFormField = (field, label, type = 'text', icon = null, options = null, placeholder = '') => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {['instituteName', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'adminName', 'adminEmail', 'password'].includes(field) && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        {type === 'select' ? (
          <select
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`
              w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
              ${errors[field] ? 'border-red-500' : ''}
            `}
          >
            <option value="">{placeholder}</option>
            {options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`
              w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none
              ${errors[field] ? 'border-red-500' : ''}
            `}
          />
        ) : type === 'password' ? (
          <div className="relative">
            <input
              type={field === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={placeholder}
              className={`
                w-full ${icon ? 'pl-10' : 'pl-3'} pr-12 py-3 border border-gray-300 rounded-xl 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                ${errors[field] ? 'border-red-500' : ''}
              `}
            />
            <button
              type="button"
              onClick={() => field === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {(field === 'password' ? showPassword : showConfirmPassword) ? 
                <EyeOff className="w-5 h-5 text-gray-400" /> : 
                <Eye className="w-5 h-5 text-gray-400" />
              }
            </button>
          </div>
        ) : (
          <input
            type={type}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            className={`
              w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border border-gray-300 rounded-xl 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
              ${errors[field] ? 'border-red-500' : ''}
            `}
          />
        )}
      </div>
      {errors[field] && (
        <div className="flex items-center space-x-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{errors[field]}</span>
        </div>
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

            <div>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {renderFormField('instituteName', 'Institute Name', 'text', 
                      <Building2 className="w-5 h-5 text-gray-400" />, null, 'Enter your institute name')}
                    
                    {renderFormField('instituteType', 'Institute Type', 'select', 
                      <GraduationCap className="w-5 h-5 text-gray-400" />, instituteTypes, 'Select institute type')}
                    
                    {renderFormField('establishedYear', 'Established Year', 'number', 
                      <Calendar className="w-5 h-5 text-gray-400" />, null, 'YYYY')}
                    
                    {renderFormField('affiliationBoard', 'Affiliation/Board', 'text', 
                      <FileText className="w-5 h-5 text-gray-400" />, null, 'e.g., AICTE, UGC, CBSE')}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {renderFormField('email', 'Official Email', 'email', 
                      <Mail className="w-5 h-5 text-gray-400" />, null, 'institute@example.com')}
                    
                    {renderFormField('phone', 'Phone Number', 'tel', 
                      <Phone className="w-5 h-5 text-gray-400" />, null, '10-digit phone number')}
                    
                    {renderFormField('alternatePhone', 'Alternate Phone', 'tel', 
                      <Phone className="w-5 h-5 text-gray-400" />, null, 'Optional')}
                    
                    {renderFormField('website', 'Website URL', 'url', 
                      <Building2 className="w-5 h-5 text-gray-400" />, null, 'https://example.com')}
                  </div>
                </div>
              )}

              {/* Step 2: Address Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Address Details</h2>
                  </div>

                  <div className="space-y-6">
                    {renderFormField('address', 'Complete Address', 'textarea', 
                      <MapPin className="w-5 h-5 text-gray-400" />, null, 'Enter full address')}
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {renderFormField('city', 'City', 'text', 
                        <MapPin className="w-5 h-5 text-gray-400" />, null, 'Enter city name')}
                      
                      {renderFormField('state', 'State', 'select', 
                        <MapPin className="w-5 h-5 text-gray-400" />, indianStates, 'Select state')}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {renderFormField('pincode', 'Pincode', 'text', 
                        <MapPin className="w-5 h-5 text-gray-400" />, null, '6-digit pincode')}
                      
                      {renderFormField('country', 'Country', 'text', 
                        <MapPin className="w-5 h-5 text-gray-400" />, null, 'Country')}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Admin Account & Additional Info */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Admin Account Setup</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {renderFormField('adminName', 'Admin Full Name', 'text', 
                      <User className="w-5 h-5 text-gray-400" />, null, 'Enter admin name')}
                    
                    {renderFormField('adminDesignation', 'Designation', 'text', 
                      <User className="w-5 h-5 text-gray-400" />, null, 'e.g., Principal, Director')}
                    
                    {renderFormField('adminEmail', 'Admin Email', 'email', 
                      <Mail className="w-5 h-5 text-gray-400" />, null, 'admin@example.com')}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {renderFormField('password', 'Password', 'password', 
                      <Lock className="w-5 h-5 text-gray-400" />, null, 'Minimum 8 characters')}
                    
                    {renderFormField('confirmPassword', 'Confirm Password', 'password', 
                      <Lock className="w-5 h-5 text-gray-400" />, null, 'Re-enter password')}
                  </div>

                  {/* Additional Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {renderFormField('totalStudents', 'Total Students', 'number', 
                        <Users className="w-5 h-5 text-gray-400" />, null, 'Approximate count')}
                      
                      {renderFormField('totalFaculty', 'Total Faculty', 'number', 
                        <Users className="w-5 h-5 text-gray-400" />, null, 'Faculty count')}
                      
                      {renderFormField('departments', 'Number of Departments', 'number', 
                        <Building2 className="w-5 h-5 text-gray-400" />, null, 'Department count')}
                    </div>

                    {renderFormField('description', 'Institute Description', 'textarea', 
                      <FileText className="w-5 h-5 text-gray-400" />, null, 'Brief description about your institute (optional)')}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4 border-t pt-6">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and 
                        <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a> *
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.agreeTerms}</span>
                      </div>
                    )}

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeNewsletter}
                        onChange={(e) => handleInputChange('agreeNewsletter', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Subscribe to our newsletter for updates and insights
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`
                    px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2
                    ${currentStep === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
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
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2
                      ${isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      } text-white
                    `}
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
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@edufeedback.com" className="text-blue-600 hover:underline">
              support@edufeedback.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstiForm;