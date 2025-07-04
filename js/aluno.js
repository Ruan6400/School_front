const url = "http://localhost:3000"
const token = localStorage.getItem('token')

function ActivateButtons(){
        const form = document.querySelector('form')
        form.addEventListener('submit',async (e)=>{
            
            e.preventDefault()
            Cadastrar()
        })
}

async function Cadastrar(){
    let dados = {}
    let valores = document.querySelectorAll('.caixainput input')
    valores.forEach(valor=>{
        dados[valor.id]=valor.value
    })
    const resposta  = await fetch(url+"/cadastrar",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body:JSON.stringify(dados)
    }).then(res=>{
        if(res.ok){
            alert("cadastro realizado")
        }else{
            alert(res.status)
        }
    })
}



document.addEventListener('DOMContentLoaded',ActivateButtons)