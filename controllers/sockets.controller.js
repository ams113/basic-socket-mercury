const TicketCtrl = require("../models/ticket-ctrl");

const ticketCtrl = new TicketCtrl();


const socketCtrl = ( socket ) => {

    // When a client is connected
    socket.emit( 'last-ticket', ticketCtrl.last );
    socket.emit( 'current-status', ticketCtrl.lastFour );
    socket.emit( 'tickets-pending', ticketCtrl.tickets.length );
    

    socket.on('next-ticket', ( payload, callback ) => {

        const giveAway = ticketCtrl.nextTicket();
        callback( giveAway );

        socket.broadcast.emit( 'tickets-pending', ticketCtrl.tickets.length );
    });

    socket.on('attend-ticket', ( { desk }, callback ) => {

        if ( !desk ) {
            return callback( { ok: false, msg: 'Desk is required'} );
        }
 
        const ticket = ticketCtrl.attendTicket( desk );
        socket.emit( 'tickets-pending', ticketCtrl.tickets.length );
        socket.broadcast.emit( 'tickets-pending', ticketCtrl.tickets.length );

        socket.broadcast.emit( 'current-status', ticketCtrl.lastFour );

        if ( !ticket ){
            callback( { ok: false, msg: 'There are no pending tickets'} );
        } else {
            callback( { ok: true, ticket } );
        }

            
    });


};


module.exports = {
    socketCtrl
};