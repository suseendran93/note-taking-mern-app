const addNote = (title, text) => {
  return fetch("http://localhost:5000/notes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, text: text }),
  })
    .then((response) => response.json())

    .catch((error) => {
      console.log(error);
    });
};
const getNote = () => {
  return fetch("http://localhost:5000/notes/retrieve")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};
const updateNote = () => {};
export { addNote, getNote };
