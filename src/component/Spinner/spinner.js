import Loader from "react-loader-spinner";
const Spinner = ({ visible }) => {
  return (
    <div style={{ marginLeft: "500px" }}>
      <Loader
        visible={visible}
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Spinner;
