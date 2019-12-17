import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LyricsSegment from "./LyricsSegment";
import DataBase from "../../utility/DataBase";
import ReactHtmlParser from "react-html-parser";

const ViewContent = () => {
  const [state, setState] = useState([]);
  const [columns, setColumns] = useState(3);
  useEffect(() => {
    const DB = new DataBase();
    const data = DB.selectAll();
    setState(data);
  }, []);
  useEffect(() => {
    window.onresize = function() {
      let wid = this.innerWidth;
      if (wid > 1000) {
        setColumns(5);
      } else if (wid > 800) {
        setColumns(4);
      } else {
        setColumns(3);
      }
    };
  }, []);
  return (
    <Grid container columns={columns}>
      {state.map((item, idx) => {
        return (
          <>
            {idx % columns === 0 && ReactHtmlParser('<div class="row pd5">')}
            <Grid.Column className="pd5">
              <LyricsSegment
                path={item.file && item.file.path}
                title={item.title}
                content={item.content[0].statement}
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
