import Lottie from "lottie-react";
import loadingSpinner1 from "../assets/LoadingSpinner1.json";

export const LoadingAnimation = () => {
  const style = {
    width: `500px`,
    height: `400px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    padding: "0",
  };
  return (
    <div style={style}>
      <Lottie animationData={loadingSpinner1} loop={true} />
    </div>
  );
};
