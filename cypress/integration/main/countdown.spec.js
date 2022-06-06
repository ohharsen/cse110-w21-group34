/**
 * unregisters service worker before e2e test
 */
function unregisterSW() {
    if (window.navigator && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations()
            .then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister();
                });
            });
    }
}
describe('Countdown Test', () => {
    beforeEach(() => {
        // unregisters service worker before e2e test
        unregisterSW();
        cy.visit('http://127.0.0.1:5500/');
    });

    it('Starting the timer', () => {
        cy.get('#start-stop-button').trigger('click')
            .contains('Reset');
    });

    it('Resetting the timer', () => {
        cy.get('#start-stop-button').trigger('click');
        cy.get('#start-stop-button').trigger('click');
        cy.get('#reset-yes-button').trigger('click');
        cy.get('#start-stop-button').contains('Begin');
    });

    it('Check display in middle of work period', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(60000);
        cy.get('#countdownText').contains('23:59');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.tick(1439000);
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.tick(1000);
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
    });

    it('Reset prompt hide check', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(60000);
        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#start-stop-button').contains('Begin')
    });

    it('One full cycle check', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot1').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--green)');
        });
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot1').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot2').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--green)');
        });
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot2').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot2').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--green)');
        });
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot3').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.tick(1500000);
        cy.get('#countdownText').contains('15:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot4').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--green)');
        });
        cy.tick(900000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot4').should('have.attr', 'src').should('include', 'gray');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.tick(1500000);
        cy.get('#countdownText').contains('05:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot1').should('have.attr', 'src').should('include', 'color');

        cy.get('#start-stop-button').trigger('click');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--green)');
        });
        cy.tick(300000);
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#pot1').should('have.attr', 'src').should('include', 'color');
    });

    it('Multiple resets in middle of cycle', () => {
        cy.clock();
        cy.get('#start-stop-button').trigger('click');
        cy.tick(1500000);
        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);

        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.tick(750000);
        cy.get('#pot1').should('have.attr', 'src').should('include', 'color');
        cy.get('#pot2').should('have.attr', 'src').should('include', 'gray');
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#reset-yes-button').trigger('click');  // Confirm Reset
        cy.get('#pot1').should('have.attr', 'src').should('include', 'color');
        cy.get('#pot2').should('have.attr', 'src').should('include', 'gray');
        cy.get('#countdownText').contains('25:00');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--grey)');
        });
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.tick(1400000);
        cy.get('#pot2').should('have.attr', 'src').should('include', 'gray');
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.get('#start-stop-button').trigger('click'); // Reset
        cy.get('#start-stop-button').trigger('click'); // Begin
        cy.get('#pot2').should('have.attr', 'src').should('include', 'gray');
        cy.tick(1500000);
        cy.get('#start-stop-button').trigger('click');
        cy.tick(300000);

        cy.get('#start-stop-button').trigger('click'); //Begin
        cy.get('#base-timer-path-remaining').then(($el) => {
            expect($el).to.have.attr('stroke', 'var(--red)');
        });
        cy.get('#pot2').should('have.attr', 'src').should('include', 'color');
    });

});