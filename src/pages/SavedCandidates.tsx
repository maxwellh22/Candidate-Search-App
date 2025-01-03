import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(storedCandidates);
  }, []);

  const handleRejectCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.username !== username
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <main>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={candidate.username || index}>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={candidate.avatar_url}
                    alt="Avatar"
                    style={{ borderRadius: "50%", width: "50px" }}
                  />
                </td>
                <td>
                  <strong>{candidate.name}</strong>{" "}
                  <em>({candidate.username})</em>
                </td>
                <td>{candidate.location}</td>
                <td>
                  <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                </td>
                <td>{candidate.company}</td>
                <td>
                  <button
                    className="active"
                    onClick={() => handleRejectCandidate(candidate.username)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default SavedCandidates;
