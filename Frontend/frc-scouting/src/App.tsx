// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './home-page/home-page';
import TeamSearch from './team-search/team-search';
import Team from './team/team';
import DataCollection from './data-collection/data-collection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-teams" element={<TeamSearch />} />
        <Route path="/team" element={<Team />} />
        <Route path="/data-collection" element={<DataCollection />} />
      </Routes>
    </Router>
  );
};

export default App;

