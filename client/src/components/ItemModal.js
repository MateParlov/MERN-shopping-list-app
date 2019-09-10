import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from './../actions/itemActions';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
    this.setState(state => {
      return { modal: !this.state.modal };
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(() => {
      return { [name]: value };
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };

    //Add item via addItem action
    this.props.addItem(newItem);

    this.setState({ modal: false, name: '' });
  };
  render() {
    return (
      <div>
        <Button
          onClick={this.toggle}
          color="dark"
          style={{ marginBottom: '2rem' }}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.item
  };
};

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
