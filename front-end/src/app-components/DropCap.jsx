import React from "react";

const defaultStyles = {
  container: {
    position: "relative",
  },
  dropCapContainer: {
    position: "relative",
    float: "left",
    width: "4rem", // container size
    height: "4rem",
    marginRight: "-0.5rem",
    marginBottom: "-1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "0",
    shapeOutside: "content-box",
    shapeMargin: "0.1rem", // Reduced shape margin to bring text closer
  },
  dropCapLetter: {
    fontSize: "3.75rem",
    lineHeight: "1",
    fontFamily: "Almendra SC, serif",
  },
};

const DropCap = ({
  children,
  containerStyle = {},
  dropCapStyle = {},
  color,
  backgroundColor,
  className = "",
}) => {
  if (typeof children !== "string") {
    console.warn("DropCap component expects a string as children");
    return children;
  }

  const firstChar = children.charAt(0);
  const restOfText = children.slice(1);

  const mergedDropCapStyle = {
    ...defaultStyles.dropCapLetter,
    ...(color && { color }),
    ...dropCapStyle,
  };

  const mergedContainerStyle = {
    ...defaultStyles.dropCapContainer,
    ...(backgroundColor && { backgroundColor }),
    ...containerStyle,
  };

  return (
    <div style={defaultStyles.container} className={className}>
      <div style={mergedContainerStyle}>
        <span style={mergedDropCapStyle}>{firstChar}</span>
      </div>
      {restOfText}
    </div>
  );
};

export default DropCap;
