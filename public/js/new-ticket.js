// HTML references
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreateTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnCreateTicket.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCreateTicket.disabled = true;

});

socket.on('last-ticket', ( ticket ) => {
    lblNewTicket.innerText = 'Last Ticket ' + ticket;
});

btnCreateTicket.addEventListener( 'click', () => {

        
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});