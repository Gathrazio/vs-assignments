const todoForm = document["todo-form"];

// https://upload.wikimedia.org/wikipedia/en/c/ce/Goomba.PNG

/*
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Sagittis eu volutpat odio facilisis. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Tortor id aliquet lectus proin nibh nisl condimentum id venenatis. Volutpat maecenas volutpat blandit aliquam. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Feugiat vivamus at augue eget arcu dictum. Tempus egestas sed sed risus. Euismod lacinia at quis risus. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam.
*/


const displayItem = (todoItem) => {
    const todoContainer = document.getElementById("todo-container");


    const itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "todo-item")

    const itemForm = document.createElement("form");
    itemForm.setAttribute("name", "")

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "item-buttons-container")

    const editButton = document.createElement("button");
    editButton.textContent = "Edit"
    editButton.setAttribute("class", "edit-button item-button")
    editButton.setAttribute("value", "edit")

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class", "delete item-button")
    deleteButton.setAttribute("value", "delete")

    const completionCheckmark = document.createElement("input");
    completionCheckmark.setAttribute("class", "checkmark item-button")
    completionCheckmark.setAttribute("type", "checkbox")

    const checkmarkLabel = document.createElement("label");
    checkmarkLabel.textContent = "Mark as Complete:";
    const checkmarkLabelContainer = document.createElement("div")
    checkmarkLabelContainer.setAttribute("class", "completion-container")

    const price = document.createElement("div");
    const priceLabel = document.createElement("div")
    priceLabel.setAttribute("class", "price-label")
    priceLabel.textContent = "Price:"
    price.setAttribute("class", "price")
    if (todoItem.price || todoItem.price === 0) {
        price.textContent = todoItem.price.toString();
    }

    const title = document.createElement("div");
    title.textContent = todoItem.title;
    const titleContainer = document.createElement("div")
    titleContainer.setAttribute("class", "title-container")
    title.setAttribute("class", "item-title item-text")
    const description = document.createElement("div")
    const descriptionContainer = document.createElement("div")

    if (todoItem.description) {
        description.textContent = todoItem.description;
    }

    descriptionContainer.setAttribute("class", "description-container")
    description.setAttribute("class", "item-description item-text")
    const imageContainer = document.createElement("div")
    imageContainer.setAttribute("class", "image-container")
    const image = document.createElement("img")

    if (todoItem.imgUrl) {
        image.src = todoItem.imgUrl;
    }


    itemContainer.appendChild(itemForm)
    itemForm.appendChild(buttonContainer)
    buttonContainer.appendChild(editButton)
    buttonContainer.appendChild(deleteButton)
    checkmarkLabel.appendChild(completionCheckmark)
    checkmarkLabelContainer.appendChild(checkmarkLabel)

    if (todoItem.price || todoItem.price === 0) {
        checkmarkLabelContainer.appendChild(priceLabel)
        checkmarkLabelContainer.appendChild(price)
    }

    buttonContainer.appendChild(checkmarkLabelContainer)
    titleContainer.appendChild(title)
    itemForm.appendChild(titleContainer)

    if (todoItem.description) {
        descriptionContainer.appendChild(description)
        itemForm.appendChild(descriptionContainer)
    }

    imageContainer.append(image)

    if (todoItem.imgUrl) {
        itemForm.appendChild(imageContainer)
    }

    todoContainer.appendChild(itemContainer)

    completionCheckmark.addEventListener('change', function() {
        if (this.checked) {
            axios.put(`https://api.vschool.io/noahj/todo/${todoItem._id}`, {completed: true})
            title.style.textDecoration = "line-through";
        } else {
            axios.put(`https://api.vschool.io/noahj/todo/${todoItem._id}`, {completed: false})
            title.style.textDecoration = "none";
        }
    })

    itemForm.addEventListener('submit', todoFunctionality)

    const titleInput = document.createElement("input");
    const priceInput = document.createElement("input");
    const descriptionInput = document.createElement("input");
    const imageInput = document.createElement("input");

    function todoFunctionality (e) {
        e.preventDefault()
        switch (e.submitter.value) {
            case "delete":
                axios.delete(`https://api.vschool.io/noahj/todo/${todoItem._id}`).then(res => getData())
                break;
            case "edit":
                titleInput.setAttribute("value", title.textContent)
                titleInput.setAttribute("class", "title-input")
                titleInput.setAttribute("placeholder", "Title")
                titleContainer.replaceChild(titleInput, title)
                editButton.textContent = "Save";
                editButton.setAttribute("value", "save")
                if (todoItem.price || todoItem.price === 0) {
                    priceInput.setAttribute("class", "price-input")
                    priceInput.setAttribute("type", "number")
                    priceInput.setAttribute("min", "0")
                    priceInput.setAttribute("step", "0.1")
                    priceInput.setAttribute("value", Number(price.textContent))
                    checkmarkLabelContainer.replaceChild(priceInput, price)
                }
                if (todoItem.description) {
                    descriptionInput.setAttribute("class", "description-input")
                    descriptionInput.setAttribute("placeholder", "Description")
                    descriptionInput.setAttribute("value", description.textContent)
                    descriptionContainer.replaceChild(descriptionInput, description)
                }
                if (todoItem.imgUrl) {
                    imageInput.setAttribute("class", "image-input")
                    imageInput.setAttribute("value", image.src)
                    imageInput.setAttribute("placeholder", "Image URL")
                    imageContainer.replaceChild(imageInput, image)
                    imageContainer.style.height = "80px";
                }
                break;
            case "save" :
                if (titleInput.value === "") {
                    alert("Please enter a title.")
                    break;
                }
                const updates = {
                    title: titleInput.value,
                    description: descriptionInput.value,
                    price: priceInput.value,
                    imgUrl: imageInput.value
                }
                editButton.textContent = "Edit";
                editButton.setAttribute("value", "edit")
                axios.put(`https://api.vschool.io/noahj/todo/${todoItem._id}`, updates).then(res => getData())

        }
    }

    if (todoItem.completed) {
        completionCheckmark.checked = true;
        title.style.textDecoration = "line-through";
    }
}

const deleteDatabase = (data) => {
    for (i = 0; i < data.length; i++) {
    axios.delete("https://api.vschool.io/noahj/todo/" + data[i]._id)
    }
}

// axios.get("https://api.vschool.io/noahj/todo").then(res => deleteDatabase(res.data))


const getData = () => {
    clearItems()

    axios.get("https://api.vschool.io/noahj/todo")
        .then(res => displayData(res.data))
        .catch(err => console.log(err))
}

const clearItems = () => {
    const todoContainer = document.getElementById("todo-container");
    while (todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild)
    }
}

const displayData = (data) => {
    for (i = 0; i < data.length; i++) {
        displayItem(data[i])
    }
}

getData()

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formattedPrice = "";
    if (todoForm["image-input"].value.search("undefined") != -1) {
        todoForm["image-input"].value = "";
    }
    if (todoForm["price-input"].value != "") {
        price = Number(todoForm["price-input"].value);
    }
    console.log(todoForm["price-input"].value)
    const todoItem = {
        title: todoForm["title-input"].value,
        description: todoForm["description-input"].value,
        imgUrl: todoForm["image-input"].value,
        price: formattedPrice,
        completed: false
    }
    console.log(todoItem)
    todoForm["title-input"].value = "";
    todoForm["description-input"].value = "";
    todoForm["image-input"].value = "";
    todoForm["price-input"].value = "";
    axios.post("https://api.vschool.io/noahj/todo", todoItem).then(res => getData()).catch(err => console.log(err))
})