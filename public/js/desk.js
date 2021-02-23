// HTML references 
const lblDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

// chrome & Firefox
const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desk') ) {
    window.location = 'index.html';
    throw new Error('Desk is required');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAttend.disabled = true;
});

socket.on('tickets-pending', ( tickets ) => {

    if (tickets === 0){
        lblPending.style.display = 'none';
    } else {
        lblPending.style.display = '';
        lblPending.innerText = tickets;
    }

});

btnAttend.addEventListener( 'click', () => {

        
    socket.emit( 'attend-ticket', { desk }, ( {ok, ticket, msg } ) => {
        
        if ( !ok ) {
            lblTicket.innerText = 'Nobody.';
            return divAlert.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.num;
        
    });

});