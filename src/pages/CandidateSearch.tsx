import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );

  useEffect(() => {
    const fetchCandidate = async () => {
      const candidates = await searchGithub();
      if (candidates.length > 0) {
        const detailedCandidate = await searchGithubUser(candidates[0].login);
        setCurrentCandidate(detailedCandidate);
      }
    };
    fetchCandidate();
  }, []);

  const handleRejectCandidate = () => {
    setCurrentCandidate(null);
  };

  const handleSaveCandidate = () => {
    const savedCandidates =
      JSON.parse(localStorage.getItem("savedCandidates") || "[]") || [];
    if (currentCandidate) {
      savedCandidates.push(currentCandidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    }
    setCurrentCandidate(null);
  };

  if (!currentCandidate) {
    return (
      <main>
        <h2 className="main-message">No more candidates available to review!</h2>
      </main>
    );
  }

  return (
    <main>
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img
          src={currentCandidate.avatar_url}
          alt={currentCandidate.username}
          className="candidate-avatar"
        />
        <div className="candidate-info">
          <h2>
            {currentCandidate.name || "N/A"} (
            <span>{currentCandidate.username}</span>)
          </h2>
          <p>Location: {currentCandidate.location || "Unknown"}</p>
          <p>Email: {currentCandidate.email || "Not provided"}</p>
          <p>Company: {currentCandidate.company || "None"}</p>
          <p>Bio: {currentCandidate.bio || "No bio available"}</p>
          <p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener">
              View GitHub Profile
            </a>
          </p>
        </div>
        <div className="button-group">
          <button className="reject-btn" onClick={handleRejectCandidate}>
            -
          </button>
          <button className="accept-btn" onClick={handleSaveCandidate}>
            +
          </button>
        </div>
      </div>
    </main>
  );
};

export default CandidateSearch;
