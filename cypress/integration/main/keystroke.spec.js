import * as Constants from '../../../source/scripts/constants';

const TASK_COUNT_VALID_ENTER = '0';
const TASK_COUNT_INVALID_ENTER = '1';
const STATS_SLIDE_OPEN  = 'slide-open';
const STATS_SLIDE_CLOSE = 'slide-close';

describe('Timer Keys Test', ()=>{
    beforeEach(() => {
        cy.visit(Constants.HOST_ADDRESS);
    });

    it('Space bar start timer check', () => {
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.SPACE, force: true})
        .get('#' + Constants.START_STOP_ID).contains(Constants.RESET_BTN_TXT);
    });

    it('Space bar reset timer check', () => {
        cy.document()
        .trigger(Constants.events.KEYDOWN, {code: Constants.keys.SPACE, force: true})
        .trigger(Constants.events.KEYDOWN, {code: Constants.keys.SPACE, force: true})
        .get('#' + Constants.START_STOP_ID).contains(Constants.BEGIN_BTN_TXT);
    });
});

describe('Stats Pane Test', ()=>{
    beforeEach(() => {
        cy.visit(Constants.HOST_ADDRESS);
    });

    it('Left Arrow Then Right Arrow toggles stats pane', () => {
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.LEFT_ARROW, force: true})
        .get('.' + Constants.CENTER_CONTAINER)
        .should('satisfy', ($el) => {
            const classList = Array.from($el[0].classList); 
            return classList.includes(STATS_SLIDE_OPEN);
        });

        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.RIGHT_ARROW, force: true})
        .get('.' + Constants.CENTER_CONTAINER)
        .should('satisfy', ($el) => {
            const classList = Array.from($el[0].classList); 
            return classList.includes(STATS_SLIDE_CLOSE);
        });
    });
});

describe('Enter Complete Task Tests', () => {

    beforeEach(() => {
        cy.visit(Constants.HOST_ADDRESS);
    });

    it('During Break ENTER completes a task', () => {
        cy.clock();
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.SPACE, force: true});
        cy.tick(1500000);
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.ENTER, force: true})
        .get('#' + Constants.TASK_POMO_COUNTER)
        .contains(TASK_COUNT_VALID_ENTER);
    });

    it('During Break ENTER does noting', () => {
        cy.clock();
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.SPACE, force: true});
        cy.tick(1500000);
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.SPACE, force: true});
        cy.tick(300000);
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.SPACE, force: true});
        cy.tick(8000);
        cy.document().trigger(Constants.events.KEYDOWN, {code: Constants.keys.ENTER, force: true})
        .get('#' + Constants.TASK_POMO_COUNTER)
        .contains(TASK_COUNT_INVALID_ENTER);
    });
});