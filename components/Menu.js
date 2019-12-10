import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Menu = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/searchList">
        <Button>목록</Button>
      </Link>
      <Link to="/checkViewList">
        <Button>PPT</Button>
      </Link>
    </div>
  );
};

export default Menu;
