import React, { useState, useRef } from "react";
import { Button, Input, TextArea, Form, Header } from "semantic-ui-react";
import DataBase from "../utility/DataBase";
import { alertDialog } from "../utility/CustomDialog";

const SubmitLyrics = () => {
  const fileRef = useRef();
  const [insertData, setInsertData] = useState({});
  const onChangeData = e => {
    setInsertData({ ...insertData, [e.target.name]: e.target.value });
  };
  const _submit = () => {
    if (!insertData.title || insertData.title.replace(/ /gi, "") === "") {
      alertDialog("제목이 없어요 ㅠㅠ");
      return;
    }
    if (!insertData.content || insertData.content.replace(/ /gi, "") === "") {
      alertDialog("내용이 없어요 ㅠㅠ");
      return;
    }
    const DB = new DataBase();
    if (DB.insert(insertData)) {
      alertDialog("데이터가 잘 들어갔어요");
      const fileInfo = document.getElementsByName("file")[0].files[0]; // 이렇게 해서 파일을 사용 arrayBuffer / Blob
      location.reload();
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
