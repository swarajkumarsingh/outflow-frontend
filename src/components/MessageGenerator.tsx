import { useState } from "react";
import { generateMessage } from "../services/campaignService";
import type { LinkedInProfile } from "../types/types";
import { toast } from "react-hot-toast";
import {
  Send,
  Copy,
  Loader,
  Pencil,
  User,
  Briefcase,
  Building,
  MapPin,
  FileText,
} from "lucide-react";

const MessageGenerator = () => {
  const [profile, setProfile] = useState<LinkedInProfile>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
  });

  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile.name || !profile.job_title) {
      toast.error("Please fill in at least name and job title");
      return;
    }

    setIsLoading(true);
    try {
      const message = await generateMessage(profile);
      setGeneratedMessage(message);
      toast.success("Message generated successfully");
    } catch (error) {
      toast.error("Failed to generate message");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Pencil className="text-blue-600" size={24} />
          LinkedIn Message Generator
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information Form */}
        <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            Profile Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <User size={16} className="mr-2 text-gray-400" />
                Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                placeholder="Tushar Singla"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="job_title"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Briefcase size={16} className="mr-2 text-gray-400" />
                Job Title <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                placeholder="Marketing Manager"
                value={profile.job_title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="company"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Building size={16} className="mr-2 text-gray-400" />
                Current Company
              </label>
              <input
                type="text"
                id="company"
                placeholder="Infosys"
                name="company"
                value={profile.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="location"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <MapPin size={16} className="mr-2 text-gray-400" />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Mumbai, India"
                value={profile.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="summary"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <FileText size={16} className="mr-2 text-gray-400" />
                Summary
              </label>
              <textarea
                id="summary"
                placeholder="Brief summary about your experience and interests"
                name="summary"
                rows={3}
                value={profile.summary}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Add details that will help create a personalized message
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Generate Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Message */}
        <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Generated Message
          </h2>

          {generatedMessage ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 resize-none"
                  value={generatedMessage}
                  onChange={(e) => setGeneratedMessage(e.target.value)}
                />
                <div className="absolute top-2 right-2">
                  <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {generatedMessage.length} characters
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 shadow-sm"
                >
                  <Copy size={18} />
                  Copy to Clipboard
                </button>

                <button
                  onClick={() => setGeneratedMessage("")}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Clear Message
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center py-16 px-6 text-center h-64">
              {isLoading ? (
                <>
                  <Loader
                    size={32}
                    className="text-blue-600 animate-spin mb-4"
                  />
                  <p className="text-gray-600 font-medium">
                    Crafting your personalized message...
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    This may take a few moments
                  </p>
                </>
              ) : (
                <>
                  <Send size={32} className="text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">
                    Your message will appear here
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Fill in the profile information and click "Generate Message"
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageGenerator;
