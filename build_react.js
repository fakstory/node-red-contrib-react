var fs = require('fs')
var process = require('process')

let stdout = "ok"
stdout = require('child_process').execSync('npm run build', {cwd:react})
if(stdout.status){
	console.log(stdout.status)
	process.exit()
}
