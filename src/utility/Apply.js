import fs from "fs";

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
    const file = {};
    file["name"] = Object.assign(fileInfo.name, "");
    file["path"] =
      "./public/" +
      new Date().getTime() +
      "_" +
      fileInfo.name.replace(/ /gi, "");
    file["size"] = Math.ceil(fileInfo.size / 1024) + "KB";
    const buffer = await fileInfo.arrayBuffer();
    fs.writeFileSync(file.path, Buffer.from(buffer), "binary");
    return file;
  }
  // insert할 데이터 가져오기
  async getUpdateData(id, param, newFileInfo, oldFilePath) {
    const updateData = Object.assign(param, {});
    updateData["id"] = id;
    updateData["content"] = this.processContent(param.content);
    newFileInfo && (updateData["file"] = await this.processFile(newFileInfo));
    if (oldFilePath) {
      fs.unlinkSync(oldFilePath);
      delete updateData.oldFilePath;
    }
    return updateData;
  }
  getWords(word) {}
  getSearchInit() {
    // 여기를 어찌 처리해야 하는가????? 일단 가중치로 처리하면 될듯한데... ㄷㄷ...
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
    const resultArr = [];
    for (let i in ids) {
      let obj = {
        id: ids[i],
        title: titles[i],
        content: contents[i]
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
      });
      item.cnt = cnt;
    });
    const resultList = searchInitList
      .filter(e => e.cnt > 0)
      .sort((a, b) => b.cnt - a.cnt)
      .map(e => e.id);
    return resultList;
  }
}

export default Apply;
