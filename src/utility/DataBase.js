// lowdb 호출
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Apply = require("./Apply");

class DataBase {
  create() {
    const adapter = new FileSync("lyrics.json");
    const DB = low(adapter);
    DB.defaults({ lyrics: [] }).write();
  }
  insert(data) {
    try {
      const apply = new Apply(DB);
      const insertData = apply.getInsertData(data);
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
}

module.exports = DataBase;

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
