import React from "react";

const Image = ({ src, width, height, className, altText }) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      className={className}
      alt={altText}
    />
  );
};

export default Image;
