import React from "react";
import ContentLoader from "react-content-loader";

const TableLoader = () => {
  return (
    <>
      <div className="table">
        <ContentLoader speed={2} viewBox="0 0 400 100">
          <rect x="0" y="0" ry="5" width="65" height="9" />
          <rect x="75" y="0" ry="5" width="65" height="9" />
          <rect x="150" y="0" ry="5" width="65" height="9" />
          <rect x="225" y="0" ry="5" width="65" height="9" />
          <rect x="300" y="0" ry="5" width="65" height="9" />
          <rect x="0" y="20" ry="5" width="100%" height="9" />
          <rect x="0" y="40" ry="5" width="100%" height="9" />
          <rect x="0" y="60" ry="5" width="100%" height="9" />
          <rect x="0" y="80" ry="5" width="100%" height="9" />
        </ContentLoader>
      </div>
    </>
  );
};
export default TableLoader;
