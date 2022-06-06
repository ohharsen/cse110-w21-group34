import { isA11yEnabled, isAutoStartEnabled, isKeystrokeEnabled, toggleAccessibility, toggleAutoStart, toggleKeystroke } from '../scripts/accessibility';

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

    test('Checks if autostart getter when autostart mode is off returns false', () => {
        expect(isAutoStartEnabled()).toBe(false);
    });

    test('Checks if autostart getter when autostart mode is on returns true', () => {
        toggleAutoStart();
        expect(isAutoStartEnabled()).toBe(true);
    });

    test('Checks if keystroke/shortcut mode is toggled', () => {
        const prev = isKeystrokeEnabled();
        toggleKeystroke();
        const next = isKeystrokeEnabled();
        expect(next).not.toBe(prev);
    });

    test('Checks if autostart mode is toggled', () => {
        const prev = isAutoStartEnabled();
        toggleAutoStart();
        const next = isAutoStartEnabled();
        expect(next).not.toBe(prev);
    });
});