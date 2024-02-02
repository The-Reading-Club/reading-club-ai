import React from "react";

interface UnstyledExternalLinkProps {
  href: string;
}

const UnstyledExternalLink: React.FC<
  UnstyledExternalLinkProps & React.PropsWithChildren
> = ({ href, children }) => {
  return (
    <a
      // className="mt-0 px-8 py-1 bg-[#FFF] text-[#000] rounded hover:bg-[#FCF29A] rounded-full inline-flex items-center justify-center"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="reset-a-styles"
    >
      {children}
    </a>
  );
};

export default UnstyledExternalLink;
