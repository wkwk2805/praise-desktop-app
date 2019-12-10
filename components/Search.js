import React from "react";
import { Button, Form } from "semantic-ui-react";

const Search = () => (
  <Form>
    <Form.Field>
      <label>Search</label>
      <input placeholder="Search" />
    </Form.Field>
    <Button type="submit">Search</Button>
  </Form>
);

export default Search;
