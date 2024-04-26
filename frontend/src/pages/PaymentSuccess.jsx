import { useSearchParams } from "react-router-dom";

const paymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  return (
    <div>
      paymentSuccess
      <div>
        <h1>{`Reference Number :${referenceNum}`}</h1>
      </div>
    </div>
  );
};

export default paymentSuccess;
