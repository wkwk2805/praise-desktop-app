// 액션 타입 정의
const CHECKED = "checked/CHOICE";
const UNCHECKED = "checked/UNCHECKED";

// 액션 생섬함수 정의
export const _checked = id => ({ type: CHECKED, id: id });
export const _unchecked = id => ({ type: UNCHECKED, id: id });

// **** 초기상태 정의
const initialState = [];

// **** 리듀서 작성
const checked = (state = initialState, action) => {
  switch (action.type) {
    case CHECKED:
      return state.concat(action.id);
    case UNCHECKED:
      let copyState = Object.assign(state, {});
      copyState = copyState.filter(e => e !== action.id);
      return copyState;
    default:
      return state;
  }
};

export default checked;
