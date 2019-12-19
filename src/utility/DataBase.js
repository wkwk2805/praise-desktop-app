// lowdb 호출
import Apply from "./Apply";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("lyrics.json");
const DB = low(adapter);

// 일단생성
DB.defaults({ lyrics: [] }).write();

class DataBase {
  async insert(data, fileInfo) {
    try {
      const apply = new Apply(DB);
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
  update(id) {
    try {
      DB.get("lyrics")
        .find({ id: id })
        .assign({ [changeKey]: changeValue })
        .write();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  delete(id) {
    try {
      DB.get("lyrics")
        .remove({ id: id })
        .write();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  selectAll() {
    try {
      return DB.get("lyrics").value();
    } catch (error) {
      console.error(error);
    }
  }
  selectIdList(arrayId) {
    try {
      const result = DB.get("lyrics")
        .filter(e => arrayId.includes(e.id))
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
