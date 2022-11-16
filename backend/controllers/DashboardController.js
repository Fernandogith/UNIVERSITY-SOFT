const { filter } = require('lodash')
const db = require('../data/db')
	
module.exports = { 

    // Carrega Pessoas
    async carregaPessoas(req, res) {
        
        let bind = req.body.id
        
        // Verifica se quer carregar apenas 1 pessoa
        if (bind != undefined) {
            bind = parseInt(req.body.id)
            let pessoaCarregada = []
            // Encontra a pessoa solicitada
            for (let i = 0; i < db.pessoas.length; i++) {

                if (db.pessoas[i].id == bind) {
                    
                    // Adiciona a pessoa ao array que será utilizado para o retorno
                    pessoaCarregada.push(db.pessoas[i])


                    // Adiciona o objeto de tipo da pessoa ao objeto de retorno
                    for (let i = 0; i < db.pessoasTipo.length; i++) {
                        if (pessoaCarregada[0].pessoa_tipo == db.pessoasTipo[i].id) {
                            pessoaCarregada[0].pessoa_tipo = db.pessoasTipo[i]
                        };
                    }

                    // Verifica se a pessoa é do tipo aluno, caso sim, manda as informações de cursos contratados do objeto aluno
                    if (pessoaCarregada[0].tipo == 1) {
                        pessoaCarregada[0].cursosAluno = []
                        for (let i = 0; i < db.alunos.length; i++) {
                            if (db.alunos[i].pessoa_id == pessoaCarregada[0].id) {
                                pessoaCarregada[0].cursosAluno.push(db.alunos[i])
                            };
                        }

                        // Deleta o id de dentro do objeto cursosAluno para evitar confusão
                        for (let i = 0; i < pessoaCarregada[0].cursosAluno.length; i++) {
                            delete pessoaCarregada[0].cursosAluno[i].id;
                        }
                        
                        // Adiciona nome do curso ao objeto do aluno
                        for (let i = 0; i < pessoaCarregada[0].cursosAluno.length; i++) {
                            for (let y = 0; y < db.cursos.length; y++) {
                                if (pessoaCarregada[0].cursosAluno[i].curso_id == db.cursos[y].id) {
                                    pessoaCarregada[0].cursosAluno[i].nome = db.cursos[y].nome   
                                }   
                            }   
                        } 
                    }

                    // Verifica se a pessoa é um professor e caso seja adiciona o salario no objeto de retorno
                    if (pessoaCarregada[0].tipo == 2) {
                        // Adicionar no array o salario do professor
                        for (let i = 0; i < db.professorSalario.length; i++) {
                            if (db.professorSalario[i].pessoa_id == pessoaCarregada[0].id) {
                                pessoaCarregada[0].salarioProfessor = db.professorSalario[i].salario
                            };
                        }
                    }

                    res.send(pessoaCarregada)            
                };
            }

        } else {

            // Caso chegue aqui, significa que quer carregar todas as pessoas
            let arrPessoas = []
            let objPessoas = {}
            db.pessoas.forEach(pessoa => {

                objPessoas = {
                    id: pessoa.id, 
                    nome: pessoa.nome, 
                    data_nascimento: pessoa.data_nascimento,
                    numeroMatriculaAluno: pessoa.numeroMatriculaAluno, 
                    tipo: pessoa.tipo,
                    pessoa_tipo_descricao: pessoa.tipo == 1 ? 'Aluno' : 'Professor'
                }
                arrPessoas.push(objPessoas)
            });

            res.send(arrPessoas)
            
        }
    },

    // Insere Pessoas
    async inserePessoas(req, res) {

        try {
            
            // Monta objeto para inserir nova pessoa
            objPessoa = {
                id: req.body.id, nome: req.body.nome, 
                data_nascimento: req.body.data_nascimento, 
                tipo: req.body.tipo, 
                numeroMatriculaAluno: req.body.numeroMatriculaAluno,
            }
            
            // Insere a Pessoa e faz as inserções nos devidos objetos ligados
            db.pessoas.push(objPessoa)

            if (parseInt(objPessoa.tipo) == 1) {
                req.body.infos_aluno.forEach(curso => {
                    aluno = {
                        id: db.alunos[db.alunos.length - 1].id + 1, 
                        curso_id: curso.curso_id, 
                        pessoa_id: objPessoa.id, 
                        matricula: objPessoa.numeroMatriculaAluno
                    }
                    db.alunos.push(aluno)
                });
            }


            // Caso o tipo seja professor, insere nos objetos de Professor
            if (objPessoa.tipo == 2) {
                // Variavel utilizada para pegar o proximo ID do salario do professor
                let proximoIdProfessor = db.professorSalario[db.professorSalario.length - 1]
                
                // Verifica se o ID é undefined e atribui 1 caso sim
                if (proximoIdProfessor == undefined) {
                    proximoIdProfessor = 1
                }
                // Monta objeto para inserir salario da pessoa (professor)
                professorSalario = {
                    id: proximoIdProfessor.id + 1,
                    salario: req.body.salarioProfessor,
                    pessoa_id: objPessoa.id
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
            objPessoa = {
                id: req.body.id, nome: req.body.nome, 
                data_nascimento: req.body.data_nascimento, 
                tipo: req.body.tipo == 1 || req.body.tipo == 2 ? req.body.tipo : req.body.tipo == 'Aluno' ? 1 : 2,
                numeroMatriculaAluno: req.body.numeroMatriculaAluno,
                salarioProfessor: req.body.salarioProfessor
            }
            
            
            // Atualiza Objeto
            for (let i = 0; i < db.pessoas.length; i++) {
                if (db.pessoas[i].id == objPessoa.id) {
                    db.pessoas[i].nome = objPessoa.nome
                    db.pessoas[i].data_nascimento = objPessoa.data_nascimento
                    db.pessoas[i].tipo = objPessoa.tipo
                    db.pessoas[i].numeroMatriculaAluno = objPessoa.numeroMatriculaAluno
                };    
            }


            // Se o tipo da pessoa for aluno, atualiza os cursos
            if (objPessoa.tipo == 1 || objPessoa.tipo == "Aluno") {

                for (let i = 0; i < req.body.infos_aluno.length; i++) {

                        if (req.body.infos_aluno[i].matricula == undefined) {
                            req.body.infos_aluno[i].matricula = objPessoa.numeroMatriculaAluno

                            let novoAluno = {
                                id: db.alunos[db.alunos.length - 1].id + 1, 
                                curso_id: req.body.infos_aluno[i].curso_id,
                                matricula: objPessoa.numeroMatriculaAluno,
                                pessoa_id: req.body.infos_aluno[i].pessoa_id
                            }
                            db.alunos.push(novoAluno)
                        }
                        
                    }
                    
                }

            // Caso o tipo seja professor, encontra a pessoa_id do professor e atualiza o salario
            if (objPessoa.tipo == 2) {
                for (let i = 0; i < db.professorSalario.length; i++) {
                    if (db.professorSalario[i].pessoa_id == objPessoa.id) {
                        db.professorSalario[i].salario = objPessoa.salarioProfessor
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
            objPessoa = {
                id: req.body.id, 
                nome: req.body.nome, 
                data_nascimento: req.body.data_nascimento, 
                tipo: req.body.tipo, 
                numeroMatriculaAluno: req.body.numeroMatriculaAluno,
            }

            // Deleta pessoa da db.pessoas
            for (let i = 0; i < db.pessoas.length; i++) {
                if (db.pessoas[i].id == objPessoa.id) {
                    db.pessoas.splice(i, 1)
                }
            }

            // Deleta registro de aluno da pessoa
            for (let i = 0; i < db.alunos[0].length; i++) {
                if (db.alunos[i].pessoa_id == objPessoa.id) {
                    db.alunos[i].splice(i, 1)
                }
            }

            // Caso o tipo seja professor, insere nos objetos de Professor
            if (objPessoa.tipo == 'Professor' || '2' || 2) {
                for (let i = 0; i < db.professorSalario.length; i++) {
                    if (db.professorSalario[i].pessoa_id == objPessoa.id) {
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
    async buscaProximoNumeroMatricula(req, res) {
        let ultimaPessoaCadastrada = db.pessoas[db.pessoas.length - 1]
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
    async PessoasProximoId(req, res) {
        let ultimaPessoaCadastrada = db.pessoas[db.pessoas.length - 1]
        let ProximoId = []
        if (ultimaPessoaCadastrada != undefined) {
            ProximoId.push(ultimaPessoaCadastrada.id + 1)
        } else {
            let PrimeiroId = 0
            ProximoId.push(PrimeiroId + 1)
        }
        res.send(ProximoId)
    },

    // Utilizado para buscar os tipos de pessoa
    async buscaTiposPessoa(req, res) {
        res.send(db.pessoasTipo)
    },

    // Utilizada para carregar os professores
    async carregaProfessores(req, res) {

        let professoresCarregados = []
        for (let i = 0; i < db.pessoas.length; i++) {
            // Encontra a pessoa solicitada
            if (db.pessoas[i].tipo == 2) {
                
                // Adiciona a pessoa ao array que será utilizado para o retorno
                professoresCarregados.push(db.pessoas[i])
            }
        }
        res.send(professoresCarregados)
    },

    // Carrega Alunos
    async carregaAlunos(req, res) {
        let bind = req.body.id
        
        
        if (bind != undefined) {
            bind = parseInt(req.body.id)
            let alunosCarregados = []
            for (let i = 0; i < db.alunos.length; i++) {
                if (db.alunos[i].id == bind) {
                    
                    // Adiciona a pessoa no array
                    alunosCarregados.push(db.pessoas[i])
                }

            }
            res.send(alunosCarregados)
        }
    },

    // Carrega Cursos
    async carregaCursosDisciplinas(req, res) {

        // Criação do objeto de retorno
        let CursosDisciplinas = {}
        
        
        // Verifica se algum curso foi filtrado
        if (req.body.id != undefined) {

            // Adiciona ao objeto de retorno, o curso selecionado
            CursosDisciplinas = db.cursos.filter(item => {
                return item.id == req.body.id
            })


            // Adiciona ao objeto de retorno, as disciplinas ligadas ao curso selecionado
            CursosDisciplinas[0].disciplinas = [] 

            db.Cursodisciplinas.filter(item => {
                if (item.curso_id == CursosDisciplinas[0].id) {
                    CursosDisciplinas[0].disciplinas.push({id: item.disciplina_id, semestre: item.semestre})
                }
            })
            
            
            // Adiciona ao objeto de retorno, o nome das disciplinas
            for (let i = 0; i < CursosDisciplinas[0].disciplinas.length; i++) {
                db.disciplinas.filter(item => {
                    if (CursosDisciplinas[0].disciplinas[i].id == item.id) {
                        CursosDisciplinas[0].disciplinas[i].nome = item.nome
                    }
                })
            }


            // Resposta ao Frontend
            res.send(CursosDisciplinas)


        // Adiciona ao objeto de retorno, todos os cursos caso nenhum tenha sido filtrado
        } else {
            // Adiciona ao objeto de retorno, todos os cursos
            CursosDisciplinas = db.cursos


            // Resposta ao Frontend
            res.send(CursosDisciplinas)


        }

    },

    // Carrega Disciplinas do curso
    async carregaCursosDisciplinasNotas(req, res) {
        
        // Criação do objeto de retorno
        let cursosDisciplinasSelecionado = {}
        

        // Adiciona ao objeto de retorno, as disciplinas do curso selecionado
        cursosDisciplinasSelecionado = db.Cursodisciplinas.filter(item => {
            return item.curso_id == req.body.curso_id
        })


        // Adiciona ao objeto de retorno, o aluno vindo do frontend
        cursosDisciplinasSelecionado.forEach(item => {
            item.aluno_id = req.body.aluno_id
        });
        
        
        // Adiciona ao objeto de retrno, o nome das disciplinas adicionadas e o nome do professor
        for (let y = 0; y < cursosDisciplinasSelecionado.length; y++) {
            for (let i = 0; i < db.disciplinas.length; i++) {
                if (cursosDisciplinasSelecionado[y].disciplina_id == db.disciplinas[i].id) {
                    cursosDisciplinasSelecionado[y].nome_disciplina = db.disciplinas[i].nome
                    
                    // Adiciona ao objeto de retrno, o nome do professor
                    cursosDisciplinasSelecionado[y].professor = db.pessoas.filter(item => {
                         if (item.id == db.disciplinas[i].professor_id) {
                            return item.nome
                        }
                    })
                    cursosDisciplinasSelecionado[y].professor = cursosDisciplinasSelecionado[y].professor[0].nome
                }
            }
        }


        // Adiciona ao objeto de retorno o curso disciplina
        // for (let i = 0; i < cursosDisciplinasSelecionado.length; i++) {
        //     for (let y = 0; y < db.Cursodisciplinas.length; y++) {
        //         if (cursosDisciplinasSelecionado[i].curso_id == cursosDisciplinasSelecionado[i].curso_id && db.Cursodisciplinas[y].disciplina_id == db.Cursodisciplinas[y].disciplina_id) {
        //             cursosDisciplinasSelecionado[i].curso_disciplina = db.Cursodisciplinas[y].id
        //         }   
        //     }
        // }


        // Verifica se existe notas para o aluno selecionado
        let notasAluno = db.notas.filter(item => {
            return item.aluno_id == cursosDisciplinasSelecionado[0].aluno_id
        })

        // Adiciona ao objeto de retrno, as notas caso existam
        if (notasAluno.length > 0) {
            for (let i = 0; i < cursosDisciplinasSelecionado.length; i++) {
                for (let y = 0; y < notasAluno.length; y++) {
                    if (cursosDisciplinasSelecionado[i].id == notasAluno[y].cursodisciplina_id) {
                        cursosDisciplinasSelecionado[i].nota = notasAluno[y].nota
                    } 
                }
            }

        // Adiciona ao objeto de retrno, o item nota com null
        } else {
            for (let i = 0; i < cursosDisciplinasSelecionado.length; i++) {
                cursosDisciplinasSelecionado[i].nota = 00;
                
            }
        }


        
        // Resposta ao Frontend
        res.send(cursosDisciplinasSelecionado)
        
        
    },

    // Carrega Cursos Aluno
    async carregaCursosAluno(req, res) {
        let bind = req.body.id
        
        
        if (bind != undefined) {
            bind = parseInt(req.body.id)
            let cursosCarregados = []
            for (let i = 0; i < db.alunos.length; i++) {
                if (db.alunos[i].pessoa_id == bind) {
                    
                    for (let y = 0; y < db.cursos.length; y++) {
                        if (db.alunos[i].curso_id == db.cursos[y].id) {
                            cursosCarregados.push(db.cursos[y])
                        }
                        
                    }

                               
                };
                
                
            }
            res.send(cursosCarregados) 
        } else {
            res.send(db.cursos)
        }
    },

    // Insere Cursos
    async insereCursos(req, res) {

        try {

            // Monta objeto para inserir novo curso
            let curso = {
                id: req.body.curso_id, 
                nome: req.body.nome, 
            }

            // Insere o curso e faz as inserções nos devidos objetos ligados
            db.cursos.push(curso)

            let cursoDisciplinaAdd = {}
            for (let i = 0; i < req.body.disciplinas.length; i++) {
                cursoDisciplinaAdd = {
                    id: db.Cursodisciplinas[db.Cursodisciplinas.length - 1].id + 1,
                    curso_id: curso.id,
                    disciplina_id: req.body.disciplinas[i].disciplina_id,
                    semestre: req.body.disciplinas[i].semestre
                }   
                db.Cursodisciplinas.push(cursoDisciplinaAdd)
            }


            // Retorna o objeto agora com o novo curso inserido
            res.send('Sucesso')


        } catch (err) {
            res.status(500).send(err.message);
        } 

    },

    // Atualiza Cursos
    async atualizaCursos(req, res) {
        try {
        
        // Criação do objeto de retorno
        let CursosDisciplinas = {}
        

        // Criação do objeto de espera que receberá os dados vindos do frontend
        let objCursoDisciplinasRecebidos = {}
        
        
        // Atribuindo dados vindos do frontend para o objeto de espera
        objCursoDisciplinasRecebidos = req.body


        // Atualiza o nome do curso
        for (let i = 0; i < db.cursos.length; i++) {
            if (db.cursos[i].id == objCursoDisciplinasRecebidos.curso_id) {
                db.cursos[i].nome = objCursoDisciplinasRecebidos.nome
            }; 
        }
        

        // Remove o curso e suas disciplinas do objeto que registra essa ligação (db.Cursodisciplinas)
        for (let i = 0; i < db.Cursodisciplinas.length; i++) {  
            if (db.Cursodisciplinas[i].curso_id == objCursoDisciplinasRecebidos.curso_id) {
                db.Cursodisciplinas.splice(i,1)
                i = i-1
            }
        }


        // Adiciona o curso e suas disciplinas atualizadas novamente no objeto que registra a ligação (db.Cursodisciplinas) entre curso e disciplina
        objCursoDisciplinasRecebidos.disciplinas.forEach(disciplina => {
            let objLigacaoCursoDisciplina = {
                id: db.Cursodisciplinas[db.Cursodisciplinas.length - 1].id + 1,
                curso_id: objCursoDisciplinasRecebidos.curso_id, 
                disciplina_id: disciplina.id == undefined ? disciplina.disciplina_id : disciplina.id, 
                semestre: disciplina.semestre
            }
            db.Cursodisciplinas.push(objLigacaoCursoDisciplina)
        });


        // Retorna o objeto agora com a nova pessoa inserida
        res.send('Sucesso')

        
        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Deleta Cursos
    async deletaCursos(req, res) {
        try {

            // Monta objeto
            cursos = {
                id: req.body.id, 
                nome: req.body.nome, 
            }

            for (let i = 0; i < db.cursos.length; i++) {
                if (db.cursos[i].id == cursos.id) {
                    db.cursos.splice(i, 1)
                }
            }

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Utilizado para buscar o proximo ID
    async cursosProximoId(req, res) {
        let proximoId = db.cursos[db.cursos.length - 1].id + 1
        
        if (proximoId != undefined) {
            res.send({curso_id: proximoId})
        } else {
            proximoId = 1
            
            res.send({curso_id: proximoId})
        }

    },

    // Carrega Disciplinas
    async carregaDisciplinas(req, res) {
        let bind = req.body.id
        
   
        if (bind != undefined) {
            bind = parseInt(req.body.id)
            let disciplinaCarregada = []
            for (let i = 0; i < db.disciplinas.length; i++) {
                if (db.disciplinas[i].id == bind) {

                    // Adiciona a pessoa no array
                    disciplinaCarregada.push(db.disciplinas[i])

                };
            }
                 // Insere objeto do professor
                 for (let y = 0; y < db.pessoas.length; y++) {
                    if (disciplinaCarregada[0].professor_id == db.pessoas[y].id) {
                        disciplinaCarregada[0].professor = db.pessoas[y]
                        delete disciplinaCarregada[0].professor_id
                    }
                }
                

            res.send(disciplinaCarregada)


        } else {
            res.send(db.disciplinas)
        }
    },

    // Insere Disciplinas
    async insereDisciplinas(req, res) {

        try {

            // Monta objeto para inserir nova disciplinas
            disciplina = {
                id: req.body.id, 
                nome: req.body.nome, 
                professor_id: parseInt(req.body.professor.id)
            }


            // Insere a Disciplinas e faz as inserções nos devidos objetos ligados
            db.disciplinas.push(disciplina)


            // Retorna o objeto agora com o novo curso inserido
            res.send('Sucesso')


        } catch (err) {
            res.status(500).send(err.message);
        } 

    },

    // Atualiza Disciplinas
    async atualizaDisciplinas(req, res) {
        try {

            // Monta objeto para com informações a atualizar
            disciplina = {
                id: req.body.id, 
                nome: req.body.nome,
                professor_id: parseInt(req.body.professor.id)
            }
            
            // Atualiza Objeto
            for (let i = 0; i < db.disciplinas.length; i++) {
                if (db.disciplinas[i].id == disciplina.id) {
                    db.disciplinas[i].nome = disciplina.nome
                    db.disciplinas[i].professor_id = disciplina.professor_id
                }; 
            }


            // Retorna o objeto agora com a nova disciplina inserida
            res.send('Sucesso')


        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Deleta Disciplinas
    async deletaDisciplinas(req, res) {
        try {

            // Monta objeto
            disciplina = {
                id: req.body.id, 
            }

            for (let i = 0; i < db.disciplinas.length; i++) {
                if (db.disciplinas[i].id == disciplina.id) {
                    db.disciplinas.splice(i, 1)
                }
            }

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Utilizado para buscar o proximo ID
    async disciplinaProximoId(req, res) {
        
        let ultimaDisciplinaCadastrada = db.disciplinas[db.disciplinas.length - 1]
        
        let ProximoId = []
        
        if (ultimaDisciplinaCadastrada != undefined) {
            ProximoId.push(ultimaDisciplinaCadastrada.id + 1)
        
        } else {
            let PrimeiroId = 0
            ProximoId.push(PrimeiroId + 1)
        }
        
        res.send(ProximoId)

    },

    // Deleta Disciplinas
    async deletaDisciplinaCurso(req, res) {
        try {

            // Monta objeto
            disciplina = {
                disciplina_id: req.body.disciplina_id,
                curso_id: req.body.curso_id,
            }

            // Vereifica se o curso_id existe na db.Cursodisciplinas
            for (let i = 0; i < db.Cursodisciplinas.length; i++) {
                if (db.Cursodisciplinas[i].curso_id == disciplina.curso_id) {
                    // Caso exista, agora verifica se para esse curso existe a disciplina que deve ser excluida
                    for (let y = 0; y < db.Cursodisciplinas.length; y++) {
                        if (db.Cursodisciplinas[i].disciplina_id == disciplina.disciplina_id) {
                            // Caso exista, exclui
                            db.Cursodisciplinas.splice(i, 1)
                        }
                    }
                }
                
            }

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Deleta curso contratado pela pessoa/aluno
    async deletaCursoContratado(req, res) {
        try {

            // Monta objeto
            aluno = {
                pessoa_id: req.body.pessoa_id,
                curso_id: req.body.curso_id,
            }

            // Vereifica se o curso_id existe na db.Cursodisciplinas
            for (let i = 0; i < db.alunos.length; i++) {
                if (db.alunos[i].pessoa_id == aluno.pessoa_id) {
                    // Caso exista, agora verifica se para esse curso existe a disciplina que deve ser excluida
                    for (let y = 0; y < db.alunos.length; y++) {
                        if (db.alunos[i].curso_id == aluno.curso_id) {
                            // Caso exista, exclui
                            db.alunos.splice(i, 1)
                        }
                    }
                }
                
            }

            // Retorna o objeto agora com a nova pessoa inserida
            res.send('Sucesso')

        } catch (err) {
            res.status(500).send(err.message);
        } 
    },

    // Salva as notas das disciplinas
    async salvaNotasDisciplinas(req, res) {
        for (let i = 0; i < req.body.length; i++) {
            for (let y = 0; y < db.notas.length; y++) {
                if (req.body[i].id == db.notas[y].cursodisciplina_id) {
                    db.notas[y].nota = req.body[i].nota 
                } else {
                    
                    notas = {
                        id: db.notas[db.notas.length - 1].id + 1,
                        aluno_id: req.body[i].aluno_id,
                        cursodisciplina_id: req.body[i].id,
                        nota: req.body[i].nota,
                    }

                    db.notas.push(notas)

                }    

            }
        }
        



            
    res.send('Sucesso')

    },

    // Utilizada para buscar as informações de usuários para login
    async usuarios(req, res) {
        verificaUsuario = {
            usuario: req.body.usuario,
            senha: req.body.senha
        }
        
        let resposta = ''

        for (let i = 0; i < db.usuarios.length; i++) {
            if (verificaUsuario.usuario == db.usuarios[i].usuario) {
                if (verificaUsuario.senha == db.usuarios[i].senha) {
                    resposta = 'Sucesso'                    
                } else {
                    resposta = 'Falhou'
                }     
            } 
        }

        res.send(resposta)

    }
}