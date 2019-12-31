// 액션 타입 정의
const CHANGE = "size/CHANGE";

// 액션 생섬함수 정의
export const changeSize = win => ({ type: CHANGE, win: win });

// **** 초기상태 정의
const initialState = {
  inWidth: window.innerWidth,
  inHeight: window.innerHeight,
  outWidth: window.outerWidth,
  outHeight: window.outerHeight,
  scrollTop: window.document.documentElement.scrollTop,
  docHeight: window.document.getElementById("root").clientHeight
};

// **** 리듀서 작성
const wsize = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      let win = action.win;
      state = {
        inWidth: win.innerWidth,
        inHeight: win.innerHeight,
        outWidth: win.outerWidth,
        outHeight: win.outerHeight,
        scrollTop: win.document.documentElement.scrollTop,
        docHeight: win.document.getElementById("root").clientHeight
      };
      return state;
    default:
      return state;
  }
};

export default wsize;
