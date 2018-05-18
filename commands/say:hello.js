/**
*
*
*/

module.exports = {
  command: (options) => {
    console.log(JSON.stringify(options, null, 2));
    console.log();
    console.log('Hello World!');
  },
  scope: '/test',
}
