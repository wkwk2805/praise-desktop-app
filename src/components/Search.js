import React, { useEffect, useState, useRef } from "react";
import { Button, Form } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import DataBase from "../utility/DataBase";
const DB = new DataBase();

const Search = ({ history }) => {
  const [windowSize, setWindowSize] = useState(innerHeight / 4);
  const searchRef = useRef();
  useEffect(() => {
    window.onresize = function() {
      setWindowSize(this.innerHeight / 4);
    };
  }, [windowSize]);
  const _search = e => {
    e.preventDefault();
    history.push("/searchList?word=" + searchRef.current.value);
  };
  return (
    <Form
      style={{
        marginTop: windowSize
      }}
    >
      <Form.Field>
        <Header as="h1">찬양을 검색해 주세요</Header>
        <input placeholder="검색..." ref={searchRef} />
      </Form.Field>
      <Button type="submit" onClick={_search}>
        검색
      </Button>
    </Form>
  );
};
export default Search;
