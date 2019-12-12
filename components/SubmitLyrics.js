import React from "react";
import { Button, Input, TextArea, Form, Header } from "semantic-ui-react";

const SubmitLyrics = () => {
  return (
    <Form>
      <Header as="h1">가사등록페이지</Header>
      <Form.Field>
        <Input type="text" placeholder="제목을 입력해 주세요" />
      </Form.Field>
      <Form.Field>
        <TextArea placeholder="내용을 입력해 주세요" cols="30" rows="15" />
      </Form.Field>
      <Form.Field>
        <Input type="file" />
      </Form.Field>
      <Form.Field style={{ textAlign: "right" }}>
        <Button>등록</Button>
      </Form.Field>
    </Form>
  );
};

export default SubmitLyrics;
