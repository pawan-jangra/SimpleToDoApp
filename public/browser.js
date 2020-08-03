function itemTemplate(item){
    return `
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
          <button data-id=${item._id } class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button data-id=${item._id } class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    `
}

// load items
let ourHTML =  items.map(function(item){
    return itemTemplate(item)
}).join('')
document.querySelector("#item-list").insertAdjacentHTML("beforeend", ourHTML)

let createText = document.querySelector("#create-text")
// Create Items
document.querySelector("#create-form").addEventListener("submit", function(e){
    e.preventDefault()
    axios.post("/create-item", {text: createText.value }).then(function(response){
        console.log(response)
        document.querySelector("#item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createText.value = ''
        createText.focus()
    }).catch(function(){
        console.log("try again")
    })
})


document.addEventListener("click", function(e){
    // delete items
    if (e.target.classList.contains("delete-me")) {
        let action = confirm("Are you sure want to delete the item ?")
        if (action) {
            axios.post("/delete-item", {id: e.target.getAttribute("data-id")}).then(function(){
                e .target.parentElement.parentElement.remove()
            }).catch(function(){
                console.log("try again")
            })
            
        }
    }

    // edit items
    if (e.target.classList.contains("edit-me")) {
        let input = prompt("Enter Text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML )
        if (input) {
            axios.post("/update-item", {text: input, id :  e.target.getAttribute("data-id")}).then(function(){
                e .target.parentElement.parentElement.querySelector(".item-text").innerHTML = input
            }).catch(function(){
                console.log("Pls try again")
            })
        }
    }
})