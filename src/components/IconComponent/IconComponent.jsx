import icon from '../../assets/img/icons.svg'

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
          href={`${icon}#icon-${id}`}
        />
      </svg>
    );
  };
  
  export default IconComponent;
  
