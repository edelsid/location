import MessageView from './MessageView';

export default class Feed {
  constructor(container) {
    this.bindToDOM(container);
    this.view = new MessageView();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
    this.area = document.querySelector('.messages');
    this.input = document.querySelector('.print');
  }

  init() {
    this.loadState();
    this.input.addEventListener('keydown', (e) => this.enterMessage(e));
  }

  loadState() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (!state) return;
    for (const value of Object.values(state)) {
      this.view.constructor.renderMessage(this.area, 0, 0, value);
    }
  }

  enterMessage(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (!this.input.value) return;
    this.renderMessage(this.input.value);
    this.input.value = '';
  }

  renderMessage(value) {
    this.view.constructor.getCoord(this.container, this.area, value);
  }
}
