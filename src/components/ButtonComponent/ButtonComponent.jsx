import PropTypes from "prop-types";
import styles from "./ButtonComponent.module.scss";

const ButtonComponent = ({ text, color, backgroundColor, onClick }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || "rgba(64, 123, 255, 1)",
    color: color || "rgba(255, 255, 255, 1)",
  };

  return (
    <button className={styles.button} style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonComponent;
