import Loader from "react-loader-spinner";
const Spinner = ({ visible }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: "40%",
      }}
    >
      <Loader
        visible={visible}
        type="TailSpin"
        color="#00BFFF"
        height={60}
        width={60}
      />
    </div>
  );
};

export default Spinner;
