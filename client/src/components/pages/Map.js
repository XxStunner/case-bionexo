import React, { Component } from 'react';
import { Grid, Row, Col, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import DefaultHeader from "../headers/default";
import MapContainer from "../containers/map";

class Map extends Component {

  constructor(props){
    super(props);
    this.state = {
      address: '',
      loc: {
        lat: -23.5436227,
        lng: -46.6466107
      },
      intitutes: [],
      updateMap: false,
    }
  }

  componentDidMount(){
    this.searchBionexo();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.searchGoogle();
  };

  _renderPhone = (phone) => {
    let i = 0, v = phone.toString();
    switch(v.length){
      case 10:
        return '0## ####-####'.replace(/#/g, _ => v[i++]);
      case 8:
        return '####-####'.replace(/#/g, _ => v[i++]);
      default:
        return v;
    }
  }

  searchGoogle(){
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&address=${this.state.address}&language=pt-br&region=BR`)
    .then(res => {
      this.setState({loc:res.data.results[0].geometry.location, updateMap: true});
      this.searchBionexo();
    }).catch(err => console.log(err));
  }

  searchBionexo(){
    axios.get(`${process.env.REACT_APP_API_URL}/institutes/by_distance?query=${this.state.loc.lat},${this.state.loc.lng}`)
    .then(res => {
      this.setState({intitutes:res.data, updateMap: true});
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <MapContainer 
          className="map-w"
          coords={this.state.loc} 
          institutes={this.state.intitutes}
        />
        <DefaultHeader/>
          <Grid fluid>
            <Row >
              <Col className="pr-5" xs={6} md={4} lg={3}>
                <div className="search-w">
                  <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                      <InputGroup.Addon><Glyphicon glyph="glyphicon glyphicon-search" /></InputGroup.Addon>
                      <FormControl 
                        placeholder="Busca" 
                        value={this.state.address} 
                        onChange={(e) => this.setState({address:e.target.value, updateMap: false})}
                        type="text" 
                      />
                    </InputGroup>
                  </form>
                </div>
                <ul className="search-r">
                  {this.state.intitutes.map((institute, index) => (
                    <li key={index}>
                    <div className="institute-w">
                      <div className="institute-h">
                        <h2>{index + 1}.{institute.name}</h2>
                      </div>
                      <div className="institute-b">
                        <p>{institute.address} - {institute.city}</p>
                      </div>
                      <div className="institute-f">
                        <p><b>Telefone</b></p>
                        <p>{this._renderPhone(institute.phone)}</p>
                      </div>
                    </div>
                  </li>
                  ))}
                </ul>
              </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}

export default Map;