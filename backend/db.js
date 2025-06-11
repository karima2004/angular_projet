const sql = require('mssql');

const config = {
  user: 'etudiant_user',
  password: '1234',
  server: 'DESKTOP-REGD3TU',
  database: 'gestion_etudiants',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = config;
