import axios from "axios"
import type { VOTD } from "../../types/gamification"

const API_BASE_URL = "http://localhost:3000" // Replace with your actual API endpoint

export const votdService = {
  async getVOTDByDate(date: String): Promise<VOTD> {
    try {
        console.log("Calling getVOTDByDate", date);
      const response = await axios.get(`${API_BASE_URL}/votd/${date}`)
      return response.data
    } catch (error) {
      console.error("Error fetching VOTD:", error)
      throw error
    }
  },

  async getVOTDHistory(month: number, year: number): Promise<Record<string, VOTD>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/votd/history`, {
        params: { month, year },
      })
      console.log("Calling getVOTDHistory", month, year);
      return response.data
    } catch (error) {
      console.error("Error fetching VOTD history:", error)
      throw error
    }
  },

  async markVOTDAsRead(votdId: string): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/votd/${votdId}/complete`)
      console.log("Calling markVOTDAsRead", votdId);
    } catch (error) {
      console.error("Error marking VOTD as read:", error)
      throw error
    }
  },
}

