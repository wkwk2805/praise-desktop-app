// 액션 타입 정의
const SHOW = "loading/SHOW";
const HIDE = "loading/HIDE";

// 액션 생섬함수 정의
export const showLoading = () => ({ type: SHOW });
export const hideLoading = () => ({ type: HIDE });

// **** 초기상태 정의
const initialState = false;

// **** 리듀서 작성
const loading = (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      state = true;
      return state;
    case HIDE:
      state = false;
      return state;
    default:
      return state;
  }
};

export default loading;
