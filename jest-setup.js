module.exports = async () => {
  global.testServer = await require('./server/server');
  // console.log('global.testServer -> ', global.testServer )
};
