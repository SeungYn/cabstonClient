import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

export default function useBookSearch(query, pageNumber) {
  useEffect(() => {
    let cancel;
    axios({
      methos: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    }).then((res) => {
      console.log(res.data);
    });

    return () => cancel();
  }, [query, pageNumber]);
  return null;
}
