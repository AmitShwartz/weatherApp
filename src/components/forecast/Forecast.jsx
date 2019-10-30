// components/forecast/Forecast.jsx
import React from "react";
import { connect } from "react-redux";
import { addFavorite, deleteFavorite, searchByCity } from "../../actions";
import { Card, Button, Grid, Icon, Image, Header } from 'semantic-ui-react';
import { isEmpty, isUndefined, find } from 'lodash'
import data from '../../data';

const days = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Fri", "Saturday"];

class Forecast extends React.Component {

  // componentDidMount(){
  //   this.props.searchByCity({city: 'tel aviv'})
  // }

  addFavorite = city => {
    this.props.addFavorite(city)
  }

  deleteFavorite = key => {
    this.props.deleteFavorite(key)
  }

  weatherIcon = icon => {
    return <Image verticalAlign='middle' size='small' src={`https://developer.accuweather.com/sites/default/files/${icon > 9 ? icon : `0${icon}`}-s.png`} />
  }

  renderFiveDays = fiveDays => {
    return fiveDays.map((day) => {
      return (
        <Card color='teal' key={day.EpochDate}>
          <Card.Content>
            <Card.Header >{days[new Date(day.Date).getDay()]}</Card.Header>
            {this.weatherIcon(day.Day.Icon)}
            <Card.Description>{day.Temperature.Minimum.Value}&#8451; - {day.Temperature.Maximum.Value}&#8451;</Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  renderAddButton = city => {
    console.log(city)
    return (
      <Button color='blue' onClick={() => this.addFavorite(city)}>
        <Icon name='heart' color='red' />
        Add to Favorites
    </Button>
    )
  }

  renderRemoveButton = key => {
    return (
      <Button color='red' onClick={() => this.deleteFavorite(key)}>
        <Icon name='trash' /> Remove from favorites
    </Button>
    )
  }

  renderForecast = forecast => {
    //const forecast = data.autoComplete;

    console.log(forecast)
    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
        container
      >
        <Grid.Row columns={2}>
          <Grid.Column textAlign='left' >
            <Card>
              <Card.Content textAlign='center'>
                <Card.Header style={{ fontSize: '21px', fontWeight: 'bold' }}>{forecast.city.LocalizedName}</Card.Header>
                <Card.Meta> {forecast.city.Country.LocalizedName}</Card.Meta>
                <Card.Description>
                  <Header style={{ fontSize: '20px', fontWeight: 'bold' }} color='blue' >{forecast.today.Temperature.Metric.Value}&#8451;</Header>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign='right' >
            {this.props.favorites.length === 0 ? this.renderAddButton({ ...forecast.city, ...forecast.today }) :
              isUndefined(find(this.props.favorites, item => forecast.city.Key === item.Key)) ? this.renderAddButton({ ...forecast.city, ...forecast.today }) : this.renderRemoveButton(forecast.city.Key)
            }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign='center'>
            {this.weatherIcon(forecast.today.WeatherIcon)}
            <span>
              <Header style={{ fontSize: '26px', fontWeight: 'bold' }}>{forecast.today.WeatherText}</Header>
            </span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row divided columns={5}>
          <Card.Group centered>
            {this.renderFiveDays(forecast.fiveDays.DailyForecasts)}
          </Card.Group>
        </Grid.Row>
      </Grid>
    )

  }
  render() {
    const forecast = this.props.forecast;

    return (
      < >
        {!isEmpty(forecast) ? this.renderForecast(forecast) : <></>}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { forecast } = state;
  console.log(forecast, Object.values(state.favorites))
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

