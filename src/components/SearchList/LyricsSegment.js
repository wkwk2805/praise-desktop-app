import React from "react";
import { Image, Segment, Comment, Header, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";

const LyricsSegment = ({ id, path, title, content }) => {
  const checked = useSelector(state => state.checked);
  const shortContent = content => {
    if (content && content.length > 10) {
      return content.substring(0, 10) + "...";
    } else {
      return content;
    }
  };
  return (
    <Segment className={checked.includes(id) ? `pd5 cell-active` : `pd5 cell`}>
      <Image src={path ? path : "../public/image.png"} />
      <Comment>
        <Comment.Content>
          <Header as="h4" className="mg5">
            {title}
          </Header>
          <Comment.Text className="mg5">{shortContent(content)}</Comment.Text>
        </Comment.Content>
      </Comment>
      <div style={{ textAlign: "center" }}>
        <Button color="teal">수정</Button>
        <Button color="red">삭제</Button>
      </div>
    </Segment>
  );
};

export default LyricsSegment;
