import React, { Component } from 'react';
import { Button, Input, Row } from 'react-materialize';
import { reduxForm } from 'redux-form';
import { addFurniture } from '../../furniture/actions/furniture.action';

class AddFurnitureForm extends Component {
  render() {
    const { fields: {
      itemName, price, description, url, deliveryDate,
      }, handleSubmit, } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.props.addFurniture.bind(null, this.props.roomSelected)) }>
        <Row>
          <Input s={6} placeholder='Item'{ ...itemName } />
          <Input s={6} placeholder='Price'{ ...price } />
        </Row>
        <Row>
          <Input s={6} placeholder='Description'{ ...description } />
          <Input s={6} placeholder='URL'{ ...url } />
        </Row>
        <Row>
          <Input s={6} placeholder='Delivery Date' label='Date' { ...deliveryDate } />
        </Row>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'AddFurnitureForm',
  fields: ['itemName', 'price', 'description', 'url', 'deliveryDate', 'roomSelected'],
}, state => ({ roomSelected: state.roomSelected }), { addFurniture })(AddFurnitureForm);
