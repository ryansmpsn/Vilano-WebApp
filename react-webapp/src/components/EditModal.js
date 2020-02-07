import React  from "react";
import { Button, Modal, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import Send from "./send";


export default class EditModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      modalName: props.modalName,
      show: props.show,
      content: props.content,
      Permissions: props.accessLevel,
      editContent: props.content,
      submitting: false,
    }
  }
  


  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return {
        show: props.show,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({submitting: true});
    Send.post("/UpdateContract", this.state.editContent, this.props)
    .then(res =>{
      //bla bla update our contract to reflect DB. 
      //TODO UPDATE CONTRACT TO REFLECT DB. 
      console.log(res);
    })
    .error(err => {
      console.log(err);
    });
    //.then()
  }

  render() {
    return(
      
      <Modal show={this.state.show} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit.bind(this)}>
              {this.state.editContent.map((item, index) =>
                item[0] != "DONOTSHOW" &&
                <FormGroup key={index}>
                  <ControlLabel>{item[0] + ": " + item[1]} </ControlLabel>
                  {/* Make this formcontrol tie to values for editing */}
                  {this.state.Permissions === "Write" && (
                    <FormControl type="text" 
                    value={item[3]}
                    onChange={(e) => {
                      var object = this.state.editContent;
                      var specials=/[*|\":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                      object[index][3] = e.target.value.replace(specials, "");
                      this.setState({ editContent: object });
                    }}
                    placeholder={item[1]}/>)}
                </FormGroup>
              )}
              {this.state.Permissions === "Write" && 
              (<LoaderButton
                  block
                  type="submit"
                  bsSize="large"
                  //isLoading={this.state.submitting}
                  disabled={this.state.submitting}
              >
              Save
              </LoaderButton>)}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>

    );
  }
}
