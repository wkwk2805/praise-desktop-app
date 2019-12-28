import React from "react";
import { Grid } from "semantic-ui-react";
import LyricsSegment from "./LyricsSegment";
import ReactHtmlParser from "react-html-parser";
import PublicPath from "../../utility/PublicPath";

const ViewContent = ({ state, columns }) => {
  return (
    <Grid container columns={columns}>
      {state.map((item, idx) => {
        return (
          <>
            {idx % columns === 0 && ReactHtmlParser('<div class="row pd5">')}
            <Grid.Column key={idx} className="pd5">
              <LyricsSegment
                id={item.id}
                path={item.file && PublicPath + item.file.path}
                title={item.title}
                content={item.content[0].statement}
                code={item.code}
              />
            </Grid.Column>
            {idx % columns === 0 && ReactHtmlParser("</div>")}
          </>
        );
      })}
    </Grid>
  );
};

export default ViewContent;
