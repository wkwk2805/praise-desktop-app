import React, { useState } from "react";
import { Button, Input, TextArea, Form, Header } from "semantic-ui-react";

const DataBase = require("../utility/DataBase");

const SubmitLyrics = () => {
  const [insertData, setInsertData] = useState({});
  const onChangeData = e => {
    setInsertData({ ...insertData, [e.target.name]: e.target.value });
  };
  const _submit = () => {
    const DB = new DataBase();
    console.log(DataBase);
    if (DB.insert(insertData)) {
      console.log("데이터 등록 성공");
    }
  };
  return (
    <Form>
      <Header as="h1">가사등록페이지</Header>
      <Form.Field>
        <Input
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요"
          onChange={onChangeData}
        />
      </Form.Field>
      <Form.Field>
        <TextArea
          placeholder="내용을 입력해 주세요"
          name="content"
          cols="30"
          rows="15"
          onChange={onChangeData}
        />
      </Form.Field>
      <Form.Field>
        <Input type="file" name="file" onChange={onChangeData} />
      </Form.Field>
      <Form.Field style={{ textAlign: "right" }}>
        <Button onClick={_submit}>등록</Button>
      </Form.Field>
    </Form>
  );
};

export default SubmitLyrics;
