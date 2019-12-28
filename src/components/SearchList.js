import React, { useEffect, useState } from "react";
import LyricsList from "./SearchList/LyricsList";
import ViewContent from "./SearchList/ViewContent";
import SearchForm from "./SearchList/SearchForm";
import { Grid } from "semantic-ui-react";
import DataBase from "../utility/DataBase";
import { useSelector, useDispatch } from "react-redux";
import { changeSize } from "../store/wsize";
const DB = new DataBase();

const SearchList = ({ location }) => {
  const dispatch = useDispatch();
  const wsize = useSelector(state => state.wsize);
  const [word, setWord] = useState(
    new URLSearchParams(location.search).get("word") || false
  );
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
    viewHandler(wsize.inWidth);
  }, [wsize]);
  useEffect(() => {
    const data = word ? DB.selectSearchList(word) : DB.selectAll();
    setState(data);
  }, [word]);
  useEffect(() => {
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop;
      let docHeight = document.getElementById("root").clientHeight;
      let winHeight = window.innerHeight;
      // 여기에 값을 넣어주면 끝
      if (scrollTop === docHeight - winHeight) {
        const data = word
          ? DB.selectSearchList(word, state.length)
          : DB.selectAll(state.length);
        setState(state.concat(data));
      }
      dispatch(changeSize(window));
    };
  }, [state]);
  const _search = word => {
    setWord(word);
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
