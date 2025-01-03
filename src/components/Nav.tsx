const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/SavedCandidates" className="nav-link">
            Potential Candidates
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
