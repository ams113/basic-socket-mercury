const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const permissionsPolicy = require('permissions-policy');
require('colors');

const { socketCtrl } = require('../controllers/sockets.controller');



class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        
        // Socket.io config 
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        // Paths
        this.paths  = { 
           //  auth:       [ '/api/auth', '../routes/auth.route' ],
        };
        
        // Middlewares
        this.middlewares();

        // Routes app
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
        // Helmet
        this.app.use(helmet());
        this.app.use(helmet.hidePoweredBy({ setTo: 'CULO 5.5'}));
        this.app.use(helmet.frameguard({ action: 'deny'}));

        // PermissionsPolicy
        /* this.app.use(permissionsPolicy({
            features: {
              fullscreen:   ['self'],
              microphone:   ['none'],               
              camera:       ['none'],
              geolocation:  ['none']               
            }
          })); */

        // CORS
        this.app.use( cors() );
 
        // Public directory
        this.app.use( express.static('public') );

    }

    routes() {
        
        // this.app.use( this.paths.auth[0],        require( this.paths.auth[1] ));
    }

    sockets() {

        this.io.on('connection', socketCtrl );
    };

    listen() {
        this.server.listen(this.port,
            () => console.log(`CORS-enabled server running at ${'http://localhost:'.yellow}${this.port.toString().yellow}`));
    }

}

module.exports = Server;