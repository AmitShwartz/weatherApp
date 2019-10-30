//favorites/Favorites.jsx

import React from 'react';
import { connect } from 'react-redux'
import { Header, Card, Button, Icon, Image } from 'semantic-ui-react';
import { deleteFavorite } from '../../actions'

class Favorites extends React.Component {

  removeItem = (key) => {
    this.props.deleteFavorite(key);
  }
  weatherIcon = icon => {
    return <Image size='small' src={`https://developer.accuweather.com/sites/default/files/${icon > 9 ? icon : `0${icon}`}-s.png`} />
  }
  renderFavoritesList = (favorites) => {
    return favorites.map(item => {
      return (
        <Card key={item.Key}>
          <Card.Content textAlign='center'>
          
            <Card.Header style={{ fontSize: '24px', fontWeight: 'bold' }}>{item.LocalizedName}</Card.Header>
            <Card.Meta>{item.Country.LocalizedName}</Card.Meta>
            {this.weatherIcon(item.WeatherIcon)}
            <Card.Description>
              <Header style={{ fontSize: '24px', fontWeight: 'bold' }} color='blue' >{item.Temperature.Metric.Value}&#8451;</Header>
            </Card.Description>
            <Card.Description>
              <Header style={{ fontSize: '18px' }} color='blue' >{item.WeatherText}</Header>
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign='center'>
            <Button basic color='red' onClick={() => this.removeItem(item.Key)}>
              <Icon name='trash' /> Remove
          </Button>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    const favorites = this.props.favorites;
    console.log(favorites)
    return (
      <>
        <Header as="h2" color="blue" textAlign="center">
          Favorites
        </Header>
        <Card.Group centered>
          {this.renderFavoritesList(favorites)}
        </Card.Group>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { favorites: Object.values(state.favorites) }; /// Object.values() is a bulid in javaScript function that accept an object and turn all his values to array  
};

export default connect(
  mapStateToProps,
  { deleteFavorite }
)(Favorites);