import React from 'react';
import useBookSearch from './useBookSearch';
const Test = (props) => {
  useBookSearch(query, pageNumber);
  return (
    <>
      <input type='text'></input>
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
