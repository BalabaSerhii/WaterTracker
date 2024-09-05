import WaterConsumptionTracker from "../../components/WaterConsumptionTracker/WaterConsumptionTracker.jsx";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater.jsx";
import css from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className={css.welcomepage}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
};

export default WelcomePage;
