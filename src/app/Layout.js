import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="py-8 px-6 min-h-[calc(100vh_-_6rem)] h-full md:px-8">
      <main className="max-w-[992px] mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
