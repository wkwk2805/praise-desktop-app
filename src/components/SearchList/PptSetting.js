import React, { useRef, useState } from "react";
import { Button, Modal, Input, Select } from "semantic-ui-react";
import fs from "fs";
import Apply from "../../utility/Apply";
import DataBase from "../../utility/DataBase";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../store/loading";

const DB = new DataBase();
const apply = new Apply();
const { shell } = window.require("electron").remote;

const PptSetting = () => {
  const dispatch = useDispatch();
  const checked = useSelector(state => state.checked);
  const fileRef = useRef();
  const [that, setThat] = useState("");
  const downloadOpenFile = () => {
    fileRef.current.click();
    setThat("file");
  };
  const downloadOpenDir = () => {
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
    const pptx = apply.downloadPpt(data);
    dispatch(showLoading());
    pptx.save(
      "NODE_PPT",
      arrayBuffer => {
        fs.writeFileSync(
          path + "\\" + "test.pptx",
          Buffer.from(arrayBuffer),
          "binary"
        );
      },
      "arraybuffer"
    );
    switch (that) {
      // file open
      case "file":
        shell.openItem(path + "\\" + "test.pptx");
        dispatch(hideLoading());
        return;
      // directory open
      case "dir":
        shell.showItemInFolder(path + "\\" + "test.pptx");
        dispatch(hideLoading());
        return;
      default:
        return;
    }
  };
  const font = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <Modal trigger={<Button color="teal">PPT</Button>}>
      <Modal.Header>PPT설정하기</Modal.Header>
      <Modal.Content>
        <Input type="text" placeholder="글자크기" maxLength="3" />
        <Select placeholder="글자모양" options={font} />
        <input
          type="file"
          ref={fileRef}
          directory=""
          webkitdirectory=""
          allowDirs=""
          style={{ display: "none" }}
          onChange={e => onChangeDir(e)}
        />
        <Button onClick={downloadOpenFile}>다운로드 후 열기</Button>
        <Button onClick={downloadOpenDir}>다운로드 후 폴더열기</Button>
      </Modal.Content>
    </Modal>
  );
};

export default PptSetting;
