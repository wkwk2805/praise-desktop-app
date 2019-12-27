import React, { useRef } from "react";
import { Button, Form } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Search = ({ history }) => {
  const wsize = useSelector(state => state.wsize);
  const searchRef = useRef();
  const _search = e => {
    e.preventDefault();
    history.push("/searchList?word=" + searchRef.current.value);
  };
  return (
    <Form
      style={{
        marginTop: wsize.inHeight / 3.5
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
