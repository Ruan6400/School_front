const url = "http://localhost:3000"

function ActivateButtons(){
    const btn_cadastro = document.querySelector('.btn-add')
    btn_cadastro.addEventListener('click',()=>{
        document.body.insertAdjacentHTML('afterbegin',`
            <form id="Cadastro_Aluno">
                <input type="text" id="nome" placeholder="Nome do aluno" required>
                <input type="password" id="senha" placeholder="senha" required>
                <input type="password" id="cf_senha" placeholder="confirmar senha" required>
                <input type="email" id="email" placeholder="email">
                <input type="telefone" id="tel" placeholder="telefone">
                <button>Cadastrar</button>
            </form>
            `)
        const form = document.getElementById('Cadastro_Aluno')
        form.addEventListener('submit',async (e)=>{
            const token = localStorage.getItem('token')
            e.preventDefault()
            Cadastrar()
        })
    })
}

async function Cadastrar(){
    let dados = {}
    let valores = document.querySelectorAll('#Cadastro_Aluno input')
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
            console.log("cadastro realizado")
        }else{
            console.log(res.status)
        }
    })
}

document.addEventListener('DOMContentLoaded',ActivateButtons)