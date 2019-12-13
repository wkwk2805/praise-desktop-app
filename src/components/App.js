import React from "react";
import Search from "./Search";
import { HashRouter as Router, Route } from "react-router-dom";
import Menu from "./Menu";
import { Container } from "semantic-ui-react";
import SearchList from "./SearchList";
import SubmitLyrics from "./SubmitLyrics";

const App = () => {
  return (
    <Container>
      <Router>
        <Menu />
        <Route exact path="/" component={Search} />
        <Route path="/searchList" component={SearchList} />
        <Route path="/submitLyrics" component={SubmitLyrics} />
      </Router>
    </Container>
  );
};

export default App;
