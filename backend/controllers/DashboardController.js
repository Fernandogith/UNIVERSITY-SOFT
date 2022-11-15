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
                req.body.infos_aluno.forEach(curso => {
                    if (curso.pessoa_id == undefined) {
                        aluno = {
                            id: db.alunos[db.alunos.length - 1].id + 1, 
                            curso_id: curso.curso_id,
                            pessoa_id: objPessoa.id, 
                            matricula: objPessoa.numeroMatriculaAluno
                        }
                        db.alunos.push(aluno)
                    } else {
                        for (let i = 0; i < db.alunos.length; i++) {
                            if (curso.pessoa_id == db.alunos[i].pessoa_id) {
                                if (curso.curso_id == db.alunos[i].curso_id) {
                                    db.alunos[i].curso_id = req.body.infos_aluno.curso_id
                                    db.alunos[i].pessoa_id = req.body.infos_pessoa.pessoa_id
                                    db.alunos[i].curso_id = req.body.infos_aluno.matricula
                                }
                            };
                            
                        }
                    }

                });
                
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
    async carregaCursos(req, res) {
        let bind = req.body.id
        
        
        if (bind != undefined) {
            bind = parseInt(req.body.id)
            let cursoCarregado = []
            for (let i = 0; i < db.cursos.length; i++) {
                if (db.cursos[i].id == bind) {
                    
                    // Adiciona a pessoa no array
                    cursoCarregado.push(db.cursos[i])

                    res.send(cursoCarregado)            
                };
                
            }
        } else {
            res.send(db.cursos)
        }
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

            // Monta objeto com o curso que se deseja atualizar
            curso = {
                id: req.body.curso_id, 
                nome: req.body.nome
            }
            
            // Atualiza o Curso
            for (let i = 0; i < db.cursos.length; i++) {
                if (db.cursos[i].id == curso.id) {
                    db.cursos[i].nome = curso.nome
                };
                
            }
            

            // Remove o curso e suas disciplinas da db.Cursodisciplinas
            for (let i = 0; i < db.Cursodisciplinas.length; i++) {  
                if (db.Cursodisciplinas[i].curso_id == curso.id) {
                    db.Cursodisciplinas.splice(i,1)
                    i = i-1
                }
            }


            // Adiciona o curso com suas novas disciplinas
            let cursoDisciplinaAdd = {}

            for (let i = 0; i < req.body.disciplinas.length; i++) {
                // Objeto utilizado na verificação
                cursoDisciplinaAdd = {
                    id: db.Cursodisciplinas[db.Cursodisciplinas.length - 1].id + 1,
                    curso_id: curso.id,
                    disciplina_id: req.body.disciplinas[i].disciplina_id,
                    semestre: req.body.disciplinas[i].semestre
                }
                db.Cursodisciplinas.push(cursoDisciplinaAdd)
            }

            // Adiciona o nome das disciplinas
            for (let i = 0; i < db.Cursodisciplinas.length; i++) {
                for (let y = 0; y < db.disciplinas.length; y++) {
                    if (db.Cursodisciplinas[i].disciplina_id == db.disciplinas[y].id) {
                        db.Cursodisciplinas[i].nome = db.disciplinas[y].nome
                    }
                }
                
                
                
                
            }

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

    // Carrega Disciplinas do curso
    async carregaCursosDisciplinas(req, res) {
        let aluno
        for (let i = 0; i < db.alunos.length; i++) {
            if (req.body.aluno_id == db.alunos[i].pessoa_id) {
                aluno = db.alunos[i].id
            }
            
        }



        let bind = {curso_id: parseInt(req.body.curso_id), aluno_id: aluno}
        
        
        if (bind != undefined) {
            
            // Array para receber as disciplinas do curso
            let cursosDisciplinasCarregados = []
            let arrCursosDisciplinas = db.Cursodisciplinas

            // Procura no objeto disciplinas, as que possuem o ID de bind
            for (let i = 0; i < arrCursosDisciplinas.length; i++) {
                if (arrCursosDisciplinas[i].curso_id == bind.curso_id) {

                    // Adiciona o aluno vindo do bind 
                    arrCursosDisciplinas[i].aluno_id = parseInt(bind.aluno_id)

                    // Adiciona no array a disciplina encontrada
                    cursosDisciplinasCarregados.push(arrCursosDisciplinas[i])
                    
                };
                
            }

            // For utilizado para procurar e adicionar a descrição das disciplinas adicionadas
            // Para cada disciplina adicionada no array verificamos a descrição no objeto db.disciplinas
            for (let i = 0; i < cursosDisciplinasCarregados.length; i++) {
                for (let y = 0; y < db.disciplinas.length; y++) {
                    if (cursosDisciplinasCarregados[i].disciplina_id == db.disciplinas[y].id) {
                        cursosDisciplinasCarregados[i].nome = db.disciplinas[y].nome
                    }
                }
            }


            // Verifica se a disciplina tem nota cadastrada, e caso tenha, adiciona ao objeto de retorno
            // Verifica cada um dos itens de cursosDisciplinas para verificar se tem nota na tabela de nota, caso tenha, inclui no objeto de retorno.


            // Verificar na tabela de notas, se existe notas para o aluno, para as disciplinas do curso mencionado


            for (let i = 0; i < db.notas.length; i++) {
                for (let y = 0; y < cursosDisciplinasCarregados.length; y++) {
                    if (db.notas[i].aluno_id == cursosDisciplinasCarregados[y].aluno_id) {
                        if (cursosDisciplinasCarregados[y].id == db.notas[i].cursodisciplina_id) {
                            cursosDisciplinasCarregados[y].nota = db.notas[i].nota
                        }
                        
                    }
                }
            }



            // Adiciona ao array de objetos de retorno o nome do professor
            // Inicia verificando qual o professor da disciplina
            for (let i = 0; i < cursosDisciplinasCarregados.length; i++) {
                for (let y = 0; y < db.disciplinas.length; y++) {
                    // Ao encontrar o professor da disciplina, tendo o ID dele, procura na tabela de pessoas o nome do professor e adiciona ao objeto de retorno
                    if (cursosDisciplinasCarregados[i].disciplina_id == db.disciplinas[y].id) {
                        // Mediante db.disciplinas[y].professor_id, procura na tabela de pessoas o nome do professor
                        for (let x = 0; x < db.pessoas.length; x++) {
                            if (db.disciplinas[y].professor_id == db.pessoas[x].id) {
                                cursosDisciplinasCarregados[i].professor = db.pessoas[x].nome
                            }
                        }
                    }
                }
                
            }



            
            res.send(cursosDisciplinasCarregados)
        } else {
            
            res.send(db.Cursodisciplinas)
        }
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


    // O ID que recebemos no req.body é o ID do cursoDisciplina
        req.body.forEach(notasRecebidas => {
            for (let y = 0; y < db.notas.length; y++) {
                if (notasRecebidas.id == db.notas[y].cursodisciplina_id) {
                    db.notas[y].aluno_id = notasRecebidas.aluno_id
                    db.notas[y].cursodisciplina_id = notasRecebidas.id
                    db.notas[y].nota = notasRecebidas.nota
                } else {
                    let objNotas = {
                        id: db.notas[db.notas.length - 1].id + 1,
                        aluno_id: notasRecebidas.aluno_id,
                        cursodisciplina_id: notasRecebidas.id,
                        nota: notasRecebidas.nota
                    }
                    db.notas.push(objNotas)
                }
                
            }


          
                
            
        });
            
            




            
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