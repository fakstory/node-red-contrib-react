# node-red-contrib-uibuilder-react
A React.js templated dashboard for Node-RED. Built on uibuilder.

#What is it?
node-red-contrib-uibuilder-react is built on uibuilder.
UIBuilder is used to deliver the page and manage the websocket communications.
Use React as normal (npm start in react_ui folder), and build when the site is ready. (npm run build) You can start node-red normally and see your react web page.

# How to use?
`npm install`
This will call the postintall.js script. The script will do the following:
1. Create a symlink of the uibuilder.min.js required for react to build correctly.
2. Create a symlink of the build folder in node-red/uibuilder/dist folder.
`npm start`



# To install from scratch
1. From scratch, install node-red and uibuilder.
2. Create a uibuilder node name it react_ui and deploy (you can choose automatic creation of .html and .css files)
3. 'cd uibuilder'
4. mkdir src
5. 'cd src'
6. Install react in here (https://reactjs.org/tutorial/tutorial.html)
npm install -g create-react-app
create-react-app my-app
7. cd my-applicable
8. IMPORTANT, in your react package file, add ``"hostpage":"/react_ui"``
9. In your setting file of node-red, add the following:
10. `uibuilder: {
        userVendorPackages: ['reactjs'],
        debug: true
    },`

## Important NOTE
	TODO Need to fix line 161 in uibuilderfe.js (uibuilderfe.min.js)
	For now, you can only comment the line manually... :\
