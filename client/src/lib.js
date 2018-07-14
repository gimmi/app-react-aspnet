export function component() {
  var element = document.createElement('div');

  // This is a comment

  element.innerHTML = 'Hello Webpack! process.env.NODE_ENV = ' + process.env.NODE_ENV;

  return element;
}
