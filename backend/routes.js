const express = require("express")
const routes = express.Router()
const DashboardController = require ('./controllers/DashboardController')


// Carrega Pessoas
routes.post('/pessoas', DashboardController.carregaPessoas);

// Carrega o proximo ID da Pessoas
routes.get('/pessoas-proximo-id', DashboardController.PessoasProximoId);

// Salva Pessoas
routes.post('/insere-pessoas', DashboardController.inserePessoas);

// Atualizar Pessoas
routes.put('/atualiza-pessoas', DashboardController.atualizaPessoas);

// Deleta Pessoas
routes.post('/deleta-pessoas', DashboardController.deletaPessoas);

// Busca Ultima Matricula
routes.get('/matriculas', DashboardController.buscaProximoNumeroMatricula);

// Busca Ultima Matricula
routes.get('/tipos-pessoa', DashboardController.buscaTiposPessoa);



// Carrega Pessoas
routes.post('/alunos', DashboardController.carregaAlunos);




// Carrega Cursos
routes.post('/cursos', DashboardController.carregaCursos);

// Carrega Cursos do aluno
routes.post('/cursos-aluno', DashboardController.carregaCursosAluno);

// Carrega o proximo ID do Curso
routes.get('/cursos-proximo-id', DashboardController.cursosProximoId);

// Salva Cursos
routes.post('/insere-cursos', DashboardController.insereCursos);

// Atualizar Cursos
routes.put('/atualiza-cursos', DashboardController.atualizaCursos);

// Deleta Cursos
routes.post('/deleta-cursos', DashboardController.deletaCursos);




// Carrega Disciplinas
routes.post('/disciplinas', DashboardController.carregaDisciplinas);

// Carrega o proximo ID do Disciplina
routes.get('/disciplina-proximo-id', DashboardController.disciplinaProximoId);

// Atualizar Disciplina
routes.put('/atualiza-disciplinas', DashboardController.atualizaDisciplinas);

// Deleta Disciplinas
routes.post('/deleta-disciplinas', DashboardController.deletaDisciplinas);

// Salva Disciplina
routes.post('/insere-disciplinas', DashboardController.insereDisciplinas);



// Carrega Curso Disciplinas
routes.post('/cursos-disciplinas', DashboardController.carregaCursosDisciplinas);

// Carrega Curso Disciplinas
routes.post('/salva-notas-disciplinas', DashboardController.salvaNotasDisciplinas);




module.exports = routes;