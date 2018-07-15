export const component = async () => {
  await waitAsync();

  const element = document.createElement('div');

  element.innerHTML = 'Hello Webpack! process.env.NODE_ENV = ' + process.env.NODE_ENV;

  return element;
}


export const waitAsync = () => new Promise(resolve => {
    setTimeout(resolve, 1000);
});
