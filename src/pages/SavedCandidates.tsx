import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setCandidates(saved);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Potential Candidates</h1>
      {candidates.length === 0 ? (
        <p>No candidates have been saved yet!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.username}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={`${candidate.name || candidate.username}'s avatar`}
                    className="candidate-avatar-small"
                  />
                </td>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location || "Unknown"}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ) : (
                    "Not provided"
                  )}
                </td>
                <td>{candidate.company || "None"}</td>
                <td>{candidate.bio || "N/A"}</td>
                <td>
                  <button
                    className="reject-button"
                    onClick={() => {
                      const updatedCandidates = candidates.filter(
                        (c) => c.username !== candidate.username
                      );
                      setCandidates(updatedCandidates);
                      localStorage.setItem(
                        "savedCandidates",
                        JSON.stringify(updatedCandidates)
                      );
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
