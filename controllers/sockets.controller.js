const { Socket } = require("socket.io");


const socketCtrl = ( socket ) => {

    console.log('client [connect]'.green, socket.id);

    socket.on('disconnect', () => {
        console.log('client [disconnect]'.yellow, socket.id);
    });

    socket.on('send-msg', ( payload, callback ) => {
        const id = 56789;
        callback( id );

        socket.broadcast.emit('send-msg', payload );
    });

};


module.exports = {
    socketCtrl
};