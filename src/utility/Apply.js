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
  getInsertData(param) {
    const insertData = Object.assign(param, {});
    insertData["id"] = this.getNextId(this.DB);
    insertData["content"] = this.processContent(param.content);
    return insertData;
  }
  // 파일 가공
  processFile(file) {
    file.name = "";
    file.id = ""; // 이름 + 시간 악보이름.jpg_201121411161011
    // 파일 업로드(fs.writeSync();) 사용
  }
}

export default Apply;
