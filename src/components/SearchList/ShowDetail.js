import React, { useEffect, useState } from "react";
import { Button, Modal, Image, Header } from "semantic-ui-react";
import DataBase from "../../utility/DataBase";
const DB = new DataBase();
const ShowDetail = ({ cont, id }) => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setInfo(DB.selectDetail(id));
  }, [id]);
  return (
    <Modal
      trigger={
        <Button color="teal" onClick={e => e.stopPropagation()}>
          {cont}
        </Button>
      }
    >
      <Modal.Header>
        제목 : {info.title}
        <Button style={{ float: "right" }}>수정</Button>
      </Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src={(info.file && info.file.path) || "../public/image.png"}
        />
        <Modal.Description>
          <Header as="h4">입력창 사이즈 변경 가능</Header>
          <textarea style={{ width: "300px", height: "217px" }}>
            {info.content && info.content.map(e => e.statement).join("\n\n")}
          </textarea>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ShowDetail;
