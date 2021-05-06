export function getTodosFromApi() {
  return fetch('https://jsonplaceholder.typicode.com/todos/', {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function updateTodo(id, status) {
  return fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: status,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function createTodo(title, completed = false, userId = 1) {
  return fetch('https://jsonplaceholder.typicode.com/todos/', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      completed: completed,
      userId: userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function deleteTodo(id) {
  return fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getOneTodoById(id) {
  return fetch('https://jsonplaceholder.typicode.com/todos/' + id)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
