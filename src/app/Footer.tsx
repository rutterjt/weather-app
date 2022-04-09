import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-center p-8">
    <p className="text-sm font-bold">
      Copyright {new Date().getFullYear()},{' '}
      <a
        href="https://github.com/jonrutter"
        target="_blank"
        rel="noreferrer"
        className="no-underline hover:underline focus:underline"
      >
        Jon Rutter
      </a>
      .
    </p>
  </footer>
);
