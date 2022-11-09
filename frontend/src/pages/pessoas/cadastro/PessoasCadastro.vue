<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top">
                <span>| Cadastro</span>
                <div class="actions">
                    <div class="button">
                        <button @click="voltar()"  class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="salvarPessoa(objPessoa)" class="btn-padrao">Salvar</button>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="dados dados-gerais">
                    <h2>DADOS GERAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="codigo" autocomplete="off" required v-model="objPessoa.id">
                            <label for="codigo" >Código</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="nome" autocomplete="off" required v-model="objPessoa.nome">
                            <label for="nome">Nome</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="data_nascimento" autocomplete="off" required v-model="objPessoa.data_nascimento">
                            <label for="data_nascimento">Data Nascimento</label>
                        </div>
                        <!-- Selected Padrão -->
                        <div class="input-select" id="tipo">
                            <v-select v-model="tipos_pessoas_selecionado" :items="tipos_pessoas" item-text="nome" return-object @click="carregaTiposPessoa()" @change="tipos_pessoas_selecionado.nome == 'Aluno' ? BuscaProximoNumeroMatricula() : tipos_pessoas_selecionado.nome"  placeholder="Tipo" attach chips rounded></v-select>
                        </div>
                        
                    </div>
                </div>
                <div class="dados informacoes-matricula" v-if="tipos_pessoas_selecionado.nome == 'Professor'">
                    <h2>INFORMAÇÕES SALARIAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="salario" autocomplete="off" required v-model="objPessoa.salarioProfessor">
                            <label for="salario">Salário Negociado</label>
                        </div>
                    </div>
                </div>
                <div class="dados informacoes-salariais" v-if="tipos_pessoas_selecionado.nome == 'Aluno'">
                    <h2>INFORMAÇÕES SOBRE MATRICULA</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="matricula" autocomplete="off" required v-model="objPessoa.numeroMatriculaAluno">
                            <label for="matricula">N° Matricula</label>
                        </div>
                    </div>
                </div>
                <div class="dados pessoa-cursos" v-if="tipos_pessoas_selecionado.nome == 'Aluno'">
                    <h2>CONTRATAÇÃO DE CURSOS</h2>
                    <div class="group-inputs">
                        <!-- Selected Padrão -->
                        <div class="input-select disciplinas" id="disciplinas">
                            <v-select v-model="listaCursosSelecionado" :items="listaCursos" item-text="nome" return-object @click="carregaCursos()" multiple placeholder="Disciplinas" attach chips rounded>
                            </v-select>

                        </div>
                        <button @click="adicionarCurso(listaCursosSelecionado)">
                            <img src="@/assets/img/icones/icon-add.svg" alt="">
                        </button>
                    </div>
                    <div class="table-espaco" v-if="listaCursosContratados.length >=1">
                    <table class="table table-borderless table-striped m-0 w-970">
                        <thead>
                            <tr>
                                <th v-for="header in headers" :key="header.texto">{{ header.texto }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="listaCursosContratado in listaCursosContratados" :key="listaCursosContratado.id">
                                <td>{{ listaCursosContratado.id }}</td>
                                <td>{{ listaCursosContratado.nome }}</td>
                                <td><a @click="editarDisciplinas(listaCursosContratado)"><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                <td><a @click="deletaDisciplinas(listaCursosContratado)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
    name: "Login",
    

    data() {
        return {
            // Utilizado para verificar se é um novo registro sendo inserido
            novoRegistro: null,

            // Cabeçalho da table
            headers: [
                {texto: 'Código', },
                {texto: 'Curso', },
                {texto: '.', },
                {texto: '..', },
            ],

            // Dados da Table
            objPessoa: {id: '', nome: '', data_nascimento: '', tipo: '', numeroMatriculaAluno: '', salarioProfessor: null, infos_aluno: []},

            // Utilizado para receber o tipo de pessoa selecionado
            tipos_pessoas_selecionado: {},
            // Lista apresentada no Select Tipo Pessoa
            tipos_pessoas: [],

            // Array para receber a lista de cursos contratados do aluno
            listaCursosContratados: [],

            // Array para receber a lista de cursos existentes
            listaCursos: [],

            // Array para receber o curso selecionado
            listaCursosSelecionado: [],

        }
    },
    
    methods: {

        // Carrega dados da pessoa pelo ID para popular os campos e atualizar
        carregarDados: function (pId) {

            api.post('/pessoas', pId).then(response => {
            this.carregaTiposPessoa()
            this.populaCampos(response.data[0])
                

            });
        },

        // Salva Pessoa ou manda para atualizar
        salvarPessoa: async function (pPessoa) {
            debugger
            pPessoa.tipo = this.tipos_pessoas_selecionado.id

            // Caso o tipo seja aluno, adiciona no objeto que estamos enviando a lista de cursos selecionados
            if (pPessoa.tipo == 1) {
                this.listaCursosContratados.forEach(curso => {
                    pPessoa.infos_aluno.push(curso)
                });

                
            }
            debugger
            if (this.novoRegistro == true) {
                
                await api.post('/insere-pessoas', pPessoa).then(response => {
                
                window.location.href = '/pessoas-consulta'

            });
            } else {
                this.atualizar(pPessoa)
            }
        },

        // Atualiza Pessoa
        atualizar: function (pPessoa) {
            pPessoa.tipo = this.tipos_pessoas_selecionado.nome


debugger
            api.put('/atualiza-pessoas', pPessoa).then(response => {
                window.location.href = '/pessoas-consulta'

            })

        },

        // Volta para o Pessoa Consulta
        voltar: function () {
            window.location.href = '/pessoas-consulta'
        },

        carregaCursos: function () {
            api.post('/cursos').then(response => {
                response.data.forEach(curso => {
                    this.listaCursos.push(curso)
                });

                
                

            });
        },

        adicionarCurso: function(pCurso) {
            pCurso.forEach(curso => {
                this.listaCursosContratados.push(curso)
            });

            
        },

        // Utilizada para popular os campos clicar em atualizar
        populaCampos: function(pPessoa){
            debugger
            this.objPessoa.id = pPessoa.id,
            this.objPessoa.nome = pPessoa.nome,
            this.objPessoa.data_nascimento = pPessoa.data_nascimento,
            this.tipos_pessoas_selecionado = pPessoa.pessoa_tipo,
            this.objPessoa.numeroMatriculaAluno = pPessoa.numeroMatriculaAluno,
            this.objPessoa.salarioProfessor = pPessoa.salarioProfessor

            pPessoa.cursosAluno.forEach(cursosAluno => {
                this.listaCursosContratados.push(cursosAluno)
            });
            
        },

        // Retorna o parametro passado pela rota (caso exista)
        PegaParametro: function () {
            return this.$route.params.id
        },

        // Utilizado para buscar o proximo numero de matricula do aluno
        BuscaProximoNumeroMatricula: async function () {
            debugger
            if (this.objPessoa.numeroMatriculaAluno == '' || this.objPessoa.numeroMatriculaAluno == null) {
                api.get('/matriculas').then(response => {
                    debugger
                this.objPessoa.numeroMatriculaAluno = response.data[0]
            
                });
            }
        },

        // Utilizado para buscar o proximo ID
        BuscaProximoId: async function () {
            debugger
            if (this.objPessoa.id == '' || this.objPessoa.id == null) {
                api.get('/pessoas-proximo-id').then(response => {
                    debugger
                this.objPessoa.id = response.data[0]
            
                });
            }
        },

        // Utilizado para buscar os tipos de pessoa no banco
        carregaTiposPessoa: async function () {
            api.get('/tipos-pessoa').then(response => {
            debugger
                response.data.forEach(tipo => {
                    this.tipos_pessoas.push(tipo)
                })
            });
        },
    },

    mounted() {
        debugger
        let parametro = {}
        parametro.id = this.PegaParametro()

        if (parametro.id != undefined) {
            this.carregarDados(parametro)
        } else {
            this.novoRegistro = true
            this.objPessoa.id = this.BuscaProximoId()

        }


        
    }
}

</script>

<style src="./PessoasCadastro.scss" lang="scss" scoped>