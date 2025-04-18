const API_BASE = 'http://localhost:3000/summaries'

export const getAllSummaries = async () => {
  try {
    const response = await fetch(`${API_BASE}/getAllSummaries`);
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching summaries:', error)
    return {success: false, error: error.message };
  }
};

export const addSummary = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/addSummary`, {
      method: 'POST',
      body: formData
    });
    if(!response.ok) throw new Error('Network response not working');
    return await response.json();
  } catch (error) {
    console.error('Error adding summary:', error);
    return {success: false, error: error.message };
  }
}