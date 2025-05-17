import api from "./api";
import type { Campaign, ApiResponse, LinkedInProfile } from "../types/types";

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get<ApiResponse<Campaign[]>>("/campaigns");
  return response.data.data;
};
export const fetchCampaign = async (id: string): Promise<Campaign> => {
  const response = await api.get<ApiResponse<Campaign>>(`/campaigns/${id}`);
  return response.data.data;
};

export const createCampaign = async (
  campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">
): Promise<Campaign> => {
  const response = await api.post<ApiResponse<Campaign>>(
    "/campaigns",
    campaign
  );
  return response.data.data;
};

export const updateCampaign = async (
  id: string,
  campaign: Partial<Campaign>
): Promise<Campaign> => {
  console.log("campaign", campaign);
  const response = await api.put<ApiResponse<Campaign>>(
    `/campaigns/${id}`,
    campaign
  );
  return response.data.data;
};

export const deleteCampaign = async (id: string): Promise<void> => {
  await api.delete(`/campaigns/${id}`);
};

export const generateMessage = async (
  profile: LinkedInProfile
): Promise<string> => {
  console.log("profile", profile);
  const response = await api.post<ApiResponse<{ message: string }>>(
    "/personalized-message",
    profile
  );
  console.log("response", response);
  return response?.data?.data?.message;
};
