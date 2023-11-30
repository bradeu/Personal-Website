import React, { createContext, useState, useContext } from 'react';

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState("/" ===  window.location.pathname ? "about" : window.location.pathname.slice(1, window.location.pathname.length));

  const handleSetActivePage = (pageName) => {
    setPage(pageName);
  };

  return (
    <PageContext.Provider value={{ page, handleSetActivePage }}>
      {children}
    </PageContext.Provider>
  );
};
