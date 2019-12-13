import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Header } from "semantic-ui-react";

const Search = () => {
  const [windowSize, setWindowSize] = useState(innerHeight / 4);
  useEffect(() => {
    window.onresize = function() {
      setWindowSize(this.innerHeight / 4);
    };
  }, [windowSize]);
  return (
    <Form
      style={{
        marginTop: windowSize
      }}
    >
      <Form.Field>
        <Header as="h1">찬양을 검색해 주세요</Header>
        <input placeholder="검색..." />
      </Form.Field>
      <Button type="submit">검색</Button>
    </Form>
  );
};
export default Search;
