const { dialog } = window.require("electron").remote;

const CustomDialog = {
  alertDialog: message => {
    const dialogOptions = { type: "question", message };
    dialog.showMessageBoxSync(dialogOptions);
  },
  confirmDialog: message => {
    const dialogOptions = {
      type: "question",
      message,
      defaultId: 2,
      buttons: ["확인", "취소"]
    };
    return dialog.showMessageBoxSync(dialogOptions);
  },
  pptFileDialog: () => {
    let savePath = dialog.showSaveDialogSync({
      properties: ["openFile", "openDirectory"],
      filters: [{ name: "Power Point", extensions: ["pptx", "ppt"] }],
      defaultPath: "가사모음" + new Date().getTime()
    });
    return savePath;
  }
};

module.exports = CustomDialog;
