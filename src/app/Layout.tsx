import React from 'react';

// components
import { Footer } from './Footer';
import { Background } from './Background';

// TODO: read weather loading from Layout and render loading spinner, to prevent ugly layout jumps

export const Layout: React.FC = ({ children }) => (
  <Background>
    <div className="py-8 px-6 min-h-[calc(100vh_-_6rem)] h-full md:px-8">
      <main className="max-w-[992px] mx-auto">{children}</main>
    </div>
    <Footer />
  </Background>
);
