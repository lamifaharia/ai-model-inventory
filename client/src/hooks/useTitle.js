import { useEffect } from 'react';


const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | ModelHub`;
    return () => { document.title = 'ModelHub'; };
  }, [title]);
};

export default useTitle;