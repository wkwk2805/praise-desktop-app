import fs from "fs";
import PptxGenJs from "pptxgenjs";
import { showLoading, hideLoading } from "../store/loading";
import PublicPath from "./PublicPath";
const { shell } = window.require("electron").remote;

class Apply {
  constructor(DB) {
    this.DB = DB;
  }
  // 들어온 내용 가공하기
  processContent(str) {
    if (!str) return;
    const strArr = str.split(/\n\n/);
    const arr = [];
    strArr.forEach((item, i) => {
      const obj = {};
      obj.paragraph = ++i;
      obj.statement = item;
      arr.push(obj);
    });
    return arr;
  }
  // 가장 최신 ID 가져오기
  getNextId() {
    let data = this.DB.get("lyrics")
      .orderBy("id", "desc")
      .value()[0];
    let id = 0;
    data && (id = Object.assign(data.id, 0));
    return ++id;
  }
  // insert할 데이터 가져오기
  async getInsertData(param, fileInfo) {
    const insertData = Object.assign(param, {});
    insertData["id"] = this.getNextId(this.DB);
    insertData["content"] = this.processContent(param.content);
    fileInfo && (insertData["file"] = await this.processFile(fileInfo));
    return insertData;
  }
  // 파일 가공
  async processFile(fileInfo) {
    let date = new Date().getTime();
    let filename = fileInfo.name.replace(/ /gi, "");
    const file = {};
    file["name"] = Object.assign(fileInfo.name, "");
    file["path"] = `/public/${date}_${filename}`;
    file["size"] = Math.ceil(fileInfo.size / 1024) + "KB";
    const buffer = await fileInfo.arrayBuffer();
    const pathFile = `${PublicPath}/public/${date}_${filename}`;
    fs.writeFileSync(pathFile, Buffer.from(buffer), "binary");
    return file;
  }
  // insert할 데이터 가져오기
  async getUpdateData(id, param, newFileInfo, oldFilePath) {
    const updateData = Object.assign(param, {});
    updateData["id"] = id;
    updateData["content"] = this.processContent(param.content);
    newFileInfo && (updateData["file"] = await this.processFile(newFileInfo));
    if (newFileInfo && oldFilePath) {
      fs.unlinkSync(oldFilePath);
      delete updateData.oldFilePath;
    }
    return updateData;
  }
  getSearchInit() {
    const ids = this.DB.get("lyrics")
      .map(e => e.id)
      .value();
    const titles = this.DB.get("lyrics")
      .map(e => e.title)
      .value();
    const contents = this.DB.get("lyrics")
      .map(e =>
        e.content
          .map(e => e.statement)
          .join("")
          .replace(/ /g, "")
          .replace(/\n/g, "")
      )
      .value();
    const codes = this.DB.get("lyrics")
      .map(e => e.code)
      .value();
    const resultArr = [];
    for (let i in ids) {
      let obj = {
        id: ids[i],
        title: titles[i],
        content: contents[i],
        code: codes[i]
      };
      resultArr.push(obj);
    }
    return resultArr;
  }
  // 검색관련 함수
  getSearchList(word) {
    let words = [];
    words = word.split(" ");
    let searchInitList = this.getSearchInit();
    searchInitList.forEach(item => {
      let cnt = 0;
      words.forEach(item2 => {
        if (item.title.toLowerCase().indexOf(item2.toLowerCase()) !== -1) {
          cnt += 2;
        }
        if (item.content.toLowerCase().indexOf(item2.toLowerCase()) !== -1) {
          cnt++;
        }
        if (item.code.toLowerCase().indexOf(item2.toLowerCase()) !== -1) {
          cnt++;
        }
      });
      item.cnt = cnt;
    });
    const resultList = searchInitList
      .filter(e => e.cnt > 0)
      .sort((a, b) => b.cnt - a.cnt)
      .map(e => e.id);
    return resultList;
  }
  // PPT 다운로드 함수
  downloadPpt(data, that, pathFile, dispatch) {
    // data 모양새는 [{id:'0#0#0', title:'요게뱃의 노래', content:"동그란 눈으로\n엄말 보고 있는"},{},{}]
    data = this.processPptData(data);
    let pptx = new PptxGenJs();
    pptx.setTitle("Hello world Title");
    pptx.setLayout({ name: "A3", width: 16.5, height: 11.7 });
    for (let item of data) {
      let slide = pptx.addNewSlide("MASTER");
      slide.back = "000000";
      slide.color = "FFFFFF";
      slide.addText(item.title, {
        fontSize: 14,
        h: 0.5,
        fontFace: "DX모던고딕RoundB"
      });
      slide.addText(item.content, {
        fontFace: "DX모던고딕RoundB",
        fontSize: 48,
        align: "center",
        valign: "top",
        w: "100%",
        h: 3,
        y: 1.8
      });
    }
    this.pptxSave(pptx, that, pathFile, dispatch);
  }
  pptxSave(pptx, that, pathFile, dispatch) {
    dispatch(showLoading());
    pptx.save(
      "NODE_PPT",
      arrayBuffer => {
        fs.writeFileSync(pathFile, Buffer.from(arrayBuffer), "binary");
        switch (that) {
          case "file":
            shell.openItem(pathFile);
            dispatch(hideLoading());
            return;
          case "dir":
            shell.showItemInFolder(pathFile);
            dispatch(hideLoading());
            return;
          default:
            return;
        }
      },
      "arraybuffer"
    );
  }
  processPptData(data) {
    let titles = data.map(e => e.title);
    let contents = data.map(e => e.content.map(e => e.statement));
    let array = [];
    for (let i in titles) {
      contents[i].forEach(item => {
        let content = "";
        item.split("\n").forEach((jtem, j) => {
          let obj = { title: titles[i] };
          if (j % 2 !== 0) {
            content += jtem;
            obj.content = content;
            array.push(obj);
          } else if (
            (item.split("\n").length - 1) % 2 === 0 &&
            j === item.split("\n").length - 1
          ) {
            obj.content = jtem;
            array.push(obj);
          } else {
            content = jtem + "\n";
          }
        });
      });
    }
    return array;
  }
}

export default Apply;
