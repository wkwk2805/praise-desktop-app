import React from "react";
import { Segment, List, Button, Header, Grid } from "semantic-ui-react";

const LyricsList = () => {
  return (
    <div className="sticky">
      <Segment>
        <Header as="h3">목록</Header>
        <List as="ol">
          <List.Item as="li">
            Signing Up{" "}
            <Button className="removeIcon" color="red">
              x
            </Button>
          </List.Item>
          <List.Item as="li">
            User Benefits
            <Button className="removeIcon" color="red">
              x
            </Button>
          </List.Item>
          <List.Item as="li">
            User Types
            <Button className="removeIcon" color="red">
              x
            </Button>
          </List.Item>
          <List.Item as="li">
            Deleting Your Account
            <Button className="removeIcon" color="red">
              x
            </Button>
          </List.Item>
        </List>
        <Header as="h5">다운로드</Header>
        <Button>악보</Button>
        <Button>PPT</Button>
      </Segment>
    </div>
  );
};

export default LyricsList;
