const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');


const socket = io();

socket.on('connect', () => {
    
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Server disconnect');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('send-msg', ( payload ) => {
    console.log(payload);
    
});

btnSend.addEventListener('click', () => {

    const message = txtMsg.value;
    const date = new Date().getTime();

    const payload = {
        id: 'Juan',
        message,
        date
    };

    socket.emit('send-msg', payload, ( id ) => {
        console.log('from server', id);
    } );
    
});