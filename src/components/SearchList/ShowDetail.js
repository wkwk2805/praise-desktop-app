import React, { useEffect, useState } from "react";
import { Button, Modal, Image, Header } from "semantic-ui-react";
import DataBase from "../../utility/DataBase";
import ReactHtmlParser from "react-html-parser";

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
          {info.content &&
            ReactHtmlParser(
              info.content
                .map(e => e.statement.replace("\n", "<br/>"))
                .join("<p/><p/>")
            )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ShowDetail;
