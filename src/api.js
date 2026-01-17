const BASE_URL = "https://hyundai-intern-default-rtdb.asia-southeast1.firebasedatabase.app/";
const AUTH_SECRET = "1r0fMA7WwuTXl3OGLlAgQsl9ijG679c9iInozOnP";

const getAuthParam = () => `?auth=${AUTH_SECRET}`;

// Helper to get today's date string YYYY-MM-DD
export const getTodayStr = () => new Date().toISOString().split('T')[0];

export const api = {
  async getChecklists() {
    try {
      const response = await fetch(`${BASE_URL}/checklists.json${getAuthParam()}`);
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const data = await response.json();
      return data ? Object.entries(data).map(([key, value]) => ({ firebaseId: key, ...value })) : [];
    } catch (error) {
      console.error("Fetch Checklists Error:", error);
      return [];
    }
  },

  async submitChecklist(data) {
    try {
      // POST to append to list
      const response = await fetch(`${BASE_URL}/checklists.json${getAuthParam()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Submission Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Submit Error:", error);
      throw error;
    }
  },

  async deleteChecklist(firebaseId) {
    try {
      const response = await fetch(`${BASE_URL}/checklists/${firebaseId}.json${getAuthParam()}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Delete Error: ${response.statusText}`);
      return true;
    } catch (error) {
      console.error("Delete Error:", error);
      throw error;
    }
  },

  async getTodaySubmission() {
    const today = getTodayStr();
    // Implementation note: Ideally we use query params to filter server side, 
    // but without explicit index rules configured, filtering by child key might warn/fail or download all.
    // Given the scale of an intern project, downloading all is acceptable for now.
    const all = await this.getChecklists();
    return all.find(item => item.date === today);
  }
};
