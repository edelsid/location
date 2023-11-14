/* eslint-disable no-alert */

import Form from './Form';
import Message from './Message';

export default class MessageView {
  static getCoord(container, area, value) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const coord = `${data.coords.latitude.toFixed(5)}, ${data.coords.longitude.toFixed(5)}`;
        MessageView.renderMessage(area, value, coord, null);
        MessageView.saveState(area);
      }, () => {
        const form = new Form();
        form.formation();
        container.appendChild(form.formElement);
        MessageView.formEvents(form, area, value);
      });
    }
  }

  static formEvents(form, area, value) {
    form.formElement.querySelector('.decline').addEventListener('click', (e) => {
      e.preventDefault();
      form.formElement.remove();
    });

    form.formElement.querySelector('.accept').addEventListener('click', (e) => {
      e.preventDefault();
      const inputField = form.formElement.querySelector('.coord_print');
      const cleanCoord = form.constructor.validateForm(inputField.value);

      if (!cleanCoord) {
        alert('Ошибка! Введите координаты в правильном формате');
        return;
      }
      const coordString = `${cleanCoord.lat}, ${cleanCoord.long}`;
      MessageView.renderMessage(area, value, coordString, null);
      MessageView.saveState(area);
      form.formElement.remove();
    });
  }

  static getDate() {
    const rawDate = new Date();
    const yy = rawDate.getFullYear().toString().slice(-2);
    const mm = MessageView.insertZeroes(rawDate.getMonth() + 1);
    const dd = MessageView.insertZeroes(rawDate.getDate());
    const hh = MessageView.insertZeroes(rawDate.getHours());
    const min = MessageView.insertZeroes(rawDate.getMinutes());

    const date = `${dd}.${mm}.${yy} ${hh}:${min}`;
    return date;
  }

  static insertZeroes(value) {
    let newValue;
    if (value < 10) {
      newValue = `0${value}`;
      return newValue;
    }
    return value;
  }

  static renderMessage(area, value, coord, loadedData) {
    let date;
    if (!loadedData) {
      date = MessageView.getDate();
    }
    const msg = new Message(value, coord, date, loadedData);
    const newMsg = msg.formation();
    area.appendChild(newMsg);
  }

  static saveState(area) {
    localStorage.clear();
    const state = {};
    const messages = Array.from(area.children);
    for (let i = 0; i < messages.length; i += 1) {
      state[`key${i}`] = messages[i].innerHTML;
    }
    localStorage.setItem('state', JSON.stringify(state));
  }
}
