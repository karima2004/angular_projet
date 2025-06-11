const express = require('express');
const sql = require('mssql');
const config = require('./db'); // ton fichier config

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

sql.connect(config).then(pool => {
  console.log('✅ Connexion à SQL Server réussie');

// GET tous les étudiants
app.get('/etudiants', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM etudiant`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Erreur SQL: ' + err.message });
  }
});

// GET par ID
app.get('/etudiants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`SELECT * FROM etudiant WHERE id = ${id}`;
    if (result.recordset.length === 0) return res.status(404).json({ error: 'Étudiant non trouvé' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur SQL: ' + err.message });
  }
});

// POST ajouter étudiant
app.post('/etudiants', async (req, res) => {
  const { nom, prenom, email, tel, date_naissance, filiere } = req.body;
  try {
    await sql.query`
      INSERT INTO etudiant (nom, prenom, email, tel, date_naissance, filiere)
      VALUES (${nom}, ${prenom}, ${email}, ${tel}, ${date_naissance}, ${filiere})
    `;
    res.status(201).json({ message: 'Étudiant ajouté' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur SQL: ' + err.message });
  }
});

// PUT modifier étudiant
app.put('/etudiants/:id', async (req, res) => {
  console.log("📥 Étudiant reçu :", req.body);
  const { id } = req.params;
  const { nom, prenom, email, tel, date_naissance, filiere } = req.body;
  try {
    await sql.query`
      UPDATE etudiant SET
        nom = ${nom},
        prenom = ${prenom},
        email = ${email},
        tel = ${tel},
        date_naissance = ${date_naissance},
        filiere = ${filiere}
      WHERE id = ${id}
    `;
    res.json({ message: 'Étudiant mis à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur SQL: ' + err.message });
  }
});

// DELETE étudiant
app.delete('/etudiants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM etudiant WHERE id = ${id}`;
    res.json({ message: 'Étudiant supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur SQL: ' + err.message });
  }
});

}).catch(err => {
  console.error('❌ Erreur de connexion SQL Server :', err);
});

app.listen(3001, () => console.log('✅ Serveur démarré sur http://localhost:3001'));