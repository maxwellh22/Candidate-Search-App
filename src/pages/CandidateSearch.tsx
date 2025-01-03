import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    const rawUsers = await searchGithub();
    const detailedCandidates: Candidate[] = [];

    for (const user of rawUsers) {
      try {
        const userDetails = await searchGithubUser(user.login);

        if (!userDetails || userDetails.message === "Not Found") continue;

        detailedCandidates.push({
          name: userDetails.name || "N/A",
          username: userDetails.login,
          location: userDetails.location || "Unknown",
          email: userDetails.email || "Not provided",
          avatar_url: userDetails.avatar_url,
          html_url: userDetails.html_url,
          company: userDetails.company || "None",
        });
      } catch (error) {
        console.error(`Error fetching user details: ${error}`);
      }
    }

    setCandidates(detailedCandidates);
    setCurrentCandidate(detailedCandidates[0] || null);
    setLoading(false);
  };

  const handleSaveCandidate = () => {
    if (!currentCandidate) return;

    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    savedCandidates.push(currentCandidate);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));

    handleNextCandidate();
  };

  const handleNextCandidate = () => {
    const remainingCandidates = candidates.slice(1);
    setCandidates(remainingCandidates);
    setCurrentCandidate(remainingCandidates[0] || null);
  };

  if (loading) return <div>Loading candidates...</div>;
  if (!currentCandidate)
    return <div>No more candidates available to review!</div>;

  return (
    <main>
      <h1>Candidate Search</h1>
      <div className="table" style={{ textAlign: "center" }}>
        <img
          src={currentCandidate.avatar_url}
          alt={currentCandidate.username}
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            marginBottom: "1rem",
          }}
        />
        <h2>
          <strong>{currentCandidate.name}</strong>{" "}
          <em>({currentCandidate.username})</em>
        </h2>
        <p>Location: {currentCandidate.location}</p>
        <p>Email: {currentCandidate.email}</p>
        <p>Company: {currentCandidate.company}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button className="active" onClick={handleNextCandidate}>
            -
          </button>
          <button className="active" onClick={handleSaveCandidate}>
            +
          </button>
        </div>
      </div>
    </main>
  );
};

export default CandidateSearch;
