const db = require('../data/db')
	
module.exports = { 

    // Carrega Pessoas
    async carregaPessoas(req, res) {
        let bind = req.body.id
        
        
        if (bind != undefined) {
            bind = parseInt(req.body.id)
            let pessoaCarregada = []
            for (let i = 0; i < db.pessoa.length; i++) {
                if (db.pessoa[i].id == bind) {
                    
                    // Adiciona a pessoa no array
                    pessoaCarregada.push(db.pessoa[i])

                    if (pessoaCarregada[0].tipo == 'Professor') {
                        // Adicionar no array o salario do professor
                        for (let i = 0; i < db.professorSalario.length; i++) {
                            if (db.professorSalario[i].pessoa_id == pessoaCarregada[0].id) {
                                pessoaCarregada[0].salarioProfessor = db.professorSalario[i].salarioProfessor
                            };
                            
                        }
                    }

                    res.send(pessoaCarregada)            
                };
                
            }
        } else {
            res.send(db.pessoa)
        }
    },

    // Insere Pessoas
    async inserePessoas(req, res) {

        try {

            // Monta objeto para inserir nova pessoa
            pessoa = {
                id: req.body.id, nome: req.body.nome, 
                data_nascimento: req.body.data_nascimento, 
                tipo: req.body.tipo, 
                numeroMatriculaAluno: req.body.numeroMatriculaAluno,
            }

            // Insere a Pessoa e faz as inserções nos devidos objetos ligados
            db.pessoa.push(pessoa)

            // Caso o tipo seja professor, insere nos objetos de Professor
            if (pessoa.tipo == 'Professor') {
                // Variavel utilizada para pegar o proximo ID do salario do professor
                let proximoIdProfessor = db.professorSalario[db.professorSalario.length - 1]
                
                // Verifica se o ID é undefined e atribui 1 caso sim
                if (proximoIdProfessor == undefined) {
                    proximoIdProfessor = 1
                }
                // Monta objeto para inserir salario da pessoa (professor)
                professorSalario = {
                    id: proximoIdProfessor.id + 1,
                    salarioProfessor: req.body.salarioProfessor,
                    pessoa_id: pessoa.id
                }

                // Insere o salario da pessoa (professor) no Objeto
                db.professorSalario.push(professorSalario)
            }

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 

    },

    // Atualiza Pessoas
    async atualizaPessoas(req, res) {
        try {

            // Monta objeto para com informações a atualizar
            pessoa = {
                id: req.body.id, nome: req.body.nome, 
                data_nascimento: req.body.data_nascimento, 
                tipo: req.body.tipo, 
                numeroMatriculaAluno: req.body.numeroMatriculaAluno,
                salarioProfessor: req.body.salarioProfessor
            }
            
            // Atualiza Objeto
            for (let i = 0; i < db.pessoa.length; i++) {
                if (db.pessoa[i].id == pessoa.id) {
                    db.pessoa[i].nome = pessoa.nome
                    db.pessoa[i].data_nascimento = pessoa.data_nascimento
                    db.pessoa[i].tipo = pessoa.tipo
                    db.pessoa[i].numeroMatriculaAluno = pessoa.numeroMatriculaAluno
                };
                
            }

            // Caso o tipo seja professor, encontra a pessoa_id do professor e atualiza o salario
            if (pessoa.tipo == 'Professor') {
                for (let i = 0; i < db.professorSalario.length; i++) {
                    if (db.professorSalario[i].pessoa_id == pessoa.id) {
                        db.professorSalario[i].salarioProfessor = pessoa.salarioProfessor
                    }
                    
                }
            }

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Deleta Pessoa
    async deletaPessoas(req, res) {
        try {

            // Monta objeto
            pessoa = {
                id: req.body.id, nome: req.body.nome, 
                data_nascimento: req.body.data_nascimento, 
                tipo: req.body.tipo, 
                numeroMatriculaAluno: req.body.numeroMatriculaAluno,
            }

            for (let i = 0; i < db.pessoa.length; i++) {
                if (db.pessoa[i].id == pessoa.id) {
                    db.pessoa.splice(i, 1)
                }
            }

            // Caso o tipo seja professor, insere nos objetos de Professor
            if (pessoa.tipo == 'Professor') {
                for (let i = 0; i < db.professorSalario.length; i++) {
                    if (db.professorSalario[i].pessoa_id == pessoa.id) {
                        db.professorSalario.splice(db.professorSalario[i])
                    }
                }
            }

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Utilizado para buscar o proximo numero de matricula
    async BuscaProximoNumeroMatricula(req, res) {
        let ultimaPessoaCadastrada = db.pessoa[db.pessoa.length - 1]
        let proximoNumeroMatricula = []
        if (ultimaPessoaCadastrada != undefined) {
            proximoNumeroMatricula.push(ultimaPessoaCadastrada.numeroMatriculaAluno + 1)
        } else {
            let PrimeiraMatricula = 99
            proximoNumeroMatricula.push(PrimeiraMatricula + 1)
        }
        res.send(proximoNumeroMatricula)
    },

    // Utilizado para buscar o proximo ID
    async ProximoId(req, res) {
        let ultimaPessoaCadastrada = db.pessoa[db.pessoa.length - 1]
        let ProximoId = []
        if (ultimaPessoaCadastrada != undefined) {
            ProximoId.push(ultimaPessoaCadastrada.id + 1)
        } else {
            let PrimeiroId = 0
            ProximoId.push(PrimeiroId + 1)
        }
        res.send(ProximoId)
    },



}