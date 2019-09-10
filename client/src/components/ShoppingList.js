import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from './../actions/itemActions';
//brisat kasnije
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  handleRemoveItem = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    console.log(this.props);
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(item => {
              return (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.handleRemoveItem.bind(this, item._id)}
                    >
                      &times;
                    </Button>
                    {item.name}
                  </ListGroupItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ListGroup>
        <ListGroup>
          {/* Test ua redux */}
          <ListGroupItem>Test</ListGroupItem>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    item: state.item
  };
};

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
