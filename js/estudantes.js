async function MostrarAlunos(){
    const url = "http://localhost:3000"
    const token = localStorage.getItem('token')
    if(!token){
        window.location.assign("../Login/login.html")
    }
    const alunos = await fetch(url+"/usuarios",{
        method:'GET',
        headers:{'Authorization':'Bearer '+token}
    }).then(res=>{
        if(res.ok){
            alert("lista de alunos")
            return res.json()
        }else{
            alert(res.statusText)
            if(res.status===401||res.status===403){
                localStorage.removeItem('token')
                window.location.assign("../Login/login.html")
            }
        }
    })
    if(alunos){
        console.log(alunos)
        alunos.forEach(aluno => {
            document.querySelector('tbody').insertAdjacentHTML('beforeend',`
                <tr>
                    <td><img src="https://i.pravatar.cc/100" alt="Estudante"></td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>(13) 91234-1234</td>
                    <td>8fn29%&cbwu4%&'</td>
                    <td>01/05/2025</td>
                    <td class="actions">
                        <i class="fa fa-pencil"></i>
                        <i class="fa fa-trash"></i>
                    </td>
                </tr>`)
            const lixo  = document.querySelector('tr:last-of-type i.trash')
            lixo.addEventListener('click',async ()=>{
                if(confirm("Deseja excluir esse usuário?")){
                    const deletar = await fetch(url+"/usuarios/"+aluno.email,{
                        method:'DELETE',
                        headers:{'Authorization':'Bearer '+token}
                    }).then(res=>console.log(res.json()))
                }
            })
        });
    }
}

document.addEventListener('DOMContentLoaded',MostrarAlunos)