import React from "react";
import { Image, Segment, Comment, Header } from "semantic-ui-react";

const LyricsSegment = ({ path, title, content }) => {
  return (
    <Segment className="pd5">
      <Image src={path ? "." + path : "../public/image.png"} />
      <Comment>
        <Comment.Content>
          <Header as="h4" className="mg5">
            {title}
          </Header>
          <Comment.Text className="mg5">{content}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Segment>
  );
};

export default LyricsSegment;
