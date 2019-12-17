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
      "../public/" +
      new Date().getTime() +
      "_" +
      fileInfo.name.replace(/ /gi, "");
    file["size"] = Math.ceil(fileInfo.size / 1024) + "KB";
    const buffer = await fileInfo.arrayBuffer();
    fs.writeFileSync(file.path, Buffer.from(buffer), "binary");
    return file;
  }
}

export default Apply;
