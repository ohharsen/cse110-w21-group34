import * as Constants from '../../../source/scripts/constants';

describe('View / Animation', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });
});

describe('Daily Statistics', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  // Tests on Pomodoro cycles 
  it('Check when there are zero pomodoro cycles completed', () => {
    window.localStorage.setItem(Constants.TODAY_POMO_ID, '0');
    cy.get('#stats-open-button').click();
    cy.get('#today-pomodoros').then((elem) => {
			expect(elem.text()).to.equal('0');
    });
  });
  
  it('Check that pomodoro cycle count display correctly reflects cycle count', () => {
    window.localStorage.setItem(Constants.TODAY_POMO_ID, '15');
    cy.get('#stats-open-button').click();
    cy.get('#today-pomodoros').then((elem) => {
			expect(elem.text()).to.equal('15');
    });
  });
  
  // Tests on Tasks completed  
  it('Check when there are zero tasks completed', () => {
    cy.get('#stats-open-button').click();
    cy.get('#today-tasks').then((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });
  
  it('Check that today tasks count display correctly reflects today tasks', () => {
    window.localStorage.setItem(Constants.TODAY_TASK_ID, '4');
    cy.get('#stats-open-button').click();
    cy.get('#today-tasks').then((elem) => {
      expect(elem.text()).to.equal('4');
    });
  });
  
  // Tests on Interruptions 
  it('Check when there are zero interruptions', () => {
    cy.get('#stats-open-button').click();
    cy.get('#today-interruptions').then((elem) => {
			expect(elem.text()).to.equal('0');
    });
  });
  
  it('Check that today interruptions count display correctly reflects today interruptions', () => {
    window.localStorage.setItem(Constants.TODAY_INTERRUPTION, '6');
    cy.get('#stats-open-button').click();
    cy.get('#today-interruptions').then((elem) => {
			expect(elem.text()).to.equal('6');
    });
  });
});

describe('Total Statistics', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('Defaults to 0 for the total pomodoros completed', () => {
    cy.get('#stats-open-button').click();
    cy.get('#total-pomodoros').then((elem) => {
			expect(elem.text()).to.equal('0');
    });
  });
  
  it('Defaults to 0 for the total tasks completed display', () => {
    cy.get('#stats-open-button').click();
    cy.get('#total-tasks').then((elem) => {
			expect(elem.text()).to.equal('0');
    });
  });
  
  it('Defaults to 0.00 for the total avg. interruptions display', () => {
    cy.get('#stats-open-button').click();
    cy.get('#total-interruptions').then((elem) => {
			expect(elem.text()).to.equal('0.00');
    });
  });
  
  it('Defaults to 0 pomodoros for the "Best Day" display', () => {
    cy.get('#stats-open-button').click();
    cy.get('#total-best-pomo').then((elem) => {
			expect(elem.text()).to.equal('0');
    });
  });

  it('Defaults to 0.00 minutes for the "Best Day" display', () => {
    cy.get('#stats-open-button').click();
    cy.get('#total-best-time').then((elem) => {
			expect(elem.text()).to.equal('0.00');
    });
  });
  
  it('Correctly displays total pomodoros completed', () => {
    window.localStorage.setItem(Constants.TOTAL_POMO_ID, '7');
    cy.get('#stats-open-button').click();
    cy.get('#total-pomodoros').then((elem) => {
      expect(elem.text()).to.equal('7');
    });
  });
  
  it('Correctly displays total avg. interruptions per pomodoro', () => {
    window.localStorage.setItem(Constants.TOTAL_INTERRUPTION, '9');
    window.localStorage.setItem(Constants.TOTAL_POMO_ID, '4');
    cy.get('#stats-open-button').click();
    cy.get('#total-interruptions').then((elem) => {
      expect(elem.text()).to.equal('2.25');
    });
  });
  
  it('Correctly displays total tasks completed', () => {
    window.localStorage.setItem(Constants.TOTAL_TASK_ID, '3');
    cy.get('#stats-open-button').click();
    cy.get('#total-tasks').then((elem) => {
      expect(elem.text()).to.equal('3');
    });
  });
  
  it('Correctly displays pomodoros for the "Best Day" display', () => {
    window.localStorage.setItem(Constants.BEST_DAILY_POMO_ID, '8');
    cy.get('#stats-open-button').click();
    cy.get('#total-best-pomo').then((elem) => {
      expect(elem.text()).to.equal('8');
    });
  });
  
  it('Correctly displays minutes for the "Best Day" display', () => {
    window.localStorage.setItem(Constants.BEST_DAILY_POMO_ID, '5');
    cy.get('#stats-open-button').click();
    cy.get('#total-best-time').then((elem) => {
      expect(elem.text()).to.equal('125.00');
    });
  });
});