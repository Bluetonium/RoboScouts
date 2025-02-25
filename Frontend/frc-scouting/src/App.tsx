// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './home-page/home-page';
import TeamSearch from './team-search/team-search';
import Team from './team/team';
import DataCollection from './data-collection/data-collection';
import DataAnalysis from './data-analysis/data-analysis';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './404/404';

const App = () => {
  return (
    <Router>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/team-search" element={<TeamSearch />} />
        <Route path="/tools/team-search/team" element={<Team />} />
        <Route path="/scouting/data-collection" element={<DataCollection />} />
        <Route path="/analysis/data-analysis" element={<DataAnalysis />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;


