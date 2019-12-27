import React from "react";
import { Image, Segment, Comment, Header, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { _checked, _unchecked } from "../../store/checked";
import ShowDetail from "./ShowDetail";
import DataBase from "../../utility/DataBase";
import { confirmDialog, alertDialog } from "../../utility/CustomDialog";
const DB = new DataBase();

const LyricsSegment = ({ id, path, title, content }) => {
  const checked = useSelector(state => state.checked);
  const dispatch = useDispatch();
  const shortContent = content => {
    if (content && content.length > 10) {
      return content.substring(0, 10) + "...";
    } else {
      return content;
    }
  };
  const remove = e => {
    e.stopPropagation();
    if (confirmDialog("삭제하면 되돌리수 없어요. 그래도 하실래요?")) return;
    if (DB.delete(id, path)) {
      alertDialog("삭제됬어요");
      window.location.reload();
    }
  };
  return (
    <Segment
      className={checked.includes(id) ? `pd5 cell-active` : `pd5 cell`}
      onClick={() => {
        checked.includes(id)
          ? dispatch(_unchecked(id))
          : dispatch(_checked(id));
      }}
    >
      <Image src={path ? "." + path : "../public/image.png"} />
      <Comment>
        <Comment.Content>
          <Header as="h4" className="mg5">
            {title}
          </Header>
          <Comment.Text className="mg5">{shortContent(content)}</Comment.Text>
        </Comment.Content>
      </Comment>
      <div style={{ textAlign: "center" }}>
        <ShowDetail cont="상세" id={id} />
        <Button color="red" onClick={e => remove(e)}>
          삭제
        </Button>
      </div>
    </Segment>
  );
};

export default LyricsSegment;
