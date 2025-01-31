
document.querySelector('button').addEventListener('click',() => {
    let name = document.querySelector('.mi-input') as HTMLInputElement
    document.cookie = `Name:${name.value}`
})
