const IconComponent = ({ id, width, height, className = "", fillColor }) => {
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
  
