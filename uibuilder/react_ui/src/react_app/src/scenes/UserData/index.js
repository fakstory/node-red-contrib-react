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
	//uibuilder.test()


	//
		// NODE-RED MESSAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// uibuilder.onChange('msgsReceived',(newVal) =>{
		// 	console.info('New msg sent to us from Node-RED over Socket.IO.TotalCount:',newVal)
		// 	this.setState({
		// 	  msgReceived: newVal
		// 	})
		// })
	//
	// 	//IfSocket.IOconnects/disconnects
	// 	uibuilder.onChange('ioConnected',(newVal) =>{
	// 		console.info('Socket.IOConnectionStatusChanged:',newVal)
	// 		this.setState({
	// 		  webSocket: newVal
	// 		})
	// 	})
	//
	// 	//IfamessageissentbacktoNode-RED
	// 	uibuilder.onChange('msgsSent',(newVal) =>{
	// 		console.info('New msg sent to Node-RED over Socket.IO.TotalCount:',newVal)
	// 		this.setState({
	// 		  msgSent: newVal
	// 		})
	// 	})
	//
	// 	//IfwereceiveacontrolmessagefromNode-RED
	// 	uibuilder.onChange('msgsCtrl',(newVal) =>{
	// 		console.info('New control msg sent to us from Node-RED over Socket.IO.TotalCount:',newVal)
	// 		this.setState({
	// 		  controlMsgReceived: newVal
	// 		})
	// 	})
	//
	// 	//Manually send a message back to Node-RED after 2 seconds
	// 	window.setTimeout(function(){
	// 	console.info('Sending a message back to Node-RED-after2sdelay')
	// 	uibuilder.send({'topic':'uibuilderfe','payload':'I am a message sent from the uibuilder front end'})
	// 	},2000)
	//
	// }


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
