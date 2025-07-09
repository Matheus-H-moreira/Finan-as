document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let usuario = document.getElementById('usuario').value
        let senha = document.getElementById('senha').value

        if(!usuario || !senha){
            alert("Preencha os campos corretamente!")
            return
        }

        fetch('http://localhost:3000/usuarios')
            .then(res => res.json())
            .then(cadastros => {
                let achado = cadastros.find(cadastro => cadastro.usuario === usuario && cadastro.senha === senha)

                if(achado){
                    alert("Login realizado com sucesso!")
                    window.location.href = '../index.html'
                } else {
                    alert("Usuário ou senha incorretos!")
                }
            })
            .catch(error => {
                console.error("Erro ao buscar usuários", error)
                alert("Erro ao tentar logar. Tente novamente mais tarde.")
            })
    })
})