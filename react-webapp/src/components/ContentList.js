import React, { useState, useEffect } from "react";
import { useFormFields } from "../libs/hookslib";
import {
  Row,
  FormGroup,
  FormControl,
  Button,
  Container,
  Spinner
} from "react-bootstrap";
import Content from "./Content";

function ContentList(props) {
  const [contentData, setContentData] = useState([]);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isGetAll, setGetAll] = useState(false);
  const [contentSearch, setContentSearch] = useFormFields(props.contentSearch);

  useEffect(() => {
    //Can put stuff that needs to happen on load here.
  }, []);

  function search() {
    props
      .SearchFunction(contentSearch)
      .then(res => {
        setContentData(JSON.parse(res.data.contentList));
        setContentInputRestrictions(res.data.restricted_input);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function show_all() {
    props
      .showAll()
      .then(res => {
        setContentData(JSON.parse(res.data.contentList));
        setContentInputRestrictions(res.data.restricted_input);
        setIsLoading(false);
        setSearching(false);
        setGetAll(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSearch(event, all = false) {
    event.preventDefault();
    setIsLoading(true);
    if (!all) {
      setSearching(true);
      search();
    } else {
      show_all();
      setGetAll(true);
    }
  }

  function json_array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key) {
      result.push([key, json[key]]);
    });
    return result;
  }

  return (
    <>
      <Container className="container-sm pl-5 pr-5 pt-2">
        <form onSubmit={handleSearch}>
          {json_array(contentSearch).map((item, index) => (
            /*ControlID must match useFormFields value*/

            <FormGroup key={"ContentSearch" + index} controlId={item[0]}>
              <FormControl
                autoFocus
                type="text"
                placeholder="Search for contract by ID" //TODO make display text based on contentsearch or something
                value={item[1].replace(/[*|":<>[\]{}`\\()';@&$]/, "")}
                onChange={setContentSearch}
              />
            </FormGroup>
          ))}

          {(isLoading & isSearching) | isGetAll ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <>
              <Button
                type="submit"
                isLoading={isLoading && isSearching}
                disabled={isGetAll}
              >
                Search
              </Button>
              <Button
                isLoading={isLoading && isGetAll}
                disabled={isGetAll && isSearching}
                onClick={e => {
                  handleSearch(e, true);
                }}
              >
                Show All
              </Button>
            </>
          )}
        </form>
      </Container>
      <br />
      {!isLoading && (
        <div className="content">
          <Row key="topRow" className="show-grid">
            {contentData.map((c, index) => (
              <Content
                key={index}
                appProps={props.appProps}
                Content={c}
                inputRestrictions={contentInputRestrictions}
                eventKeyIndex={index}
                submitAction={editContent => {
                  return props.contentEditSubmitAction(editContent);
                }}
                accessLevel={props.accessLevel}
              />
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

export default ContentList;
