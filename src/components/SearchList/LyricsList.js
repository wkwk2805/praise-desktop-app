import React, { useEffect, useState, useRef } from "react";
import { Segment, List, Button, Header, Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import DataBase from "../../utility/DataBase";
import { _unchecked } from "../../store/checked";
import PptSetting from "./PptSetting";
import { alertDialog, confirmDialog } from "../../utility/CustomDialog";
import fs from "fs";
import PublicPath from "../../utility/PublicPath";

const { shell } = window.require("electron").remote;

const DB = new DataBase();

const LyricsList = () => {
  const dirRef = useRef();
  const dispatch = useDispatch();
  const checked = useSelector(state => state.checked);
  const [items, setItem] = useState([]);
  useEffect(() => {
    setItem(DB.selectIdList(checked));
  }, [checked]);
  const downloadLyrics = () => {
    let files = items.filter(item => item.file).map(e => e.file);
    if (files.length === 0) {
      alertDialog("악보가 없습니다.");
      return;
    }
    alertDialog(
      "C://와 폴더란이 빈 상태에서 폴더선택을 누르지 마세요\n눌렀다면 Ctrl + Shift + R을 눌러주세요"
    );
    dirRef.current.click();
  };
  const _onChangeFile = e => {
    let file = e.target.files[0];
    let path = file && file.path;
    path = path && path.split("\\");
    path = path.length > 0 && path.filter(e => e !== file.name);
    path = path && path.join("\\");
    let files = items.filter(item => item.file).map(e => e.file);
    downloadLyricsDir(path, files);
  };
  const downloadLyricsDir = (path, files) => {
    let pathDir = path + `/악보모음${new Date().getTime()}`;
    fs.mkdirSync(pathDir);
    let fileBinarys = files.map(file => {
      return {
        name: file.name,
        binary: fs.readFileSync(PublicPath + file.path, "binary")
      };
    });
    fileBinarys.forEach(fileBinary => {
      fs.writeFileSync(
        pathDir + "/" + fileBinary.name,
        fileBinary.binary,
        "binary"
      );
    });
    if (!confirmDialog("악보 다운로드 성공, 폴더를 열까요?")) {
      shell.showItemInFolder(pathDir);
    }
  };
  return (
    <div className="sticky">
      <Segment>
        <Header as="h3">목록</Header>
        <List as="ol">
          {items.map((item, idx) => {
            return (
              <List.Item as="li" key={idx}>
                {item.title}{" "}
                <Button
                  className="removeIcon"
                  color="red"
                  onClick={() => {
                    dispatch(_unchecked(item.id));
                  }}
                >
                  x
                </Button>
              </List.Item>
            );
          })}
        </List>
        {items.length > 0 && (
          <div>
            <Header as="h5">다운로드</Header>
            <Button onClick={downloadLyrics}>악보</Button>
            <input
              type="file"
              ref={dirRef}
              style={{ display: "none" }}
              directory=""
              webkitdirectory=""
              onChange={_onChangeFile}
            />
            <PptSetting />
          </div>
        )}
      </Segment>
    </div>
  );
};

export default LyricsList;
