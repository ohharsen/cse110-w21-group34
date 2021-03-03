describe('Countdown Test', ()=>{
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source');
    });

    it('Base test', () => {
        expect(true).to.equal(true);
    });

    it('Starting the timer', () => {
        cy.get('#start-stop-button').trigger('click')
        .contains('✖ Reset');
        cy.get('#cycle-pomo-counter').contains('1');
    });

    it('Resetting the timer', () => {
        cy.get('#start-stop-button').trigger('click')
        .trigger('click').contains('▶ Begin');
    });

    it('Clock display updates to break period', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#34DBB3');
        });
    });

    it('Check display in middle of work period', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(60000);
        cy.get('#countdownText').contains('23:59');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke','#DB2E2E');
        });
    });

    it('Clock display returns to work period', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el)=>{
            expect($el).to.have.attr('stroke', '#DB2E2E');
        });
    });

    
    // Correct num of pomo cycles
    // 4th break is long break... 
    // Text displayed is correct

});