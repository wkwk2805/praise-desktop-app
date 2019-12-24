import React, { useEffect, useState } from "react";
import { Button, Modal, Image } from "semantic-ui-react";
import DataBase from "../../utility/DataBase";
import { Link } from "react-router-dom";

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
        <Link to={`/updateLyrics/${id}`}>
          <Button style={{ float: "right" }} onClick={e => e.stopPropagation()}>
            수정
          </Button>
        </Link>
      </Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src={(info.file && "." + info.file.path) || "../public/image.png"}
        />
        <Modal.Description>
          <textarea style={{ width: "300px", height: "300px" }} readOnly>
            {info.content && info.content.map(e => e.statement).join("\n\n")}
          </textarea>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ShowDetail;
