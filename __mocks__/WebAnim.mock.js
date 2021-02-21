Object.defineProperty(Element.prototype, 'animate', {
  writable: true,
  value: jest.fn().mockImplementation((keys, opts) => ({
    keyframes: keys,
    options: opts,
    play: jest.fn(),
    reverse: jest.fn(),
    cancel: jest.fn(),
    finish: jest.fn(),
    playbackRate: 1,
    playState: 1,
    finished: false,
    onfinish: () => {},
    onremove: () => {},
    oncancel: () => {},
  })),
});