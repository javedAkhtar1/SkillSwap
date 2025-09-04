import React, { useState } from "react";
import { 
  MessageSquare, 
  Send, 
  Inbox, 
  User, 
  Lock, 
  ChevronLeft,
  ChevronRight,
  UserCog,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("profile"); 

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
    { id: "requests-sent", label: "Requests Sent", icon: <Send size={20} /> },
    { id: "requests-received", label: "Requests Received", icon: <Inbox size={20} /> },
    { id: "edit-profile", label: "Edit Profile", icon: <UserCog size={20} /> },
    { id: "change-password", label: "Change Password", icon: <Lock size={20} /> }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100 rounded-2xl">
      {/* Sidebar */}
      <div 
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && (
            <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeItem === item.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {menuItems.find(item => item.id === activeItem)?.label || "Dashboard"}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">
            This is the content for{" "}
            <span className="font-medium">
              {menuItems.find(item => item.id === activeItem)?.label}
            </span>
            . Select different items from the sidebar to navigate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;