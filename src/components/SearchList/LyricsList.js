import React, { useEffect, useState } from "react";
import { Segment, List, Button, Header, Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import DataBase from "../../utility/DataBase";
import { _unchecked } from "../../store/checked";

const DB = new DataBase();

const LyricsList = () => {
  const dispatch = useDispatch();
  const checked = useSelector(state => state.checked);
  const [items, setItem] = useState([]);
  useEffect(() => {
    setItem(DB.selectIdList(checked));
  }, [checked]);
  return (
    <div className="sticky">
      <Segment>
        <Header as="h3">목록</Header>
        <List as="ol">
          {items.map((item, idx) => {
            return (
              <List.Item as="li" key={idx}>
                {item.title}{" "}
                <Button
                  className="removeIcon"
                  color="red"
                  onClick={() => {
                    dispatch(_unchecked(item.id));
                  }}
                >
                  x
                </Button>
              </List.Item>
            );
          })}
        </List>
        <Header as="h5">다운로드</Header>
        <Button>악보</Button>
        <Button>PPT</Button>
      </Segment>
    </div>
  );
};

export default LyricsList;
