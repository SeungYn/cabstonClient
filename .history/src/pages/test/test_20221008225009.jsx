import React, { useState } from 'react';
import useBookSearch from './useBookSearch';
const Test = (props) => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  useBookSearch(query, pageNumber);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return (
    <>
      <input type='text' onChange={handleSearch}></input>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Loading...</div>
      <div>Error</div>
    </>
  );
};

export default Test;
