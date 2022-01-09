const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/tamerlan_project',
    mongoOptions: {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false},
  accessTokenLife: 3600, // время задается в сек
  refreshTokenLife: 36000
};