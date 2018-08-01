const app = require('./config/express')();
let URI;

process.env.NODE_ENV === 'production' ? URI = process.env.DB_URI_PROD : 
process.env.NODE_ENV === 'development'? URI = process.env.DB_URI_DEV  :
                                        URI = process.env.DB_URI_TEST ;

require('./config/database')( URI );

app.listen( process.env.PORT, process.env.IP, () => {
  console.log('Server listening at %s:%s in %s mode ', process.env.IP, process.env.PORT, process.env.NODE_ENV );
});


module.exports = app;