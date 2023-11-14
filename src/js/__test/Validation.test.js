import Form from '../Form';

const dataList = [
  ['51.50851, -0.12572', { lat: '51.50851', long: '-0.12572' }],
  ['51.50851,-0.12572', { lat: '51.50851', long: '-0.12572' }],
  ['[51.50851, -0.12572]', { lat: '51.50851', long: '-0.12572' }],
  ['', false],
  ['22', false],
  ['word', false],
  ['33..33, 33..33', false],
];

const handler = test.each(dataList);

handler('testing form validation', (number, expected) => {
  const form = new Form();
  expect(form.constructor.validateForm(number)).toEqual(expected);
});
