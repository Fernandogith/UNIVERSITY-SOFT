

let cursos = [
    {id: 1, nome: 'Analise de Sistemas'},
    {id: 2, nome: 'Medicina'},
    {id: 3, nome: 'Direito'},
    {id: 4, nome: 'Administração'}
];

let disciplinas = [
    {id: 1, nome: 'logica de programação', professor_id: 1},
    {id: 2, nome: 'HTML', professor_id: 1},
    {id: 3, nome: 'CSS/SASS', professor_id: 2},
    {id: 4, nome: 'ADM', professor_id: 2},
];

let Cursodisciplinas = [
    {id: 1, curso_id: '1', disciplina_id: 1, semestre: 1},
    {id: 2, curso_id: '1', disciplina_id: 2, semestre: 1},
    {id: 3, curso_id: '2', disciplina_id: 3, semestre: 1},
    {id: 4, curso_id: '2', disciplina_id: 4, semestre: 1},
    {id: 5, curso_id: '3', disciplina_id: 1, semestre: 1},
    {id: 6, curso_id: '3', disciplina_id: 2, semestre: 1},
    {id: 7, curso_id: '4', disciplina_id: 3, semestre: 1},
    {id: 8, curso_id: '4', disciplina_id: 4, semestre: 1},
];

let pessoas = [
    {id: 1, nome: 'Mauro', data_nascimento: '22/01/1990', numeroMatriculaAluno: 100, pessoa_tipo: 1},
    {id: 2, nome: 'Lucas', data_nascimento: '22/02/1989', pessoa_tipo: 2},
    {id: 3, nome: 'Julia', data_nascimento: '22/04/1988', numeroMatriculaAluno: 101, pessoa_tipo: 1},
    {id: 4, nome: 'Mauro', data_nascimento: '22/01/1990', numeroMatriculaAluno: 102, pessoa_tipo: 1},
    {id: 5, nome: 'Lucas', data_nascimento: '22/02/1989', pessoa_tipo: 2},
    {id: 6, nome: 'Juliana', data_nascimento: '22/04/1988', numeroMatriculaAluno: 103, pessoa_tipo: 1},
    {id: 7, nome: 'Paula', data_nascimento: '22/04/1988', numeroMatriculaAluno: 104, pessoa_tipo: 1},
    {id: 8, nome: 'Ana', data_nascimento: '22/04/1988', numeroMatriculaAluno: 105, pessoa_tipo: 1},
    {id: 9, nome: 'Bruno', data_nascimento: '22/04/1988', numeroMatriculaAluno: 106, pessoa_tipo: 1},
    {id: 10, nome: 'Camila', data_nascimento: '22/04/1988', numeroMatriculaAluno: 107, pessoa_tipo: 1},
];

let pessoasTipo = [
    {id: 1, nome: 'Aluno'},
    {id: 2, nome: 'Professor'},
];

let professorSalario = [
    {id: 1, salario: 2000, pessoa_id: 1},
    {id: 1, salario: 2000, pessoa_id: 1},
];

let alunos = [
    {id: 1, curso_id: 1, pessoa_id: 1, matricula: 001},
    {id: 2, curso_id: 2, pessoa_id: 3, matricula: 002},
    {id: 3, curso_id: 2, pessoa_id: 4, matricula: 003},
    {id: 4, curso_id: 2, pessoa_id: 6, matricula: 004},
    {id: 5, curso_id: 3, pessoa_id: 7, matricula: 005},
    {id: 6, curso_id: 4, pessoa_id: 8, matricula: 006},
    {id: 7, curso_id: 3, pessoa_id: 8, matricula: 007},
    {id: 8, curso_id: 3, pessoa_id: 8, matricula: 010},
    
];

let notas = [
    {id: 1, aluno_id: 1, disciplina_id: 1, nota: 7}
];

module.exports = {
    cursos,
    disciplinas,
    Cursodisciplinas,
    pessoas,
    pessoasTipo,
    professorSalario,
    alunos,
    notas
};