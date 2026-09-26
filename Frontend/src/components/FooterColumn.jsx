import React from "react";

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="block text-sm text-slate-400 transition hover:text-white"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterColumn;