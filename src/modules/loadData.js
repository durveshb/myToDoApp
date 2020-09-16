async function loadData(user) {
  let data = await fetch("./../../../data/todos.json");
  data = await data.json();
  return data[user];
}

export default loadData;
