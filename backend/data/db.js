

let cursos = [
    {id: 1, nome: 'Analise de Sistemas'},
    {id: 2, nome: 'Medicina'},
    {id: 3, nome: 'Direito'},
    {id: 4, nome: 'Administração'},
    {id: 5, nome: 'Marketing'}
];

let disciplinas = [
    {id: 1, nome: 'GER - Introdução ao Universitário', professor_id: 8},
    {id: 2, nome: 'ANS - Análise Estruturada de Sistemas', professor_id: 8},
    {id: 3, nome: 'ANS - Análise Orientada a Objetos', professor_id: 7},
    {id: 4, nome: 'ANS - Desenvolvimento de Software Seguro', professor_id: 6},
    {id: 5, nome: 'MKT - Introdução ao Marketing', professor_id: 8},
    {id: 6, nome: 'MKT - Design e inovação', professor_id: 7},
    {id: 7, nome: 'MKT - Marketing Digital', professor_id: 6},
    {id: 8, nome: 'MED - Anatomia', professor_id: 8},
    {id: 9, nome: 'MED - Biologia celular e molecular', professor_id: 7},
    {id: 10, nome: 'MED - Histologia', professor_id: 6},
    {id: 11, nome: 'DIR - Introdução ao Direito', professor_id: 8},
    {id: 12, nome: 'DIR - Direito Civil', professor_id: 7},
    {id: 13, nome: 'DIR - Direito Constitucional', professor_id: 6},
    {id: 14, nome: 'ADM - Finanças e Orçamentos', professor_id: 8},
    {id: 15, nome: 'ADM - Materiais, Produção e Logística', professor_id: 7},
    {id: 16, nome: 'ADM - Planejamento Estratégico', professor_id: 6},
];

let Cursodisciplinas = [
    {id: 1, curso_id: '1', disciplina_id: 1, semestre: 1},
    {id: 2, curso_id: '1', disciplina_id: 2, semestre: 2},
    {id: 3, curso_id: '1', disciplina_id: 3, semestre: 3},
    {id: 4, curso_id: '1', disciplina_id: 4, semestre: 4},
    {id: 5, curso_id: '2', disciplina_id: 1, semestre: 1},
    {id: 6, curso_id: '2', disciplina_id: 8, semestre: 2},
    {id: 7, curso_id: '2', disciplina_id: 9, semestre: 3},
    {id: 8, curso_id: '2', disciplina_id: 10, semestre: 4},
    {id: 9, curso_id: '3', disciplina_id: 1, semestre: 1},
    {id: 10, curso_id: '3', disciplina_id: 11, semestre: 2},
    {id: 11, curso_id: '3', disciplina_id: 12, semestre: 3},
    {id: 12, curso_id: '3', disciplina_id: 13, semestre: 4},
    {id: 13, curso_id: '4', disciplina_id: 1, semestre: 1},
    {id: 14, curso_id: '4', disciplina_id: 14, semestre: 2},
    {id: 15, curso_id: '4', disciplina_id: 15, semestre: 3},
    {id: 16, curso_id: '4', disciplina_id: 16, semestre: 4},
    {id: 17, curso_id: '5', disciplina_id: 1, semestre: 1},
    {id: 18, curso_id: '5', disciplina_id: 5, semestre: 2},
    {id: 19, curso_id: '5', disciplina_id: 6, semestre: 3},
    {id: 20, curso_id: '5', disciplina_id: 7, semestre: 4},
  
];

let pessoas = [
    {id: 1, nome: 'Marcelo Pires', data_nascimento: '22/01/1990', numeroMatriculaAluno: 100, pessoa_tipo: 1},
    {id: 2, nome: 'Bruna Fontana', data_nascimento: '22/02/1989', numeroMatriculaAluno: 101, pessoa_tipo: 1},
    {id: 3, nome: 'Gabriel Gates', data_nascimento: '22/04/1988', numeroMatriculaAluno: 102, pessoa_tipo: 1},
    {id: 4, nome: 'Ana Carollina', data_nascimento: '22/01/1990', numeroMatriculaAluno: 103, pessoa_tipo: 1},
    {id: 5, nome: 'Jorge Santos', data_nascimento: '22/02/1989', numeroMatriculaAluno: 104, pessoa_tipo: 1},
    {id: 6, nome: 'Alex', data_nascimento: '22/04/1988', pessoa_tipo: 2},
    {id: 7, nome: 'Ana', data_nascimento: '22/04/1988', pessoa_tipo: 2},
    {id: 8, nome: 'Julia', data_nascimento: '22/04/1988', pessoa_tipo: 2},
    {id: 9, nome: 'Fernando', data_nascimento: '01/08/1993', numeroMatriculaAluno: 107, pessoa_tipo: 1},
];

let pessoasTipo = [
    {id: 1, nome: 'Aluno'},
    {id: 2, nome: 'Professor'},
];

let professorSalario = [
    {id: 1, salario: 12800, pessoa_id: 6},
    {id: 2, salario: 10200, pessoa_id: 7},
    {id: 3, salario: 14500, pessoa_id: 8},
];

let alunos = [
    {id: 1, curso_id: 1, pessoa_id: 1, matricula: 001},
    {id: 2, curso_id: 2, pessoa_id: 2, matricula: 002},
    {id: 3, curso_id: 3, pessoa_id: 3, matricula: 003},
    {id: 4, curso_id: 5, pessoa_id: 4, matricula: 004},
    {id: 5, curso_id: 4, pessoa_id: 5, matricula: 005},
    {id: 6, curso_id: 4, pessoa_id: 9, matricula: 006},
    
];

let notas = [
    {id: 1, aluno_id: 1, cursodisciplina_id: 1, nota: 10.0},
    {id: 2, aluno_id: 1, cursodisciplina_id: 2, nota: 9.2},
    {id: 3, aluno_id: 1, cursodisciplina_id: 3, nota: 8.0},
    {id: 4, aluno_id: 1, cursodisciplina_id: 4, nota: 5.0},
    
    {id: 5, aluno_id: 2, cursodisciplina_id: 5, nota: 10.0},
    {id: 6, aluno_id: 2, cursodisciplina_id: 6, nota: 9.8},
    {id: 7, aluno_id: 2, cursodisciplina_id: 7, nota: 8.8},
    {id: 8, aluno_id: 2, cursodisciplina_id: 8, nota: 7.0},

    {id: 9, aluno_id: 3, cursodisciplina_id: 9, nota: 10.0},
    {id: 10, aluno_id: 3, cursodisciplina_id: 10, nota: 9.0},
    {id: 11, aluno_id: 3, cursodisciplina_id: 11, nota: 9.8},
    {id: 12, aluno_id: 3, cursodisciplina_id: 12, nota: 9.0},

    {id: 13, aluno_id: 4, cursodisciplina_id: 17, nota: 10.0},
    {id: 14, aluno_id: 4, cursodisciplina_id: 18, nota: 9.0},
    {id: 15, aluno_id: 4, cursodisciplina_id: 19, nota: 8.2},
    {id: 16, aluno_id: 4, cursodisciplina_id: 20, nota: 5.8},

    {id: 17, aluno_id: 5, cursodisciplina_id: 13, nota: 10.0},
    {id: 18, aluno_id: 5, cursodisciplina_id: 14, nota: 9.2},
    {id: 19, aluno_id: 5, cursodisciplina_id: 15, nota: 8.0},
    {id: 20, aluno_id: 5, cursodisciplina_id: 16, nota: 5.0},

    {id: 21, aluno_id: 6, cursodisciplina_id: 13, nota: 10.0},
    {id: 22, aluno_id: 6, cursodisciplina_id: 14, nota: 9.2},
    {id: 23, aluno_id: 6, cursodisciplina_id: 15, nota: 8.0},
    {id: 24, aluno_id: 6, cursodisciplina_id: 16, nota: 5.0},
];

let usuarios = [
    {usuario: 'Magnifinance', senha: '1'},
    {usuario: 'Usuario', senha: '1'},
    {usuario: 'Fernando', senha: '1'}
];

module.exports = {
    cursos,
    disciplinas,
    Cursodisciplinas,
    pessoas,
    pessoasTipo,
    professorSalario,
    alunos,
    notas,
    usuarios
};