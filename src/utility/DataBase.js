// lowdb 호출
import Apply from "./Apply";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import fs from "fs";
import PublicPath from "./PublicPath";

// 경로를 맞추어줌
const adapter = new FileSync(`${PublicPath}/lyrics.json`);
const DB = low(adapter);
const apply = new Apply(DB);

// 일단생성
DB.defaults({ lyrics: [] }).write();

class DataBase {
  async insert(data, fileInfo) {
    try {
      const insertData = await apply.getInsertData(data, fileInfo);
      DB.get("lyrics")
        .push(insertData)
        .write();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  async update(id, data, newFileInfo, oldFilePath) {
    try {
      const updateData = await apply.getUpdateData(
        id,
        data,
        newFileInfo,
        oldFilePath
      );
      DB.get("lyrics")
        .find({ id: id })
        .assign(updateData)
        .write();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  delete(id, filePath) {
    try {
      DB.get("lyrics")
        .remove({ id: id })
        .write();
      filePath && fs.unlinkSync(filePath);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  selectAll(begin = 0) {
    try {
      return DB.get("lyrics")
        .slice(begin, begin + 20)
        .value();
    } catch (error) {
      console.error(error);
    }
  }
  selectIdList(arrayId, begin = 0) {
    try {
      const result = [];
      arrayId.forEach(item => {
        let res = DB.get("lyrics")
          .find(e => e.id === item)
          .value();
        result.push(res);
      });
      return result.slice(begin, begin + 20);
    } catch (error) {
      console.error(error);
    }
  }
  selectDetail(id) {
    const result = DB.get("lyrics")
      .find(e => e.id === id)
      .value();
    return result;
  }
  selectSearchList(word, begin) {
    const resultIdList = apply.getSearchList(word);
    return this.selectIdList(resultIdList, begin);
  }
}

export default DataBase;

/*
json 형태
    [
        {
            id:'',
            title:'',
            content:{
                paragraph:'',
                statement:''
            },
            file:{
                name:'',
                path:'',
                size:''
            }
            code:''
        }
    ]
*/
