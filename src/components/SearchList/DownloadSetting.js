import React from "react";
import { Button, Modal } from "semantic-ui-react";

const DownloadSetting = () => {
  const font = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <Modal trigger={<Button color="teal">PPT</Button>}>
      <Modal.Header>PPT설정하기</Modal.Header>
      <Modal.Content>
        글자크기 : <input type="text" placeholder="글자크기" />
        글자모양 :{" "}
        <select>
          {font.map(e => (
            <option>{e}</option>
          ))}
        </select>
        <Button>다운로드 후 열기</Button>
        <Button>다운로드 후 폴더열기</Button>
      </Modal.Content>
    </Modal>
  );
};

export default DownloadSetting;
