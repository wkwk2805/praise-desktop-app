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
  getWords(word) {
    let words = [];
    words = word.split(" ");
    if (words.length > 0) {
      for (let i in words) {
        let obj = {};
        obj.weight = words.length - i;
        obj.word = words[i];
        words[i] = obj;
      }
    }
    return words;
  }
  // 검색관련 함수
  getSearchList(word) {
    let words = this.getWords(word);
    // 여기를 어찌 처리해야 하는가????? 일단 가중치로 처리하면 될듯한데... ㄷㄷ...
    this.DB.get("lyrics").map(e => e.title);
    console.log(words);
  }
}

export default Apply;
