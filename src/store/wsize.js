// 액션 타입 정의
const CHANGE = "size/CHANGE";

// 액션 생섬함수 정의
export const changeSize = win => ({ type: CHANGE, win: win });

// **** 초기상태 정의
const initialState = {
  inWidth: window.innerWidth,
  inHeight: window.innerHeight,
  outWidth: window.outerWidth,
  outHeight: window.outerHeight
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
        outHeight: win.outerHeight
      };
      return state;
    default:
      return state;
  }
};

export default wsize;
