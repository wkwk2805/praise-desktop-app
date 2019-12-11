import React from "react";
import { Grid, Image } from "semantic-ui-react";
import path from "path";

const ViewContent = () => (
  <Grid container columns={3} style={{ marginTop: "20px" }}>
    <Grid.Column>
      <Image src="../public/image.png" />
      안녕하세요
    </Grid.Column>
    <Grid.Column>
      <Image src="../public/image.png" />
      안녕하세요
    </Grid.Column>
    <Grid.Column>
      <Image src="../public/image.png" />
    </Grid.Column>
  </Grid>
);

export default ViewContent;
