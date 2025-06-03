const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const tasksRef = db.collection("tasks");

async function getAllTasks() {
  const snapshot = await tasksRef.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function createTask(task) {
  const docRef = await tasksRef.add(task);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

async function updateTask(id, data) {
  await tasksRef.doc(id).update(data);
  const doc = await tasksRef.doc(id).get();
  return { id: doc.id, ...doc.data() };
}

async function deleteTask(id) {
  await tasksRef.doc(id).delete();
  return { id, deleted: true };
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
