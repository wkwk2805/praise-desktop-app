import React, { useEffect } from "react";
import Search from "./Search";
import { HashRouter as Router, Route } from "react-router-dom";
import Menu from "./Menu";
import { Container } from "semantic-ui-react";
import SearchList from "./SearchList";
import SubmitLyrics from "./SubmitLyrics";
import UpdateLyrics from "./UpdateLyrics";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { changeSize } from "../store/wsize";
import fs from "fs";

const App = () => {
  if (fs.existsSync("./ppt/")) {
    fs.readdirSync("./ppt/").forEach(file => {
      var curPath = "./ppt/" + file;
      fs.unlinkSync(curPath);
    });
  }
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(changeSize(window));
    });
  }, []);
  return (
    <>
      <Loading />
      <Container>
        <Router>
          <Menu />
          <Route exact path="/" component={Search} />
          <Route path="/searchList" component={SearchList} />
          <Route path="/submitLyrics" component={SubmitLyrics} />
          <Route path="/updateLyrics/:id" component={UpdateLyrics} />
        </Router>
      </Container>
    </>
  );
};

export default App;
