import React from "react";
import { connect } from "react-redux";
import { searchByCity, searchByGeoposition } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { isUndefined } from 'lodash';
import {
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Menu
} from "semantic-ui-react";

class Search extends React.Component {
  state = {
    active: 'City'
  }
  
  renderError = ({ error, touched }) => {
    if (touched && error) return <Message error={true} content={error} />;
  };

  renderInput = ({ title, type, placeholder, input, meta, action, step }) => {
    const isError = meta.error && meta.touched ? true : false;

    return (
      <>
        <Form.Input
          error={isError}
          fluid
          iconPosition="left"
          type={type}
          title={title}
          placeholder={placeholder}
          step={step}
          action={action}
          {...input}
        />
        {this.renderError(meta)}
      </>
    );
  };

  onSubmit = formValues => {
    this.state.active==='City' ?
      this.props.searchByCity(formValues) :
      this.props.searchByGeoposition(`${formValues.latitude},${formValues.longitude}`)
  };

  handleItemClick = (e, { name }) => this.setState({ active: name })

  render() {
    return (
      <>
        <Header as="h2" color="blue" textAlign="center">
          Forecast
        </Header>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, zIndex: 1 }}>
            <Menu attached='top' tabular>
              <Menu.Item
                name='City'
                active={this.state.active === 'City'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='Geoposition'
                active={this.state.active === 'Geoposition'}
                onClick={this.handleItemClick}
              />
            </Menu>
            <Segment attached='bottom'>
              <Form
                size="large"
                error
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                {this.state.active === 'City' ?
                  <Field
                    name="city"
                    type="text"
                    title="Search city forecast"
                    placeholder="Search by city"
                    action={{
                      color: "blue",
                      icon: "search"
                    }}
                    component={this.renderInput}
                  /> :
                  <>
                    <Field
                      name="latitude"
                      type="number"
                      title="latitude"
                      placeholder="latitude"
                      step="0.01"
                      component={this.renderInput}
                    />
                    <Field
                      name="longitude"
                      type="number"
                      title="longitude"
                      placeholder="longitude"
                      step="0.01"
                      action={{
                        color: "blue",
                        icon: "search"
                      }}
                      component={this.renderInput}
                    />
                  </>
                }
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!isUndefined(formValues.city)) {
    if (!(/^([A-Za-z ]{0,})$/.test(formValues.city))) errors.city = "Valid search by english letters only";
  } else {
    if (!formValues.latitude) errors.latitude = "You must enter latitude";
    if (!formValues.longitude) errors.longitude = "You must enter longitude";
    if (formValues.latitude < -90 || formValues.latitude > 90) errors.latitude = "Valid latitude values are -90 - 90";
    if (formValues.longitude < -180 || formValues.latitude > 180) errors.longitude = "Valid longitude values are -180 - 180";
  }
  return errors;
};

const formWarrped = reduxForm({
  form: "searchByCity",
  validate
})(Search);

export default connect(
  null,
  {
    searchByCity,
    searchByGeoposition
  }
)(formWarrped);