

let cursos = [
    {id: 1, nome: 'Analise de Sistemas'},
    {id: 2, nome: 'Medicina'},
    {id: 3, nome: 'Direito'},
    {id: 3, nome: 'Administração'}
];

let disciplina = [
    {id: 1, nome: 'logica de programação', curso_id: 1, semestre: 1, professor_id: 1},
];

let pessoa = [
    {id: 1, nome: 'Mauro', data_nascimento: '22/01/1990', numeroMatriculaAluno: 100},
    {id: 2, nome: 'Lucas', data_nascimento: '22/02/1989', numeroMatriculaAluno: 101},
    {id: 3, nome: 'Julia', data_nascimento: '22/04/1988', numeroMatriculaAluno: 102},
];

let professorSalario = [
    {id: 1, salario: 2000, pessoa_id: 1},
];

let aluno = [
    {id: 1, curso_id: 1, pessoa_id: 1, matricula: 001}
];

let nota = [
    {id: 1, aluno_id: 1, disciplina_id: 1, nota: 7}
];

module.exports = {
    cursos,
    disciplina,
    pessoa,
    professorSalario,
    aluno,
    nota
};