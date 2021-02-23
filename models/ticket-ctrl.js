const fs = require('fs');
const path = require('path');


class Ticket {
    constructor( number, desk ) {
        this.num = number;
        this.desk = desk;
    }
}

class TicketCtrl {


    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        this.init();
    }

    get toJson() {
        return {

            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour,
        };
    } 

    init() {

        try {
            const { last, today, tickets, lastFour } = require('../db/data.json');

            if ( today === this.today ) {

                this.tickets = tickets;
                this.last = last;
                this.lastFour = lastFour;
            } else {
                this.save();
            }
                
        } catch (error) {
            this.save();
        }

        
    }

    save() {

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );

    }

    nextTicket() {

        this.last += 1;
        const ticket = new Ticket( this.last, null );
        this.tickets.push( ticket );

        this.save();

        return 'Ticket ' + ticket.num;
    }

    attendTicket( desk ) {

        if ( this.tickets.length === 0) {
            return null;
        }

        
        const ticket = this.tickets.shift();
        ticket.desk = desk;

        this.lastFour.unshift( ticket );

        if ( this.lastFour.length > 4 ) {
            this.lastFour.splice(-1, 1); //delete last
        }

        this.save();

        return ticket;
    }


}

module.exports = TicketCtrl;