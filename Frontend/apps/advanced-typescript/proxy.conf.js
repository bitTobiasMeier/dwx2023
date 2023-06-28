const http = require('http');

module.exports = {
   '/api': {
      target: 'http://localhost:61526',
      secure: false,
      changeOrigin: false,
      logLevel: 'debug',
      agent: new http.Agent({
         keepAlive: true,
         keepAliveMsecs: 1000,
         timeout: 9999999,
      }),
      onProxyRes: (proxyRes, req, res) => {
         let key = 'www-authenticate';
         proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
      },
   },
};
