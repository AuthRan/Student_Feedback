import { 
  GraduationCap, 
} from 'lucide-react';

function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
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
      </footer>
    </div>
  )
}

export default Footer
