import React from "react";

function ExternalLink({ title, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-[2px] py-[2px] px-1 text-ink hover:text-[#0366d6] border-l-2 border-l-transparent hover:border-l-frost hover:shadow-xs hover:shadow-ocean/30 transition duration-300 ease hover:translate-x-1 w-max"
    >
      {title}
    </a>
  );
}

export default ExternalLink;
