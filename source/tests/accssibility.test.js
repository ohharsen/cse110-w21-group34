import { isA11yEnabled, isKeystrokeEnabled, toggleAccessibility, toggleKeystroke } from '../scripts/accessibility';

describe('Color Accessibility', () => {
    test('Checks if toggling on color accessibility adds style class to DOM', () => {
        toggleAccessibility();
        expect(document.documentElement.classList).toContain('accessible');
    });

    test('Checks if a11y mode getter when accessbility mode is on returns true', () => {
        expect(isA11yEnabled()).toBe(true);
    });
    
    test('Checks if toggling off color accessibility removes style class to DOM', () => {
        toggleAccessibility();
        expect(document.documentElement.classList).not.toContain('accessible');
    });
    
    test('Checks if a11y mode getter when accessbility mode is off returns false', () => {
        expect(isA11yEnabled()).toBe(false);
    });

    test('Checks if keystroke/shortcut mode is toggled', () => {
        const prev = isKeystrokeEnabled();
        toggleKeystroke();
        expect(isKeystrokeEnabled()).not.toBe(prev);
    });
});