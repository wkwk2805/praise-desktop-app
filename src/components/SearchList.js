import React, { useEffect, useState } from "react";
import LyricsList from "./SearchList/LyricsList";
import ViewContent from "./SearchList/ViewContent";
import SearchForm from "./SearchList/SearchForm";
import { Grid } from "semantic-ui-react";
import DataBase from "../utility/DataBase";
const DB = new DataBase();

const SearchList = ({ location }) => {
  const [state, setState] = useState([]);
  const [columns, setColumns] = useState(3);
  const [width, setWidth] = useState(12);
  const viewHandler = wid => {
    if (wid > 1200) {
      setColumns(5);
      setWidth(13);
    } else if (wid > 990) {
      setColumns(4);
      setWidth(12);
    } else {
      setColumns(3);
      setWidth(12);
    }
  };
  useEffect(() => {
    const word = new URLSearchParams(location.search).get("word") || false;
    const data = word ? DB.selectSearchList(word) : DB.selectAll();
    setState(data);
  }, []);
  useEffect(() => {
    let wid = window.innerWidth;
    viewHandler(wid);
    window.onresize = function() {
      wid = this.innerWidth;
      viewHandler(wid);
    };
  }, []);
  const _search = word => {
    setState(DB.selectSearchList(word));
  };
  return (
    <div>
      <SearchForm _search={_search} />
      <Grid columns={4} style={{ marginTop: "20px" }}>
        <Grid.Column width={width}>
          <ViewContent state={state} columns={columns} />
        </Grid.Column>
        <Grid.Column width={16 - width} className="pd5">
          <LyricsList />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SearchList;
