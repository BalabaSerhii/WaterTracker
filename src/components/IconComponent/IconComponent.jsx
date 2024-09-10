const IconComponent = ({ id, width, height, className = "", fillColor }) => {
<<<<<<< Updated upstream
  return (
    <svg
      className={className}
      style={{ background: "transparent" }}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <use
        style={{ fill: fillColor }}
        xlinkHref={`/src/assets/img/sprite.svg#icon-${id}`}
      />
    </svg>
  );
};

export default IconComponent;
=======
    return (
      <svg
        className={className}
        style={{ background: "transparent" }}
        width={width}
        height={height}
        aria-hidden="true"
      >
        <use
          style={{ fill: fillColor }}
          xlinkHref={`/src/assets/img/icons.svg#icon-${id}`}
        />
      </svg>
    );
  };
  
  export default IconComponent;
  
>>>>>>> Stashed changes
