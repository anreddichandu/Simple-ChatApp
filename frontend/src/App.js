import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiPlus } from 'react-icons/fi';
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ThemeToggle from "./components/ThemeToggle";

function ShellLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen w-full flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      
      <div
        className={`fixed md:static h-full w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className='flex-1 flex flex-col h-full transition-all duration-300 ml-0'>
        
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="h-16 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3">
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isMobile ? 'Chat' : 'Chat Application'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </header>

        
        <main className="flex-1 overflow-hidden">
          <Routes>
            
            <Route path="/" element={<LandingRoute />} />
            
            <Route path="/chat/:sessionId" element={<ChatRoute />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}


function LandingRoute() {
  const navigate = useNavigate();

  const handleStartChat = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/new-chat');
      const data = await res.json();
      navigate(`/chat/${data.id}`);
    } catch (e) {
      console.error('Failed to start new chat', e);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-0">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Start a new chat
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Ask questions, explore ideas, or test the API-powered mock chat interface.
        </p>
        <button
          onClick={handleStartChat}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <FiPlus />
          <span>New Chat</span>
        </button>
      </div>
    </div>
  );
}


function ChatRoute() {
  return <ChatWindow />;
}


function App() {
  return <ShellLayout />;
}

export default App;
