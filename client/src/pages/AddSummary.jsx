import { useState } from 'react';
import { addSummary } from '../api/summariesApi';
import { useNavigate } from 'react-router-dom';
import { ImageUploader } from '../components/ImageUploader';


export const AddSummary = () => {
  const [formData, setFormData] = useState({
    date: '',
    summary: '',
    englishTerms: '',
    jyutpinTerms: '',
    characterTerms: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append single image if exists
      if (image) {
        formDataToSend.append('image', image); // Changed from 'images' to 'image'
      }

      console.log([...formDataToSend.entries()]);
      const { success, error } = await addSummary(formDataToSend);

      if (success) {
        navigate('/');
      } else {
        setError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Study Summary</h1>
      
      {error && (
        <div className="alert alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Date (DD/MM/YY)</span>
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="25/03/25"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
            placeholder="Today we learned about..."
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">English Terms (comma separated)</span>
          </label>
          <input
            type="text"
            name="englishTerms"
            value={formData.englishTerms}
            onChange={handleChange}
            placeholder="Happy New Year, wish you prosperity"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Jyutping Terms (comma separated)</span>
          </label>
          <input
            type="text"
            name="jyutpinTerms"
            value={formData.jyutpinTerms}
            onChange={handleChange}
            placeholder="san1nin4 faai3lok6, zuk1 nei5 faan4wing4"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Chinese Characters (comma separated)</span>
          </label>
          <input
            type="text"
            name="characterTerms"
            value={formData.characterTerms}
            onChange={handleChange}
            placeholder="新年快樂, 祝你繁榮"
            className="input input-bordered"
            required
          />
        </div>

        <ImageUploader 
          onImagesChange={setImage} 
          maxSizeMB={1} 
        />

        <button
          type="submit"
          className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Summary'}
        </button>
      </form>
    </div>
  );
}