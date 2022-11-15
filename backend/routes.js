const express = require("express")
const routes = express.Router()
const DashboardController = require ('./controllers/DashboardController')


// Carrega Pessoas
routes.post('/pessoas', DashboardController.carregaPessoas);

// Carrega o proximo ID da Pessoas
routes.post('/pessoas-proximo-id', DashboardController.PessoasProximoId);

// Salva Pessoas
routes.post('/insere-pessoas', DashboardController.inserePessoas);

// Atualizar Pessoas
routes.post('/atualiza-pessoas', DashboardController.atualizaPessoas);

// Deleta Pessoas
routes.post('/deleta-pessoas', DashboardController.deletaPessoas);

// Busca Ultima Matricula
routes.post('/matriculas', DashboardController.buscaProximoNumeroMatricula);

// Busca tipos pessoa
routes.post('/tipos-pessoa', DashboardController.buscaTiposPessoa);

// Carrega Alunos
routes.post('/alunos', DashboardController.carregaAlunos);



// Carrega Cursos
routes.post('/cursos', DashboardController.carregaCursosDisciplinas);

// Carrega Cursos do aluno
routes.post('/cursos-aluno', DashboardController.carregaCursosAluno);

// Carrega o proximo ID do Curso
routes.post('/cursos-proximo-id', DashboardController.cursosProximoId);

// Salva Cursos
routes.post('/insere-cursos', DashboardController.insereCursos);

// Atualizar Cursos
routes.post('/atualiza-cursos', DashboardController.atualizaCursos);

// Deleta Cursos
routes.post('/deleta-cursos', DashboardController.deletaCursos);

// Carrega Curso Disciplinas
routes.post('/cursos-disciplinas', DashboardController.carregaCursosDisciplinasNotas);


// Carrega Disciplinas
routes.post('/disciplinas', DashboardController.carregaDisciplinas);

// Carrega o proximo ID do Disciplina
routes.post('/disciplina-proximo-id', DashboardController.disciplinaProximoId);

// Atualizar Disciplina
routes.post('/atualiza-disciplinas', DashboardController.atualizaDisciplinas);

// Deleta Disciplinas
routes.post('/deleta-disciplinas', DashboardController.deletaDisciplinas);

// Salva Disciplina
routes.post('/insere-disciplinas', DashboardController.insereDisciplinas);




// Deleta Curso Disciplinas
routes.post('/deleta-disciplina-curso', DashboardController.deletaDisciplinaCurso);

// Deleta Curso Contratado
routes.post('/deleta-curso-contratado', DashboardController.deletaCursoContratado);

// Salva as notas das disciplinas
routes.post('/salva-notas-disciplinas', DashboardController.salvaNotasDisciplinas);

// Carrega professores
routes.post('/carrega-professores', DashboardController.carregaProfessores);

// Utilizada para os dados de acesso do login
routes.post('/login', DashboardController.usuarios);




module.exports = routes;