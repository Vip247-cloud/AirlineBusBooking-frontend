import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';
import ResultSection from './components/ResultSection'; // ✅
import HeroSection from './components/HeroSection'; // ✅
import Footer from './components/Footer';
function App() {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (origin, destination) => {
    try {
      // const res = await fetch(`http://127.0.0.1:8000/api/airline/search-combined/?origin=${origin}&destination=${destination}`);
      const res = await fetch(`http://127.0.0.1:8000/api/airline/search-combined/?from=${origin}&to=${destination}`);
      const data = await res.json();
  
      setSearchResult(data); // This will have both `flights` and `buses`
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResult(null);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      <ResultSection result={searchResult} />
      <Footer />
    </div>
  );
}

export default App;
