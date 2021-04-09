import React from "react";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const OverlaySpinner = ({ isActive, text, children }) => {
  return (
    <div>
      <LoadingOverlay active={isActive} spinner={<BounceLoader />} text={text}>
        {children}
      </LoadingOverlay>
    </div>
  );
};

export default OverlaySpinner;
