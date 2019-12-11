import React from "react";
import LyricsList from "./SearchList/LyricsList";
import ViewContent from "./SearchList/ViewContent";
import SearchForm from "./SearchList/SearchForm";
import { Grid } from "semantic-ui-react";

const SearchList = () => {
  return (
    <div>
      <SearchForm />
      <Grid columns={4} style={{ marginTop: "20px" }}>
        <Grid.Column width={12}>
          <ViewContent />
        </Grid.Column>
        <Grid.Column width={4} className="pd5">
          <LyricsList />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SearchList;
