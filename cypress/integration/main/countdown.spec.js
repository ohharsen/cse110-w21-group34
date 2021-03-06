describe('Countdown Test', ()=>{
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/');
    });

    it('Starting the timer', () => {
        cy.get('#start-stop-button').trigger('click')
        .contains('✖ Reset');
    });

    it('Resetting the timer', () => {
        cy.get('#start-stop-button').trigger('click')
        .trigger('click').contains('▶ Begin');
    });

    it('Check display in middle of work period', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(60000);
        cy.get('#countdownText').contains('23:59');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke','#DB2E2E');
        });
        cy.tick(1439000);
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.tick(1000);
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#34DBB3');
        });
    });

    it('One full cycle check', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#34DBB3');
        });
        cy.get('#cycle-pomo-counter').contains('1');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#cycle-pomo-counter').contains('1');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#34DBB3');
        });
        cy.get('#cycle-pomo-counter').contains('2');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#cycle-pomo-counter').contains('2');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#34DBB3');
        });
        cy.get('#cycle-pomo-counter').contains('3');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#cycle-pomo-counter').contains('3');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#countdownText').contains('15:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#34DBB3');
        });
        cy.get('#cycle-pomo-counter').contains('4');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(900000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#cycle-pomo-counter').contains('4');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#34DBB3');
        });
        cy.get('#cycle-pomo-counter').contains('1');

        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#cycle-pomo-counter').contains('1');
    });

    it('Multiple resets in middle of cycle', ()=>{
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);

        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.tick(750000);
        cy.get('#cycle-pomo-counter').contains('2');
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#cycle-pomo-counter').contains('2');
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.tick(1400000);
        cy.get('#cycle-pomo-counter').contains('2'); 
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.get('#cycle-pomo-counter').contains('2');
        cy.tick(1500000);
        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);

        cy.get('#start-stop-button').trigger('click'); //Begin
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
        cy.get('#cycle-pomo-counter').contains('3');
    });

});