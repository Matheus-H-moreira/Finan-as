document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastro')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let nome = document.getElementById('nome').value
        let sobrenome = document.getElementById('sobrenome').value
        let email = document.getElementById('email').value
        let usuario = document.getElementById('usuario').value
        let senha = document.getElementById('senha').value
        let confirmarSenha = document.getElementById('confirmarSenha').value

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem")
            return
        }

        fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`)
            .then(res => res.json())
            .then(usuariosEmail => {
                if (usuariosEmail.length > 0) {
                    alert("Já existe um cadastro com este e-mail")
                    return
                }

                fetch(`http://localhost:3000/usuarios?usuario=${encodeURIComponent(usuario)}`)
                    .then(res => res.json())
                    .then(usuariosUsuario => {
                        if (usuariosUsuario.length > 0) {
                            alert("Este nome de usuário já está em uso")
                            return
                        }

                        let dadosUsuario = {
                            nome,
                            sobrenome,
                            email,
                            usuario,
                            senha
                        }

                        console.log("Usuário cadastrado: ", dadosUsuario)

                        fetch('http://localhost:3000/usuarios', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dadosUsuario)
                        })
                            .then(resposta => {
                                if (resposta.ok) {
                                    alert("Usuário cadastrado com sucesso")
                                    window.location.href = '../login/login.html'
                                } else {
                                    alert("Erro ao cadastrar usuário")
                                }
                            })
                            .catch(erro => {
                                console.error('Erro na requisição:', erro)
                                alert('Erro na conexão com o servidor')
                            })
                    })
            })
    })
})