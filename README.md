# Example: ReactJS
This is a quick introduction on how you can use Node-red, uibuilder and react all together.

You can find a node-red-contrib-react template [here](https://github.com/fakstory/node-red-contrib-react/)

## 1. Install ReactJS & uibuilder using npm
Open a terminal/command prompt, cd to your node-red project

`npm install node-red-contrib-uibuilder reactjs --save`

## 2. Add reference for ReactJS to settings.js
Add the following to your ~/.node-red/settings.js file:

    uibuilder: {
        userVendorPackages: ['reactjs'],
        debug: true
    }

## 3. Init your uibuilder folder and create your reactjs project
a. Create a uibuilder node name it react_ui and deploy (you can choose automatic creation of .html and .css files)
b. 'cd uibuilder'
c. mkdir src
d. 'cd src'
e. Install react in here (https://reactjs.org/tutorial/tutorial.html)
`npm install -g create-react-app create-react-app my-app`
f. cd my-app
g. IMPORTANT, in your react package file, add "hostpage":"/react_ui"
h. In your setting file of node-red, add the following:
`uibuilder: { userVendorPackages: ['reactjs'], debug: true },`

## 4. Create the socket connection React Component
```
/*Reactstuff*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';

import uibuilder from '../../libs/uibuilder/uibuilderfe.js'

class UserData extends Component{
	constructor(props){
		super(props)

		this.state = {
			msg:'payload Hello World',
			UIBuilderVersion: '',
			webSocket : '',
			msgReceived : '',
			controlMsgReceived : '',
			msgSent : '',
			lastMsgReceived : '',
			lastCtlMsgReceived : '',
			lastMsgSent : ''
		}

		uibuilder.onChange('msg', (newVal) => {

			this.setState({
			  msg: newVal
			})
			this.forceUpdate();
			console.info("console.info: " + JSON.stringify(newVal))
		})


		uibuilder.onChange('msgsReceived',(newVal) =>{
			console.info('New msg sent to us from Node-RED over Socket.IO.TotalCount:',newVal)
			this.setState({
			  msgReceived: newVal
			})
			this.forceUpdate();
		})

		//IfSocket.IOconnects/disconnects
		uibuilder.onChange('ioConnected',(newVal) =>{
			console.info('Socket.IOConnectionStatusChanged:',newVal)
			this.setState({
			  webSocket: newVal
			})
			this.forceUpdate();
		})

		//IfamessageissentbacktoNode-RED
		uibuilder.onChange('msgsSent',(newVal) =>{
			console.info('New msg sent to Node-RED over Socket.IO.TotalCount:',newVal)
			this.setState({
			  msgSent: newVal
			})
			this.forceUpdate();
		})

		//IfwereceiveacontrolmessagefromNode-RED
		uibuilder.onChange('msgsCtrl',(newVal) =>{
			console.info('New control msg sent to us from Node-RED over Socket.IO.TotalCount:',newVal)
			this.setState({
			  controlMsgReceived: newVal
			})
			this.forceUpdate();
		})

	// 	//Manually send a message back to Node-RED after 2 seconds
	// 	window.setTimeout(function(){
	// 	console.info('Sending a message back to Node-RED-after2sdelay')
	// 	uibuilder.send({'topic':'uibuilderfe','payload':'I am a message sent from the uibuilder front end'})
	// 	},2000)
	}


	render(){
		return(

			<div ref="root"style={{height:"50vh"}}>
				<div>{'msg: ' + this.state.msg.payload}</div>
				<div>{'msg Received: ' + this.state.msgReceived}</div>
				<div>{'control MsgReceived: ' + this.state.controlMsgReceived}</div>
				<div>{'msg Sent: ' + this.state.msgSent}</div>
				<div>{'last Msg Received: ' + this.state.lastMsgReceived}</div>
				<div>{'last Ctl Msg Received: ' + this.state.lastCtlMsgReceived}</div>
				<div>{'last Msg Sent: ' + this.state.lastMsgSent}</div>

			</div>
		);

	}

	componentWillUnmount(){
		this.state.ui.destructor();
		this.state.ui=null;
	}

	shouldComponentUpdate(){
		//ascomponentisnotlinkedtotheexternaldata,thereisnoneedinupdates
		return false;
	}
}

export default UserData

```

## 5. Import the Component in your App.js
```
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
```

## 6. Overwrite your public/index.html with the following:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">

    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

    <title>React Ui</title>
  </head>
  <body>
	<div id="app">
		<h1>
			Welcome to REACT-UIbuilder for Node-RED!
		</h1>
	</div>
	<div id="root">
		<div id="app">
		</div>
	</div>
  </body>
</html>
```

## 7. Make a simlink for the build-dist folder
`node-red-project/node_modules/node-red-contrib-uibuilder/nodes/src'-> src/libs/uibuilder/`

## 8. Make a simlink for the uibuilder folder in the react project.
`my-app/build -> 'Node-red-project/uibuilder/uibuilderNodeName/dist`

## You can use this post-script.js after the installation of your node-red project.
change this line to match your react folder name:
`const react_ui = new InstallReact("react_ui")`

```
var fs = require('fs')
var process = require('process')

class InstallReact {
	constructor(uibuilderNodeName) {
		this.reactRelativePath = '\\uibuilder\\' + uibuilderNodeName + '\\src\\react_app\\'
		this.uibuilderDistRelativePath = '\\uibuilder\\' + uibuilderNodeName + '\\dist\\'
		this.uibuilderNodePath = '\\node_modules\\node-red-contrib-uibuilder\\nodes\\src\\'
		this.uibuilderFile = 'uibuilderfe.min.js'
	}

	createSymlink() {
	let err = "ok"
	console.log('TODO: Create symlink for uibuilderfe.min.js')
	console.log(process.cwd() + this.uibuilderNodePath)
	console.log(process.cwd() + this.reactRelativePath + 'libs/')

	fs.symlink(process.cwd() + this.uibuilderNodePath, process.cwd() + this.reactRelativePath + 'src/libs/uibuilder/', 'junction', function(err,stdout,stderr){
		console.log('err: ' + err)
		console.log('stdout: ' + stdout)
		console.log('stderr: ' + stderr)
		if (err == null){
			console.log('Symlink created')
		}
		})
	console.log('Create symlink for node-red dist folder')
	fs.symlink(process.cwd() + this.reactRelativePath + 'build/', process.cwd() + this.uibuilderDistRelativePath, 'junction', function(err,stdout,stderr){
		// console.log('err: ' + err)
		// console.log('stdout: ' + stdout)
		// console.log('stderr: ' + stderr)
		if (err == null){
			console.log('Symlink created')
		}
		})
	}

	installReact() {
		let stdout = "ok"

		var react = process.cwd() + this.reactRelativePath
		console.log('Installing ReactJS in cwd: ' + react);
		stdout = require('child_process').execSync('npm install', {cwd:react})
		if(stdout.status){
			console.log(stdout.status)
			process.exit()
		}
		stdout = require('child_process').execSync('npm run build', {cwd:react})
		if(stdout.status){
			console.log(stdout.status)
			process.exit()
		}
		return stdout
	}

	execute() {
		this.createSymlink()
		this.installReact()
	}
}

const react_ui = new InstallReact("react_ui")
react_ui.execute()
// const snw = new InstallReactAndNodered("snw");
// snw.execute()

console.log("Install Done")

```

# Note [Important]
TODO Need to fix line 161 in uibuilderfe.js (uibuilderfe.min.js)
For now, you can only comment the line manually... for the project to compile.
