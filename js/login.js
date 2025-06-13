const url = "http://localhost:3000"

async function Login(){
    let dados = {}
    let valores = document.querySelectorAll('.caixainput input')
    valores.forEach(valor=>{
        dados[valor.id]=valor.value
    })
    const resposta  = await fetch(url+"/login",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(dados)
    }).then(res=>{
        if(res.ok){
            alert("cadastro realizado")
            window.location.assign("../Dashboard/dashboard.html")
            
        }else{
            alert(res.status)
        }
        return res.json()
    })
    if(resposta.token){
        localStorage.setItem('token',resposta.token)
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('form')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        Login()
    })
})