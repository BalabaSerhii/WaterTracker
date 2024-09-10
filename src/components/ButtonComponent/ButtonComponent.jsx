import PropTypes from "prop-types";
<<<<<<< Updated upstream
import styles from "./ButtonComponent.module.scss";

const ButtonComponent = ({ text, color, backgroundColor, onClick }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || "rgba(64, 123, 255, 1)",
    color: color || "rgba(255, 255, 255, 1)",
  };

  return (
    <button className={styles.button} style={buttonStyle} onClick={onClick}>
=======
import styles from "./ButtonComponent.module.css";

const ButtonComponent = ({
  text,
  color = "rgba(255, 255, 255, 1)",
  backgroundColor = "rgba(64, 123, 255, 1)",
  onClick,
  ariaLabel,
  width,
}) => {
  const buttonStyle = {
    backgroundColor,
    color,
    width,
  };

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onClick={onClick}
      aria-label={ariaLabel || text}
    >
>>>>>>> Stashed changes
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
<<<<<<< Updated upstream
=======
  ariaLabel: PropTypes.string,
  width: PropTypes.string,
>>>>>>> Stashed changes
};

export default ButtonComponent;
