import React, { useState, useEffect } from "react";
import { Row, FormGroup, Button, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Content from "./Content";
import CreateModal from "./CreateModal";
import Select from "react-select";

function ContentList(props) {
  const [contentData, setContentData] = useState([]);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isGetAll, setGetAll] = useState(false);
  const [contentSearch, setContentSearch] = useState(props.contentSearch);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    //Can put stuff that needs to happen on load here.
    props.showAll().then(res => {
      setContentInputRestrictions(res.data.restricted_input);
    });
  }, [props, contentInputRestrictions]);

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

  function doSetContentSearch(newContent, keyValue) {
    let getValue = [];
    newContent !== null &&
      newContent.map((item, index) => {
        return getValue.push(item.label);
      });
    let tempCon = contentSearch;
    tempCon[keyValue] = getValue;
    setContentSearch(tempCon);
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

  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
    console.log(window.location.hash);
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }

  return (
    <>
      <Container className="container-sm pl-5 pr-5 pt-2">
        <form onSubmit={handleSearch}>
          <Select
            autoFocus
            options={props.selectOptions}
            isMulti
            placeholder={"Search for Contracts by ID"}
            onChange={x => {
              doSetContentSearch(x, "external_contract_code");
            }}
            isLoading={isLoading & isSearching}
            isDisabled={isGetAll | (isSearching & isLoading)}
          />

          {json_array(contentSearch).map((item, index) => (
            /*ControlID must match useFormFields value*/

            <FormGroup
              key={"ContentSearch" + index}
              controlId={item[0]}
            ></FormGroup>
          ))}

          {(isLoading & isSearching) | isGetAll ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <>
              <Button type="submit" disabled={isGetAll}>
                Search
              </Button>
              <Button
                disabled={isGetAll && isSearching}
                onClick={e => {
                  handleSearch(e, true);
                }}
              >
                Show All
              </Button>
              <Button onClick={openModal}>Create New Contract</Button>
              <Link to="/Contract/Trips" className="btn btn-primary">
                View Trips
              </Link>
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
                onClick={props.onClick}
                modalName={props.modalName}
                key={index + "content"}
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
      <CreateModal
        modalName={"Create New Contract"}
        content={contentData}
        inputRestrictions={contentInputRestrictions}
        show={showModal}
        closeModal={closeModal}
        accessLevel={props.accessLevel}
        appProps={props.appProps}
        submitAction={editContent => {
          return props.contentEditSubmitAction(editContent);
        }}
      />
    </>
  );
}

export default ContentList;
