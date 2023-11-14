export default class Message {
  constructor(value, coord, date, loadedData) {
    this.text = value;
    this.coordinates = coord;
    this.date = date;
    this.loaded = loadedData;
  }

  formation() {
    const newMsg = document.createElement('li');
    newMsg.className = 'message';
    newMsg.innerHTML = `
      <span class="mark"></span>
      <div class="msg_area">
         <text class="text">${this.text}</text>
         <text class="time">${this.date}</text>
      </div>
      <div class="coord">${this.coordinates}</div>`;
    if (this.loaded) {
      newMsg.innerHTML = this.loaded;
    }
    return newMsg;
  }
}
