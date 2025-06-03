const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("./firebaseTasks");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();

app.use(express.json());
app.use("/swagger-ui.html", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas.
 *     responses:
 *       200:
 *         description: Lista de tareas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
app.post("/api/tasks", async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error("Error real al crear tarea:", err);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 deleted:
 *                   type: boolean
 */
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const result = await deleteTask(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
