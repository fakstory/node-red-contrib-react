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

const react_ui = new InstallReact("react_ui");
react_ui.execute()
// const snw = new InstallReactAndNodered("snw");
// snw.execute()

console.log("Install Done")
