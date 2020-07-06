//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, '/dist/elx-front-end')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/elx-front-end/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

console.log('Node.js server has been started.');
console.log('Available under 127.0.0.1:8081 or 192.168.0.1:8081');
