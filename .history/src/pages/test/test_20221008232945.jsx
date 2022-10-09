import React, { useState } from 'react';
import useBookSearch from './useBookSearch';
const Test = (props) => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);

  function handleSearch(e) {
    console.log(1);
    setQuery(e.target.value);
    setPageNumber(1);
  }
  console.log(books, error, loading);
  return (
    <>
      <input type='text' ref={query} onChange={handleSearch}></input>
      {books &&
        books.map((book) => {
          return <div key={book}>{book}</div>;
        })}

      <div>{loading && 'loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
};

export default Test;
