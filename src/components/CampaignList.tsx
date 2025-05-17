import { useEffect, useState } from "react";
import {
  fetchCampaigns,
  deleteCampaign,
  updateCampaign,
} from "../services/campaignService";
import type { Campaign } from "../types/types";
import CampaignForm from "./CampaignForm";
import { toast } from "react-hot-toast";
import { Plus, Edit2, Trash2, Check, X, AlertTriangle } from "lucide-react";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("Failed to load campaigns", error);
      toast.error("Failed to load campaigns");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCampaign(id);
      toast.success("Campaign deleted successfully");
      setDeleteConfirm(null);
      loadCampaigns();
    } catch (error) {
      toast.error("Failed to delete campaign");
    }
  };

  const toggleStatus = async (campaign: Campaign) => {
    try {
      const newStatus = campaign.status === "active" ? "inactive" : "active";
      await updateCampaign(campaign.id, { status: newStatus });
      toast.success(`Campaign marked as ${newStatus}`);
      loadCampaigns();
    } catch (error) {
      toast.error("Failed to update campaign status");
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingCampaign(null);
    loadCampaigns();
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Campaign Management
        </h1>
        <button
          onClick={() => {
            setEditingCampaign(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base shadow-sm"
        >
          <Plus size={18} />
          <span>Create Campaign</span>
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8 bg-white rounded-lg shadow-lg p-5 border border-gray-100">
          <CampaignForm
            campaign={editingCampaign}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
          <div className="col-span-4">Name</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Actions</div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span>Loading campaigns...</span>
            </div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <AlertTriangle size={32} className="mb-2 text-gray-400" />
              <p className="font-medium">No campaigns found</p>
              <p className="text-sm mt-1">
                Create your first campaign to get started
              </p>
            </div>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {/* Mobile view */}
              <div className="md:hidden flex flex-col space-y-3 w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  <button
                    onClick={() => toggleStatus(campaign)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {campaign.status}
                  </button>
                </div>
                <p className="text-gray-600 text-sm">{campaign.description}</p>
                <div className="flex space-x-2 pt-1">
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <Edit2 size={16} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(campaign.id)}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>

                  {deleteConfirm === campaign.id && (
                    <div className="flex items-center space-x-2 ml-2">
                      <button
                        onClick={() => handleDelete(campaign.id)}
                        className="bg-red-100 text-red-700 p-1 rounded"
                        aria-label="Confirm delete"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="bg-gray-100 text-gray-700 p-1 rounded"
                        aria-label="Cancel delete"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop view */}
              <div className="hidden md:block col-span-4 font-medium text-gray-900">
                {campaign.name}
              </div>
              <div className="hidden md:block col-span-4 text-gray-600 truncate">
                {campaign.description}
              </div>
              <div className="hidden md:block col-span-2">
                <button
                  onClick={() => toggleStatus(campaign)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status === "active" ? (
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-gray-400 mr-1.5"></span>
                      Inactive
                    </span>
                  )}
                </button>
              </div>
              <div className="hidden md:flex col-span-2 space-x-2">
                <button
                  onClick={() => handleEdit(campaign)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(campaign.id)}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>

                {deleteConfirm === campaign.id && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="bg-red-100 text-red-700 p-1 rounded"
                      aria-label="Confirm delete"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="bg-gray-100 text-gray-700 p-1 rounded"
                      aria-label="Cancel delete"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignList;
