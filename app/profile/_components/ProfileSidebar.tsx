"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Inbox,
  User,
  Lock,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Users,
} from "lucide-react";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import MyProfilePage from "./MyProfilePage";
import RequestsSent from "./RequestsSent";
import RequestsReceived from "./RequestsReceived";
import Friends from "./Friends";
import Messages from "../../(messages)/Messages";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
    { id: "friends", label: "Friends", icon: <Users size={20} /> },
    { id: "requests-sent", label: "Requests Sent", icon: <Send size={20} /> },
    {
      id: "requests-received",
      label: "Requests Received",
      icon: <Inbox size={20} />,
    },
    { id: "edit-profile", label: "Edit Profile", icon: <Edit2 size={20} /> },
    {
      id: "change-password",
      label: "Change Password",
      icon: <Lock size={20} />,
    },
  ];

  const componentsMap: Record<string, React.ReactNode> = {
    profile: <MyProfilePage />,
    messages: <Messages />,
    friends: <Friends />,
    "requests-sent": <RequestsSent />,
    "requests-received": <RequestsReceived />,
    "edit-profile": <EditProfile />,
    "change-password": <ChangePassword />,
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen min-h-screen bg-gray-100 rounded-2xl">
      {/* Sidebar */}
      <div
        className={`bg-white md:border-none border-t shadow-lg transition-all duration-300 ease-in-out w-full md:w-auto md:flex-shrink-0 ${
          collapsed ? "md:w-20" : "md:w-64"
        }`}
      >
        {/* Header */}
        <div className="p-4 items-center hidden md:flex justify-between border-b">
          <h2
            className={`text-xl font-semibold text-gray-800 ${
              collapsed ? "hidden" : ""
            }`}
          >
            Navigation
          </h2>
          <button
            onClick={toggleSidebar}
            className="hidden md:block px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 md:p-4">
          <ul className="flex md:flex-col justify-evenly gap-1 md:gap-2 md:overflow-x-visible pb-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`flex items-center p-2 md:p-3 rounded-lg transition-colors min-w-max md:w-full ${
                    activeItem === item.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${collapsed ? "md:justify-center" : "justify-start"}`}
                  title={item.label}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span
                    className={`ml-2 md:ml-3 font-medium text-sm md:text-base ${
                      collapsed ? "hidden md:hidden" : "hidden md:block"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-4 md:p-8 w-full overflow-y-auto min-h-0">

        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
          {menuItems.find((item) => item.id === activeItem)?.label ||
            "Dashboard"}
        </h1>
        {componentsMap[activeItem] || (
          <p>Select a menu item to view content.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
