import React from "react";
import { Grid } from "semantic-ui-react";
import LyricsSegment from "./LyricsSegment";
const ViewContent = () => (
  <Grid container columns={3}>
    <Grid.Row className="pd5">
      <Grid.Column className="pd5">
        <LyricsSegment title="Title1" content="content1" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title2" content="content2" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title3" content="content3" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row className="pd5">
      <Grid.Column className="pd5">
        <LyricsSegment title="Title1" content="content1" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title2" content="content2" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title3" content="content3" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row className="pd5">
      <Grid.Column className="pd5">
        <LyricsSegment title="Title1" content="content1" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title2" content="content2" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title3" content="content3" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row className="pd5">
      <Grid.Column className="pd5">
        <LyricsSegment title="Title1" content="content1" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title2" content="content2" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title3" content="content3" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row className="pd5">
      <Grid.Column className="pd5">
        <LyricsSegment title="Title1" content="content1" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title2" content="content2" />
      </Grid.Column>
      <Grid.Column className="pd5">
        <LyricsSegment title="Title3" content="content3" />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ViewContent;
