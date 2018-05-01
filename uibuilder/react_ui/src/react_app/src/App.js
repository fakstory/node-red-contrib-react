import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserData from './scenes/UserData'


class App extends Component {
  render() {
	return (
		<div className="App">
			<UserData title="User Data">
			</UserData>
		</div>
	);
  }
}
export default App;
