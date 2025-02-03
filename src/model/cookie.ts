console.log(document.cookie)
document.querySelector('button').addEventListener('click',(ev) => {
    let name = document.querySelector('.mi-input') as HTMLInputElement
    if ( name.value == ''){
        ev.preventDefault()
        alert("No lo dejes vacio")
    }else {

        document.cookie = `Nombre:${name.value}`
    }
})
