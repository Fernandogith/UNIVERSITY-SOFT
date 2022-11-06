const db = require('../data/db')
	
module.exports = { 

    // Carrega Pessoas
    async carregaPessoas(req, res) {

        return res.send(db.pessoa)

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

            // Variavel utilizada para pegar o proximo ID do salario do professor
            let proximoIdProfessor = db.professorSalario[db.professorSalario.length - 1]
            // Monta objeto para inserir salario da pessoa (professor)
            professorSalario = {
                id: proximoIdProfessor.id + 1,
                salarioProfessor: req.body.salarioProfessor,
                pessoa_id: pessoa.id
            }
            
            // Insere a Pessoa e faz as inserções nos devidos objetos ligados
            db.pessoa.push(pessoa)
            
            // Insere o salario da pessoa (professor) no Objeto
            db.professorSalario.push(professorSalario)

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 

    },

    async ultimoNumeroMatricula(req, res) {
        let ultimaPessoaCadastrada = db.pessoa[db.pessoa.length - 1]
        let proximoNumeroMatricula = []
        proximoNumeroMatricula.push(ultimaPessoaCadastrada.numeroMatriculaAluno + 1)
        res.send(proximoNumeroMatricula)
    },

}