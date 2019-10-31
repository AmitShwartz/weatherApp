import React from "react";
import { connect } from "react-redux";
import Loader from 'react-loader';
import { addFavorite, deleteFavorite, searchByCity } from "../../actions";
import { Card, Button, Grid, Icon, Image, Header } from 'semantic-ui-react';
import { isEmpty, isUndefined, find } from 'lodash'
import { toFahrenheit } from '../../helpers'

const days = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Fri", "Saturday"];
const iconsURL = 'https://developer.accuweather.com/sites/default/files/';

class Forecast extends React.Component {
  state = {
    fahrenheit: false
  }

  addFavorite = city => {
    this.props.addFavorite(city)
  }

  deleteFavorite = key => {
    this.props.deleteFavorite(key)
  }

  weatherIcon = icon => {
    return <Image
      verticalAlign='middle'
      size='small'
      src={`${iconsURL}${icon > 9 ? icon : `0${icon}`}-s.png`}
    />
  }

  degreesValues = value => {
    if (this.state.fahrenheit) {
      return toFahrenheit(value)
    }
    return value;
  }

  renderFiveDays = fiveDays => {
    return fiveDays.map((day) => {
      return (
        <Card color='teal' key={day.EpochDate}>
          <Card.Content>
            <Card.Header >
              {days[new Date(day.Date).getDay()]}
            </Card.Header>
            {this.weatherIcon(day.Day.Icon)}
            <Card.Description style={{ fontWeight: 'bold' }}>
              {this.degreesValues(day.Temperature.Minimum.Value)}
              {!this.state.fahrenheit ? <span>&#8451;</span> : <span>&#8457;</span>} -
              {this.degreesValues(day.Temperature.Maximum.Value)}
              {!this.state.fahrenheit ? <span>&#8451;</span> : <span>&#8457;</span>}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  renderAddButton = city => {
    return (
      <Button style={{ width: '100%' }} basic color='blue' onClick={() => this.addFavorite(city)}>
        <Icon name='heart' color='red' />
        Add to Favorites
    </Button>
    )
  }

  renderRemoveButton = key => {
    return (
      <Button style={{ width: '100%' }} basic color='red' onClick={() => this.deleteFavorite(key)}>
        <Icon name='trash' /> Remove from favorites
    </Button>
    )
  }

  renderForecast = ({ city, today, fiveDays }) => {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
        container
      >
        <Grid.Row columns={2} style={{ zIndex: 1 }}>
          <Grid.Column textAlign='left' >
            <Card>
              <Card.Content textAlign='center'>
                <Card.Header style={{ fontSize: '21px', fontWeight: 'bold' }}>{city.LocalizedName}</Card.Header>
                <Card.Meta> {city.Country.LocalizedName}</Card.Meta>
                <Card.Description>
                  <Header style={{ fontSize: '20px', fontWeight: 'bold' }} color='blue' >{this.degreesValues(today.Temperature.Metric.Value)}{!this.state.fahrenheit ? <span>&#8451;</span> : <span>&#8457;</span>}</Header>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign='right' >
            {
              this.props.favorites.length === 0 ? this.renderAddButton({ city: city, today: today }) :
                isUndefined(find(this.props.favorites, item => city.Key === item.city.Key)) ? this.renderAddButton({ city: city, today: today }) : this.renderRemoveButton(city.Key)
            }
            <Button
              color="black"
              style={{ width: '100%' }}
              onClick={() => this.setState({ fahrenheit: !this.state.fahrenheit })}
            >
              Show by {this.state.fahrenheit ? <span>&#8451;</span> : <span>&#8457;</span>}
            </Button>
          </Grid.Column>
        </Grid.Row >
        <Grid.Row columns={1} style={{ zIndex: 1 }}>
          <Grid.Column textAlign='center'>
            {this.weatherIcon(today.WeatherIcon)}
            <span>
              <Header style={{ fontSize: '26px', fontWeight: 'bold' }}>
                {today.WeatherText}
              </Header>
            </span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{ zIndex: 1 }}>
          <Card.Group centered>
            {this.renderFiveDays(fiveDays.DailyForecasts)}
          </Card.Group>
        </Grid.Row>
      </Grid>
    )

  }
  render() {
    const forecast = this.props.forecast;

    return (
      <>
        {
          !isEmpty(forecast) ?
            this.renderForecast(forecast) :
            <Loader color="#0099ff" zIndex={1} top="60%" left="50%" />
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { forecast } = state;
  return { favorites: Object.values(state.favorites), forecast };
};

export default connect(
  mapStateToProps,
  {
    addFavorite,
    deleteFavorite,
    searchByCity
  }
)(Forecast);

