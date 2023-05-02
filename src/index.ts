interface Todo {
  text: string;
  completed: boolean;
}

const input = document.getElementById("todo-input")! as HTMLInputElement;
const btn = document.getElementById("btn")!;
const form = document.getElementById("todo-form")!;
const list = document.getElementById("todo-list")!;
const todos: Todo[] = retrieveTodos();

todos.forEach(createTodo);

function retrieveTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON === null ? [] : JSON.parse(todosJSON);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  createTodo(newTodo);
  todos.push(newTodo);
  saveTodos();
});

function createTodo(todo: Todo) {
  const newLI = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    saveTodos();
  });
  newLI.append(todo.text);
  newLI.append(checkbox);
  list.append(newLI);
  input.value = "";
}
