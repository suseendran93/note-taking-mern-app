const addNote = async (title, text, userId) => {
  return fetch("https://noteyfy-server.vercel.app/notes/add", {
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
  return fetch(
    `https://noteyfy-server.vercel.app/notes/retrieve/?userId=${userId}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};
const updateNote = async (noteObj, id) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: noteObj.title,
      text: noteObj.text,
      color: noteObj.color,
      group: noteObj.group,
      archive: noteObj.archive,
      pinned: noteObj.pinned,
    }),
  };

  return fetch(
    "https://noteyfy-server.vercel.app/notes/update/" + id,
    requestOptions
  )
    .then((res) => res)
    .catch((error) => console.log(error));
};

const deleteNote = async (id) => {
  //http://localhost:5000/notes/remove/${id}
  return fetch(`https://noteyfy-server.vercel.app/notes/remove/${id}`, {
    method: "DELETE",
  })
    .then((res) => res)
    .catch((error) => console.log(error));
};
export { addNote, getNote, updateNote, deleteNote };
