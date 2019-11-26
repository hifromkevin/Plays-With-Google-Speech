import React, { Component } from 'react';
import 'babel-polyfill';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      google: ''
    }
  }

  UNSAFE_componentWillMount() {
    this.getGoogz();
  }

  getGoogz = async() => {
    try {
      const res = await fetch('/googz');
      const data = await res.json();
      console.log('dataz', data)
      this.setState({
        google: data
      });

    } catch(err) {
      console.log('That ain\'t right...', err);
    }
  }

  lol = () => {
    console.log(this.state.google)
  }

  render() {
    if (!this.state.google) {
      return (
      <div>
        <p>No.</p>
        <a onClick={this.lol}>CLICK</a>
      </div>
      )
    }

    return (
      <div>
        <h1>{this.state.google}</h1>
        <p>Hi mom</p>
      </div>
    )
  }
}
