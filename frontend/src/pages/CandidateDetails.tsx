import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/apiClient';
import { AISummaryCard } from '../components/AISummaryCard';
import { ScoreBadge } from '../components/ScoreBadge';

const CandidateDetails = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['candidate', id],
    // Fixed: Changed /regex/ to template string with id variable
    queryFn: async () => (await api.get(`/candidates/${id}`)).data,
  });

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{data.name}</h1>
          <p>{data.email}</p>
        </div>
        <div className="actions">
          {/* Fixed: All three Links changed from /regex/ to template strings */}
          <Link to={`/candidates/${id}/resume`}>View Resume</Link>
          <Link to={`/assignments/${id}`}>Assignment</Link>
          <Link to={`/review/${id}`}>Review Panel</Link>
        </div>
      </div>
      <AISummaryCard summary={data.summary} />
      <div className="card">
        <h3>Scores</h3>
        <div className="score-grid">
          {Object.entries(data.scores ?? {}).map(([key, value]) => (
            <div key={key} className="score-item">
              <span>{key}</span>
              <ScoreBadge value={value as number} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;