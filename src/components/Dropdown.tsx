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
    <section className="w-full min-w-[250px] max-w-[450px] mx-auto bg-white/95 text-black rounded py-4 px-8 shadow-lg mb-4">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between"
      >
        <h2 className="mb-2 text-xl font-bold text-left">{title}</h2>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && <div>{children}</div>}
    </section>
  );
};
