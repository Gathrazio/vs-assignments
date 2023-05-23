const axios = require("axios");
// axios.get("https://swapi.dev/api/people/1").then(response => console.log(response.data)).catch(err => console.log(err));


const newTodo = {
    title: "My Todo via axios",
    price: 40
}
// axios.post("https://api.vschool.io/noahj/todo", newTodo).then(resp => console.log(resp.data)).catch(err => console.log(err));

axios.get("https://api.vschool.io/noahj/todo").then(resp => console.log(resp.data))

const updates = {
    title: "Bartholomew Simpson"
}
// axios.put("https://api.vschool.io/noahj/todo/646c3b4c78fe452c11497844", updates).then(resp => console.log(resp.data)).catch(err => console.log(err));

// axios.delete("https://api.vschool.io/noahj/todo/646c3b4c78fe452c11497844").then(resp => console.log(resp.data)).catch(err => console.log(err))