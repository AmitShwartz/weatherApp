// components/forecast/Search.jsx

import React from "react";
import { connect } from "react-redux";
import { searchByCity } from "../../actions";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";


class Search extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) return <Message error={true} content={error} />;
  };

  //called in <Field>(redux-form tag) and render the input by the props
  //input is a field in the <Field> tag that handle the input behind the scenes
  renderInput = ({ title, type, placeholder, input, meta }) => {
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
          {...input}
        />
        {this.renderError(meta)}
      </>
    );
  };

  //called by props.handleSubmit(redux-form properties)
  onSubmit = formValues => {
    this.props.searchByCity(formValues);
  };

  render() {

    return (

      <>
        <Header as="h2" color="blue" textAlign="center">
          search city forecast
        </Header>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form
              size="large"
              error
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Segment stacked>
                <Field
                  name="city"
                  type="text"
                  title="Enter city name only latters"
                  placeholder="City"
                  component={this.renderInput}
                />
                <Button color="blue" fluid size="large" type="submit">
                  <Icon name="search"></Icon>Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.city) errors.city = "You must enter a city";
  if (!(/^([A-Za-z ]{0,})$/.test(formValues.city))) errors.city = "You must enter letters only";

  return errors;
};

const formWarrped = reduxForm({
  form: "searchByCity",
  validate
})(Search);

export default connect(
  null,
  { searchByCity }
)(formWarrped);
