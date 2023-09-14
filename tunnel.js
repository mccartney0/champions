const tunnel = require('tunnel-ssh');

const config = {
  username: 'oracle',
  password: 'LKC#Orcl123_',
  host: 'smo-stage.oraclecorp.com',
  port: 22,
  dstHost: 'localhost',
  dstPort: 8082,
  localHost: 'localhost',
  localPort: 8083,
  keepAlive: true,
};

const tnl = tunnel(config, (error) => {
  if (error) {
    console.error('TUNNEL ERROR: ', error);
    tnl.close();
  }

  console.log('TUNNEL IS OPENING ON PORT: ', config.localPort);
});

tnl.on('error', (err) => {
  console.error('TUNNEL -> Something bad happened:', err);
});
