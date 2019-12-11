import React from "react";
import { Segment, List, Button, Header } from "semantic-ui-react";

const LyricsList = () => {
  return (
    <div className="sticky">
      <Segment>
        <Header as="h3">목록</Header>
        <List as="ol">
          <List.Item as="li">Signing Up</List.Item>
          <List.Item as="li">User Benefits</List.Item>
          <List.Item as="li">User Types</List.Item>
          <List.Item as="li">Deleting Your Account</List.Item>
        </List>
        <Header as="h5">다운로드</Header>
        <Button>악보</Button>
        <Button>PPT</Button>
      </Segment>
    </div>
  );
};

export default LyricsList;
