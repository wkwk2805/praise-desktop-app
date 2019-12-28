import React from "react";
import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Loading = () => {
  const wsize = useSelector(state => state.wsize);
  const isLoading = useSelector(state => state.loading);
  return (
    isLoading && (
      <div
        className="loading"
        style={{
          width: wsize.inWidth,
          height: wsize.scrollTop + wsize.inHeight
        }}
      >
        <Loader
          active
          inline="centered"
          style={{ top: wsize.scrollTop + wsize.outHeight / 2.5 }}
        />
      </div>
    )
  );
};

export default Loading;
