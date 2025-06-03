const { saveTask, getAllTasks } = require("./firebaseTasks");

async function test() {
  await saveTask({ id: 1, title: "Tarea de prueba", completed: false });
  const tasks = await getAllTasks();
  console.log(tasks);
}

test();
