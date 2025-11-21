import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiClient';
import { FileUploader } from '../components/FileUploader';

const AssignmentUpload = () => {
  const { candidateId } = useParams();
  const [repoUrl, setRepoUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    // Fixed: Changed /regex/ to template string with candidateId variable
    await api.post(`/assignments/${candidateId}/submit`, { repoUrl });
    setStatus('Assignment queued. Results will appear shortly.');
  };

  return (
    <div className="card">
      <h2>Assignment Submission</h2>
      {/* Fixed: Added file.name to complete the string template */}
      <FileUploader onUpload={(file) => setStatus(`Uploaded ${file.name}`)} />
      <input placeholder="Repo URL" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AssignmentUpload;