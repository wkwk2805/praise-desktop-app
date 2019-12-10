import React from "react";
import Search from "./Search";
import { HashRouter as Router, Route } from "react-router-dom";
import Menu from "./Menu";
import { Container } from "semantic-ui-react";
import SearchList from "./SearchList";
import CheckViewList from "./CheckViewList";
import PopupView from "./PopupView";

const App = () => {
  return (
    <Container>
      <Router>
        <Menu />
        <Route exact path="/" component={Search} />
        <Route path="/search" component={Search} />
        <Route path="/searchList" component={SearchList} />
        <Route path="/checkViewList" component={CheckViewList} />
        <Route path="/popupView" component={PopupView} />
      </Router>
    </Container>
  );
};

export default App;
