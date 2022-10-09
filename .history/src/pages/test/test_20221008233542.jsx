import useBookSearch from './useBookSearch';
import React, { useCallback, useRef, useState } from 'react';
const Test = (props) => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);
  const observer = useRef();
  const lastBookElementRef = useCallback();
  function handleSearch(e) {
    console.log(1);
    setQuery(e.target.value);
    setPageNumber(1);
  }
  console.log(books, error, loading);
  return (
    <>
      <input type='text' value={query} onChange={handleSearch}></input>
      {books &&
        books.map((book, i) => {
          if (books.length === i + 1) {
            return (
              <div ref={lastBookElementRef} key={book}>
                {book}
              </div>
            );
          } else {
            return <div key={book}>{book}</div>;
          }
        })}

      <div>{loading && 'loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
};

export default Test;
