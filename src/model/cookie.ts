console.log(document.cookie)
document.querySelector('button').addEventListener('click',() => {
    let name = document.querySelector('.mi-input') as HTMLInputElement
    document.cookie = `Nombre:${name.value}`
})
