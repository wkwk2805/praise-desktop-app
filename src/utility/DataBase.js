// lowdb 호출
import Apply from "./Apply";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import fs from "fs";

const adapter = new FileSync("lyrics.json");
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
  selectAll() {
    try {
      return DB.get("lyrics")
        .slice(0, 15)
        .value();
    } catch (error) {
      console.error(error);
    }
  }
  selectIdList(arrayId, begin = 0) {
    try {
      const result = DB.get("lyrics")
        .filter(e => arrayId.includes(e.id))
        .slice(begin, begin + 15)
        .value();
      return result;
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
  selectSearchList(word) {
    const resultIdList = apply.getSearchList(word);
    return this.selectIdList(resultIdList);
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
