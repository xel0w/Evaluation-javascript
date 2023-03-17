
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');


// Configuration de body-parser pour traiter les requêtes JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connexion à la base de données MongoDB Atlas
mongoose.connect('mongodb+srv://Xel0w:Test1234@cluster0.1yteva8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connexion à la base de données MongoDB Atlas réussie');
})
.catch((err) => {
  console.error('Erreur de connexion à la base de données MongoDB Atlas', err);
});

// Création d'un modèle de personnage
const CharacterSchema = mongoose.Schema({
    displayName: String,
    fullPortrait: String,
});

const Character = mongoose.model('Character', CharacterSchema);
app.use(cors());

// Récupération de tous les personnages
app.get('/characters', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.send(err);
  }
});

// Récupération d'un personnage spécifique
app.get('/characters/:character_id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.character_id);
    res.json(character);
  } catch (err) {
    res.send(err);
  }
});

// Ajout d'un personnage
app.post('/characters', async (req, res) => {
  try {
    const character = new Character(req.body);
    const savedCharacter = await character.save();
    res.json(savedCharacter);
  } catch (err) {
    res.send(err);
  }
});

// Mise à jour d'un personnage
app.put('/characters/:character_id', async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.character_id,
      req.body,
      { new: true }
    );
    res.json(updatedCharacter);
  } catch (err) {
    res.send(err);
  }
});

// Suppression d'un personnage
app.delete('/characters/:character_id', async (req, res) => {
  try {
    await Character.findByIdAndRemove(req.params.character_id);
    res.json({ message: 'Personnage supprimé avec succès' });
  } catch (err) {
    res.send(err);
  }
});

// Lancement du serveur sur le port 3000
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});

