import React, { useRef, useState } from "react";
import { Button, Modal, Input } from "semantic-ui-react";
import Apply from "../../utility/Apply";
import DataBase from "../../utility/DataBase";
import { useSelector, useDispatch } from "react-redux";
import { alertDialog } from "../../utility/CustomDialog";

const DB = new DataBase();
const apply = new Apply();

const PptSetting = () => {
  const dispatch = useDispatch();
  const checked = useSelector(state => state.checked);
  const fileRef = useRef();
  const [that, setThat] = useState("");
  const downloadOpenFile = () => {
    alertDialog(
      "C://와 폴더란이 빈 상태에서 폴더선택을 누르지 마세요\n눌렀다면 Ctrl + Shift + R을 눌러주세요"
    );
    fileRef.current.click();
    setThat("file");
  };
  const downloadOpenDir = () => {
    alertDialog(
      "C://와 폴더란이 빈 상태에서 폴더선택을 누르지 마세요\n눌렀다면 Ctrl + Shift + R을 눌러주세요"
    );
    fileRef.current.click();
    setThat("dir");
  };
  const onChangeDir = e => {
    let file = e.target.files[0];
    let path = file && file.path;
    path = path && path.split("\\");
    path = path.length > 0 && path.filter(e => e !== file.name);
    path = path && path.join("\\");
    const data = DB.selectIdList(checked);
    const pathFile = path + "\\" + `가사모음${new Date().getTime()}.pptx`;
    apply.downloadPpt(data, that, pathFile, dispatch);
  };
  const fontStyle = [
    { key: "123", value: "123" },
    { key: "456", value: "456" },
    { key: "789", value: "789" }
  ];
  return (
    <Modal trigger={<Button color="teal">PPT</Button>}>
      <Modal.Header>PPT설정하기</Modal.Header>
      <Modal.Content>
        {/* <Input
          type="text"
          placeholder="글자크기"
          maxLength="3"
          ref={fontSizeRef}
        />
        <select ref={fontStyleRef}>
          {fontStyle.map(e => (
            <option value={e.key}>{e.value}</option>
          ))}
        </select> */}
        <input
          type="file"
          id="dir"
          ref={fileRef}
          directory=""
          webkitdirectory=""
          onChange={e => onChangeDir(e)}
          style={{ display: "none" }}
        />
        <Button onClick={downloadOpenFile}>다운로드 후 열기</Button>
        <Button onClick={downloadOpenDir}>다운로드 후 폴더열기</Button>
      </Modal.Content>
    </Modal>
  );
};

export default PptSetting;
