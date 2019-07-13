/**
 * mysql session store config
 */
exports.store = {
  host: '127.0.0.1',
  port: 3306,
  user: 'app',
  password: '***',
  database: 'mftp',
  useConnectionPooling: true,
  checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
  expiration: 5400000,// 90mins The maximum age of a valid session; milliseconds.
  createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
  schema: {
    tableName: 't_nodejs_session',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};