import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiClient';

const ResumeViewer = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['resume', id],
    queryFn: async () => {
      // Fixed: Changed /regex/ to template string with id variable
      const res = await api.get(`/candidates/${id}`);
      return res.data;
    },
  });

  return (
    <div className="card">
      <h2>Resume Text</h2>
      <pre>{data?.resumeText ?? 'Resume parsing in progress...'}</pre>
    </div>
  );
};

export default ResumeViewer;