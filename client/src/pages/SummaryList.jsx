import { useEffect, useState } from 'react';
import { getAllSummaries } from '../api/summariesApi';

export const SummaryList = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const API_BASE = 'http://localhost:5173'

  useEffect(() => {
    const fetchSummaries = async () => {
      const { success, summaries, error } = await getAllSummaries();
      if (success) {
        setSummaries(summaries);
      } else {
        setError(error);
      }
      setLoading(false);
    };

    fetchSummaries();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-error">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Study Summaries</h1>
      
      <div className="grid gap-6">
        {summaries.map((summary) => (
          <div key={summary._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{summary.date}</h2>
              <p>{summary.summary}</p>
              
              {/* Display image if exists */}
              {summary.image && (
                <div className="my-4">
                  <h3 className="font-semibold mb-2">Uploaded Image:</h3>
                  <img 
                    src={`${API_BASE}/summaries/image/${summary._id}`}
                    alt="Summary visual"
                    className="max-w-full h-auto max-h-60 rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none'; // Hide if image fails to load
                    }}
                  />
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>English</th>
                      <th>Jyutping</th>
                      <th>Characters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.keyTerms.map((term, index) => (
                      <tr key={index}>
                        <td>{term.eng}</td>
                        <td>{term.jyutpin}</td>
                        <td>{term.character}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};