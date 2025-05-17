import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import CampaignList from "./components/CampaignList";
import MessageGenerator from "./components/MessageGenerator";
import ToastNotification from "./components/ToastNotification";

function App() {
  const [activeTab, setActiveTab] = useState<"management" | "generator">(
    "management"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastNotification />

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="bg-blue-600 h-6 w-6 rounded flex items-center justify-center mr-2">
                  <span className="text-white text-sm font-bold">Li</span>
                </span>
                <span className="hidden sm:block">
                  LinkedIn Campaign Manager
                </span>
                <span className="sm:hidden">Campaign</span>
              </h1>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
                <button
                  onClick={() => setActiveTab("management")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "management"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Campaign Management
                </button>
                <button
                  onClick={() => setActiveTab("generator")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "generator"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Message Generator
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } sm:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => setActiveTab("management")}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "management"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Campaign Management
            </button>
            <button
              onClick={() => setActiveTab("generator")}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "generator"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Message Generator
            </button>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === "management" ? <CampaignList /> : <MessageGenerator />}
      </main>
    </div>
  );
}

export default App;
