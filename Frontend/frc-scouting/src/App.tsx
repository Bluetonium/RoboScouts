// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './home-page/home-page';
import TeamSearch from './team-search/team-search';
import Team from './team/team';
import DataCollection from './data-collection/data-collection';
import DataAnalysis from './data-analysis/data-analysis';
import TeamAnalysis from './team-analysis/team-analysis';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './404/404';
import TaC from './terms-and-conditions/terms-and-conditions';
import PrivacyPolicy from './privacy-policy/privacy-policy';
import ContactUs from './contact-us/contact-us';
import AboutUs from './about-us/about-us';
import GetStarted from './get-started/get-started';

const App = () => {
  return (
    <Router>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/team-search" element={<TeamSearch />} />
        <Route path="/tools/team-search/team" element={<Team />} />

        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/scouting/data-collection" element={<DataCollection />} />

        <Route path="/analysis/data-analysis" element={<DataAnalysis />} />
        <Route path="/analysis/team-analysis" element={<TeamAnalysis />} />

        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/legal/terms-and-conditions" element={<TaC />} />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal/contact-us" element={<ContactUs />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;


