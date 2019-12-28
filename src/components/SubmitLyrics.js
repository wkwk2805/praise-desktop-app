import React, { useState } from "react";
import { Button, Input, TextArea, Form, Header } from "semantic-ui-react";
import DataBase from "../utility/DataBase";
import { alertDialog } from "../utility/CustomDialog";

const SubmitLyrics = () => {
  const [insertData, setInsertData] = useState({});
  const settingData = e => {
    setInsertData({ ...insertData, [e.target.name]: e.target.value });
  };
  const _submit = async () => {
    // validation check
    if (!insertData.title || insertData.title.replace(/ /gi, "") === "") {
      alertDialog("제목이 없어요 ㅠㅠ");
      return;
    }
    if (!insertData.content || insertData.content.replace(/ /gi, "") === "") {
      alertDialog("내용이 없어요 ㅠㅠ");
      return;
    }
    const DB = new DataBase();
    const file = document.getElementsByName("file")[0];
    const fileInfo = file && file.files[0];
    if (fileInfo && fileInfo.type.indexOf("image") === -1) {
      alertDialog("파일은 이미지파일만 가능해요 ㅠㅠ");
      return;
    }
    // insert Data
    if (await DB.insert(insertData, fileInfo)) {
      alertDialog("데이터가 잘 들어갔어요");
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
          onChange={settingData}
        />
        <select name="code" onChange={settingData}>
          <option value="">Code</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </Form.Field>
      <Form.Field>
        <TextArea
          placeholder="내용을 입력해 주세요"
          name="content"
          cols="30"
          rows="15"
          onChange={settingData}
        />
      </Form.Field>
      <Form.Field>
        <Input type="file" name="file" onChange={settingData} />
      </Form.Field>
      <Form.Field style={{ textAlign: "right" }}>
        <Button onClick={_submit}>등록</Button>
      </Form.Field>
    </Form>
  );
};

export default SubmitLyrics;
