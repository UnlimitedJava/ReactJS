import { useState, useEffect } from 'react';

//When you have component logic that needs to be used by multiple components, 
//we can extract that logic to a custom Hook. Custom Hooks start with "use". Example: useFetch.
//customHook 디렉토리 아래의 useFetch.jsx가 custom hook역할을 한다.
//The fetch logic may be needed in other components as well, so we will extract that into a custom Hook.
const useFetch = (url) => {
   const [data, setData] = useState(null);

   useEffect(() => {
      fetch(url)
         .then((response) => response.json())
         .then((data) => setData(data));
   }, [url]);

   return [data];
}

export default useFetch;