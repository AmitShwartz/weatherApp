import React from 'react';
import { connect } from 'react-redux'
import { Header, Card, Button, Icon, Image } from 'semantic-ui-react';
import { deleteFavorite, searchByPos } from '../../actions'
import './Favorites.scss';

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
        <Card color='teal' key={item.city.Key}>
          <Card.Content onClick={() => this.props.searchByPos(item.city)} textAlign='center'>

            <Card.Header className='card-header'>{item.city.LocalizedName}</Card.Header>
            <Card.Meta>{item.city.Country.LocalizedName}</Card.Meta>
            {this.weatherIcon(item.today.WeatherIcon)}
            <Card.Description>
              <Header className='card-header' color='blue' >{item.today.Temperature.Metric.Value}&#8451;</Header>
            </Card.Description>
            <Card.Description>
              <Header style={{ fontSize: '18px' }} color='blue' >{item.today.WeatherText}</Header>
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign='center'>
            <Button basic color='red' onClick={() => this.removeItem(item.city.Key)}>
              <Icon name='trash' /> Remove
          </Button>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    const favorites = this.props.favorites;

    return (
      <>
        <Header as="h2" color="blue" textAlign="center">
          Favorites
        </Header>
        <Card.Group centered style={{ zIndex: 1 }}>
          {this.renderFavoritesList(favorites)}
        </Card.Group>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { favorites: Object.values(state.favorites) }; 
};

export default connect(
  mapStateToProps,
  {
    deleteFavorite,
    searchByPos
  }
)(Favorites);