const todoForm = document["todo-form"];

// https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG

/*
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Sagittis eu volutpat odio facilisis. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Tortor id aliquet lectus proin nibh nisl condimentum id venenatis. Volutpat maecenas volutpat blandit aliquam. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Feugiat vivamus at augue eget arcu dictum. Tempus egestas sed sed risus. Euismod lacinia at quis risus. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam.
*/

const displayItem = (todoItem) => {
    const contentContainer = document.getElementById("content-container");


    const itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "todo-item")

    const itemForm = document.createElement("form");
    itemForm.setAttribute("name", "")

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "item-buttons-container")

    const editButton = document.createElement("button");
    editButton.textContent = "Edit"
    editButton.setAttribute("class", "edit-button item-button")

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class", "delete item-button")

    const title = document.createElement("div");
    title.textContent = todoItem.title;
    title.setAttribute("class", "item-title item-text")
    const description = document.createElement("div")
    description.textContent = todoItem.description;
    description.setAttribute("class", "item-description item-text")
    const imageContainer = document.createElement("div")
    imageContainer.setAttribute("class", "image-container")
    const image = document.createElement("img")
    image.src = todoItem.imgUrl;


    itemContainer.appendChild(itemForm)
    itemForm.appendChild(buttonContainer)
    buttonContainer.appendChild(editButton)
    buttonContainer.appendChild(deleteButton)
    itemForm.appendChild(title)
    itemForm.appendChild(description)

    imageContainer.append(image)

    if (todoItem.imgUrl) {
        itemForm.appendChild(imageContainer)
    }

    contentContainer.appendChild(itemContainer)
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (todoForm["image-input"].value.search("undefined") != -1) {
        todoForm["image-input"].value = "";
    }
    const todoItem = {
        title: todoForm["title-input"].value,
        description: todoForm["description-input"].value,
        imgUrl: todoForm["image-input"].value
    }
    displayItem(todoItem)
})