const app = require('./config/express')();

process.env.NODE_ENV === 'production' ? URI = process.env.DB_URI_PROD : URI = process.env.DB_URI_DEV;

require('./config/database')( URI );

app.listen( process.env.PORT, process.env.IP, () => {
  console.log('Server listening at %s:%s in %s mode ', process.env.IP, process.env.PORT, process.env.NODE_ENV );
});
