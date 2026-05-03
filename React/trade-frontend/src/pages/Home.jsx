import { useState } from 'react';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import './Home.css';

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="home-page">
      {/* Page Loader */}
      <Loader />

      {/* Slide-in Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Section 1 — Header + News */}
      <SectionOne onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Section 2 — Description + Footer */}
      <SectionTwo />
    </div>
  );
}

export default Home;
