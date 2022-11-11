<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top" data-aos="fade-left">
                <span>| Cadastro</span>
                <div class="actions">
                    <div class="button">
                        <button @click="voltar()"  class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="salvarCurso(objCurso)" class="btn-padrao">Salvar</button>
                    </div>
                </div>
            </div>

            <div class="main" data-aos="fade-left">
                <div class="dados dados-gerais">
                    <h2>DADOS GERAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="codigo" autocomplete="off" required v-model="objCurso.curso_id">
                            <label for="codigo" >Código</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="nome" autocomplete="off" required v-model="objCurso.nome">
                            <label for="nome">Nome</label>
                        </div>
                    </div>
                </div>
                <div class="add-disciplinas">

                    <div class="filtros">
                        <div class="group-inputs">
                            <div class="input-busca-aluno">
                                <div class="label">
                                    <label for="selecione-aluno">SELECIONE PARA ADICIONAR DISCIPLINAS</label>
                                </div>
                                <!-- Selected Padrão -->
                                <div class="input-select lista-alunos" id="disciplinas" @change="adicionarDisciplina(arrDisciplinasSelecionadas)" @click="carregaDisciplinas()">
                                    
                                    <v-autocomplete id="selecione-aluno" v-model="arrDisciplinasSelecionadas" @change="adicionarDisciplina(arrDisciplinasSelecionadas)" :items="arrDisciplinas" item-text="nome" return-object @click="carregaDisciplinas()" attach chips rounded>
                                    </v-autocomplete>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="table-espaco" v-if="listaDisciplinas.length >=1">
                    <table class="table table-borderless table-striped m-0 w-970">
                        <thead>
                            <tr>
                                <th v-for="header in headers" :key="header.texto">{{ header.texto }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="listaDisciplina in listaDisciplinas" :key="listaDisciplina.id">
                                <td>{{ listaDisciplina.disciplina_id }}</td>
                                <td>{{ listaDisciplina.nome }}</td>
                                <td>
                                    <div class="input">
                                        <input class="input-filtro menor" type="text" id="notas" autocomplete="off" required v-model="listaDisciplina.semestre" >
                                    </div>
                                </td>
                                <td><a @click="deletaDisciplinaCurso(listaDisciplina.disciplina_id)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>


</template>


<script>
import api from '@/services/api'
import Menu from '../../../components/menu/Menu..vue';


export default {
    components: { Menu },
    name: "CursosCadastro",
    

    data() {
        return {
            // Utilizado para verificar se é um novo registro sendo inserido
            novoRegistro: null,

            // Utilizado para receber as disciplinas selecionadas no select arrDisciplinas
            arrDisciplinasSelecionadas: [],

            // Utilizado para receber as disciplinas existentes e carregar o select
            arrDisciplinas: [],            

            // Cabeçalho da table Disciplinas
            headers: [
                {texto: 'Código', },
                {texto: 'Nome', },
                {texto: 'Semestre', },
                {texto: null, },

            ],

            // Dados da Table Disciplinas
            listaDisciplinas: [],
        

            // Dados da Table
            objCurso: {},

            // Utilizado para pegar o parametro enviado pela rota ao editar
            parametro: {},



        }
    },
    
    methods: {

        // Carrega dados da pessoa pelo ID para popular os campos e atualizar
        carregarDados: async function (pId) {

            try {
                let vDadosCurso = {}

                await api.post('/cursos', pId).then(response => {
                    let retorno = response.data[0]
                    debugger
                    this.objCurso = {
                        curso_id: retorno.id,
                        nome: retorno.nome
                    }
                });
debugger
                await api.post('/cursos-disciplinas', pId).then(response => {
                        debugger
                    response.data.forEach(DadosCursoDisciplina => {
                        debugger
                        this.listaDisciplinas.push(DadosCursoDisciplina)
                        debugger
                    });


                });



   
            } catch (error) {
                alert(error)
            }

        },

        // Salva Curso ou manda para atualizar
        salvarCurso: function (pCurso) {
            debugger
            pCurso.disciplinas = []
            for (let i = 0; i < this.listaDisciplinas.length; i++) {
                debugger
                pCurso.disciplinas.push(this.listaDisciplinas[i]);
                
            }

            
            if (this.novoRegistro) {
                debugger
                api.post('/insere-cursos', pCurso).then(response => {
                
                window.location.href = '/cursos-consulta'

            })
            } else {
                    
                this.atualizar(pCurso)
            }
        },

        // Atualiza Pessoa
        atualizar: async function (pCurso) {
            await api.put('/atualiza-cursos', pCurso).then(response => {
                window.location.href = '/cursos-consulta'

            })

        },

        // Volta para o Pessoa Consulta
        voltar: function () {
            window.location.href = '/cursos-consulta'
        },

        // Utilizada para popular os campos clicar em atualizar
        populaCampos: function (pCurso) {
            // Popula campos
            debugger
            this.objCurso = {
                curso_id: pCurso.curso_id,
                nome: pCurso.nome,
            }
   
            debugger





        },

        // Retorna o parametro passado pela rota (caso exista)
        PegaParametro: function () {
            return this.$route.params.id
        },

        // Utilizado para buscar o proximo numero de matricula do aluno
        BuscaProximoNumeroMatricula: async function () {
            
            if (this.objPessoa.numeroMatriculaAluno == '' || this.objPessoa.numeroMatriculaAluno == null) {
                api.get('/matriculas').then(response => {
                    
                this.objPessoa.numeroMatriculaAluno = response.data[0]
            
                });
            }
        },

        // Utilizado para buscar o proximo ID
        BuscaProximoId:  function () {
            
            if (this.objCurso.curso_id == '' || this.objCurso.curso_id == null) {
                 api.post('/cursos-proximo-id').then(response => {
                    debugger
                this.objCurso = {
                    curso_id: response.data.curso_id
                }
            
                })
            }
        },

        carregaDisciplinas: async function() {
            debugger
            await api.post('/disciplinas').then(response => {
               
               this.arrDisciplinas = response.data
            });
            debugger
            
        },

        adicionarDisciplina: function (pDisciplinas) {
            debugger
            let addDisciplina = {
                    disciplina_id: pDisciplinas.id, 
                    nome: pDisciplinas.nome, 
                    professor_id: pDisciplinas.professor_id
                }
debugger
                this.listaDisciplinas.push(addDisciplina);
                this.objCurso.disciplinas = addDisciplina.disciplina_id;
                
            
                this.arrDisciplinasSelecionadas = null;
            
        },

        deletaDisciplinaCurso: async function (pDisciplina_id) {

            let itemDelete = {}
            itemDelete.disciplina_id = pDisciplina_id;
            itemDelete.curso_id = this.objCurso.curso_id;


            await api.post('/deleta-disciplina-curso', itemDelete).then(response => {
               
                if (response.data == 'Sucesso') {
                    window.location.href = window.location.pathname
                }
            });
            

            
        }
    },

    mounted() {
        
        // Utilizado para pegar o parametro vindo na rota caso seja uma atualização de registro

        this.parametro.id = this.PegaParametro()

        // Caso veio parametro na rota, utilizando ele solicitamos o carregamento no backend
        if (this.parametro.id != undefined) {
            this.carregarDados(this.parametro)
        } else {
            // Se for um novo registro, busca-se o próximo ID no backend
            this.novoRegistro = true
            this.BuscaProximoId()
            
        }
    }
}

</script>

<style src="./CursosCadastro.scss" lang="scss" scoped>