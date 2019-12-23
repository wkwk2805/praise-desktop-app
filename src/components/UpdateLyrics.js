import React, { useState, useEffect } from "react";
import { Button, Input, TextArea, Form, Header } from "semantic-ui-react";
import DataBase from "../utility/DataBase";
import { alertDialog } from "../utility/CustomDialog";
import { useParams } from "react-router-dom";
const DB = new DataBase();

const SubmitLyrics = ({ history }) => {
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({});
  const [showFile, setShowFile] = useState(false);
  const [oldFilePath, setOldFilePath] = useState("");
  useEffect(() => {
    const res = DB.selectDetail(id * 1);
    setUpdateData({
      title: res.title,
      content: res.content.map(e => e.statement).join("\n\n"),
      file: res.file
    });
    setOldFilePath(res.file && res.file.path);
  }, [id]);
  const settingData = e => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const _submit = async () => {
    // validation check
    if (!updateData.title || updateData.title.replace(/ /gi, "") === "") {
      alertDialog("제목이 없어요 ㅠㅠ");
      return;
    }
    if (!updateData.content || updateData.content.replace(/ /gi, "") === "") {
      alertDialog("내용이 없어요 ㅠㅠ");
      return;
    }
    const file = document.getElementById("file");
    const newFileInfo = file && file.files[0];
    if (newFileInfo && newFileInfo.type.indexOf("image") === -1) {
      alertDialog("파일은 이미지파일만 가능해요 ㅠㅠ");
      return;
    }
    // update Data
    if (await DB.update(id * 1, updateData, newFileInfo, oldFilePath)) {
      alertDialog("데이터가 잘 들어갔어요");
      history.push("/searchList");
    }
  };
  return (
    <Form>
      <Header as="h1">가사수정페이지</Header>
      <Form.Field>
        <Input
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요"
          onChange={settingData}
          value={updateData.title}
        />
      </Form.Field>
      <Form.Field>
        <TextArea
          placeholder="내용을 입력해 주세요"
          name="content"
          cols="30"
          rows="15"
          onChange={settingData}
          value={updateData.content}
        />
      </Form.Field>
      <Form.Field>
        {updateData.file ? (
          showFile ? (
            <div>
              <Input type="file" id="file" onChange={settingData} />
              <Button
                onClick={() => {
                  setShowFile(false);
                }}
              >
                취소
              </Button>
            </div>
          ) : (
            <div>
              {updateData.file.name}{" "}
              <Button
                onClick={() => {
                  setShowFile(true);
                }}
              >
                파일수정
              </Button>
            </div>
          )
        ) : (
          <Input type="file" id="file" onChange={settingData} />
        )}
      </Form.Field>
      <Form.Field style={{ textAlign: "right" }}>
        <Button onClick={_submit}>수정</Button>
      </Form.Field>
    </Form>
  );
};

export default SubmitLyrics;
