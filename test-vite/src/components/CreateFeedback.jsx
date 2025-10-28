import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const CreateCampaignForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDepartment, setTargetDepartment] = useState('');
  const [targetYear, setTargetYear] = useState('');
  const [questions, setQuestions] = useState(['']); // Start with one empty question
  const [deadline, setDeadline] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // --- Functions to manage the questions array ---
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  const removeQuestion = (index) => {
    if (questions.length <= 1) return; // Always keep at least one question
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError('Authentication error. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // <-- This sends your login token for verification
        },
        body: JSON.stringify({
          title,
          description,
          targetDepartment,
          targetYear,
          questions: questions.filter(q => q.trim() !== ''), // Filter out empty questions
          deadline,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Failed to create campaign.');
      }

      setSuccessMessage('Campaign created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setTargetDepartment('');
      setTargetYear('');
      setQuestions(['']);
      setDeadline('');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      // Hide messages after a few seconds
      setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 5000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Feedback Campaign</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
      {successMessage && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Campaign Title (e.g., 'Semester End Feedback')" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3 border rounded-lg" />
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-3 border rounded-lg" />
        </div>
        <textarea placeholder="Description (e.g., 'Feedback for all subjects in the 5th semester.')" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-3 border rounded-lg h-24"></textarea>
        
        {/* Target Audience */}
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Target Department (e.g., 'CSE')" value={targetDepartment} onChange={(e) => setTargetDepartment(e.target.value)} required className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Target Year (e.g., '3rd Year')" value={targetYear} onChange={(e) => setTargetYear(e.target.value)} required className="w-full p-3 border rounded-lg" />
        </div>

        {/* Dynamic Questions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Questions</h3>
          {questions.map((question, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <button type="button" onClick={() => removeQuestion(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="flex items-center space-x-2 text-blue-600 font-semibold p-2">
            <Plus size={20} />
            <span>Add Question</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t">
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
            {isLoading ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaignForm;
