class Console {
    console: HTMLDivElement

    constructor(){
        this.console = document.querySelector('#console') as HTMLDivElement

    }

    messageGood(text:string){
        this.console.innerHTML += `<p class="Mgood">${text}</p>`
    }
    messageBad(text:string){
        this.console.innerHTML += `<p class="Mbad">${text}</p>`
    }
    messageShop(text:string){
        this.console.innerHTML += `<p class="Mshop">${text}</p>`
    }
    


}


export default Console
