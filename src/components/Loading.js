import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Loading = () => {
  const [styles, setstate] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    window.onresize = function() {
      setstate({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
  }, []);
  const isLoading = useSelector(state => state.loading);
  return (
    isLoading && (
      <div className="loading" style={styles}>
        <Loader
          active
          inline="centered"
          style={{ top: window.outerHeight / 2.5 }}
        />
      </div>
    )
  );
};

export default Loading;
