var admin = require("firebase-admin");
const { response, request } = require("express");

var serviceAccount = require("./herramientasoft-bae8e-firebase-adminsdk-fbsvc-4dc1df3257.json");
const { error } = require("console");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore();

const bibliotecaREF = database.collection("biblioteca");

const addBook = async ( req = request, resp = response) => {
   
  try {
    const book = req.body; 
    const docRef = await bibliotecaREF.add(book);
    resp.status(200).json({
      "msg":"Se ha creado un libro exitosamente.",
      "id": docRef.id
    })
  } catch (error) {
     resp.status(500).json({
      "msg":"Error al añadir un libro",
      error
     })
  }

}

module.exports ={
  addBook
}


