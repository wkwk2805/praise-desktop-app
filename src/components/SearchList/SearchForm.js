import React, { useRef } from "react";
import { Button, Form } from "semantic-ui-react";
import { Header } from "semantic-ui-react";

const SearchForm = ({ _search }) => {
  const word = useRef();
  const prevSearch = () => {
    _search(word.current.value);
  };
  return (
    <Form>
      <Form.Field>
        <Header as="h1">찬양을 검색해 주세요</Header>
        <input placeholder="검색..." ref={word} />
      </Form.Field>
      <Form.Field style={{ textAlign: "right" }}>
        <Button onClick={prevSearch}>검색</Button>
      </Form.Field>
    </Form>
  );
};
export default SearchForm;
