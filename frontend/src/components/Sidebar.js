import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaPlus, FaSearch } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";

const API = "http://localhost:5000";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { sessionId } = useParams();

  useEffect(() => {
    fetch(`${API}/api/sessions`)
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  const createNewChat = async () => {
    const res = await fetch(`${API}/api/new-chat`);
    const data = await res.json();
    navigate(`/chat/${data.id}`);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarVariants = {
    open: { width: 260, transition: { duration: 0.3 } },
    closed: { width: 60, transition: { duration: 0.3 } }
  };

  const textVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const searchVariants = {
    open: { width: 200, opacity: 1, transition: { duration: 0.2 } },
    closed: { width: 0, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {isOpen && (
              <motion.h1 
                className="text-xl font-bold text-gray-800 dark:text-white"
                variants={textVariants}
              >
                My Account
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <FaBars />
          </button>
        </div>

        <motion.button
          onClick={createNewChat}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus />
          <AnimatePresence>
            {isOpen && (
              <motion.span variants={textVariants}>
                New Chat
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FaSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variants={searchVariants}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">

        <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <AnimatePresence>
            {isOpen && (
              <motion.span variants={textVariants}>Recent Chats</motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="space-y-1 px-2">

          {/** Show only the last few chats to avoid a very long list */}
          
          {filteredSessions.slice(-5).map((session) => (
            <NavLink
              key={session.id}
              to={`/chat/${session.id}`}
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md text-sm ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <BiMessageRounded className="flex-shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    className="ml-3 truncate"
                    variants={textVariants}
                  >
                    {session.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </div>
      </div>

     


      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <img
              src="https://ui-avatars.com/api/?name=A+Reddi+Chandu&background=4f46e5&color=fff&size=64"
              alt="A. Reddi Chandu avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div className="ml-3" variants={textVariants}>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">A. Reddi Chandu</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Free Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;