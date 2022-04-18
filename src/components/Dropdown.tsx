import React, { useState } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type Props = {
  title: string;
  openOnMount?: boolean;
};

/**
 * Renders a dropdown box.
 */
export const Dropdown: React.FC<Props> = ({ title, openOnMount, children }) => {
  const [open, setOpen] = useState(openOnMount);

  const toggle = () => setOpen((open) => !open);
  return (
    <section className="w-full min-w-[250px] max-w-[450px] mx-auto bg-gradient-to-br from-white/100 to-white/95 text-black rounded py-4 shadow-lg mb-4">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-8"
      >
        <h2 className="mb-2 text-xl font-bold text-left">{title}</h2>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && <div className="max-h-72 overflow-y-auto px-8 ">{children}</div>}
    </section>
  );
};
