import React, { useState, useEffect } from 'react';

const SearchAndLazyLoadComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from API
const fetchData = async (query) => {
  setLoading(true);
  try {
    const response = await fetch(`https://dummyjson.com/products`);
    const jsonData = await response.json();
    // Convert the object into an array of objects
    const productsArray = Object.keys(jsonData).map(key => jsonData[key]);
    setData(prevData => [...prevData, ...productsArray]);
    console.log("Data===============>"+data.title)
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};


  // Function to handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setData([]); // Clear previous search results
    if (query) {
      fetchData(query); // Fetch new data based on search query
    }
  };

  // Function to handle scroll
  const handleScroll = () => {
   
  };

  // useEffect hook to listen for scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures the effect only runs once

  // useEffect hook to fetch data when search query or page number changes
  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);




  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SearchAndLazyLoadComponent;
