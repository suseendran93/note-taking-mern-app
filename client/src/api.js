const addNote = async (title, text, userId) => {
  return fetch("http://localhost:5000/notes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId, title: title, text: text }),
  })
    .then((response) => response.json())

    .catch((error) => {
      console.log(error);
    });
};
const getNote = async (userId) => {
  return fetch(`http://localhost:5000/notes/retrieve/?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};
const updateNote = async (title, text, id) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      text: text,
    }),
  };

  return fetch("http://localhost:5000/notes/update/" + id, requestOptions)
    .then((res) => res)
    .catch((error) => console.log(error));
};

const deleteNote = async (id) => {
  return fetch(`http://localhost:5000/notes/remove/${id}`, {
    method: "DELETE",
  })
    .then((res) => res)
    .catch((error) => console.log(error));
};
export { addNote, getNote, updateNote, deleteNote };
