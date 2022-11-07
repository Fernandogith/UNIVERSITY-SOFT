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
                            <v-select v-model="objPessoa.tipo" @change="objPessoa.tipo == 'Aluno' ? BuscaProximoNumeroMatricula() : objPessoa.tipo" :items="tipos_pessoas" placeholder="Tipo" attach chips rounded></v-select>
                        </div>
                        
                    </div>
                </div>
                <div class="dados informacoes-matricula" v-if="objPessoa.tipo == 'Professor'">
                    <h2>INFORMAÇÕES SALARIAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="salario" autocomplete="off" required v-model="objPessoa.salarioProfessor">
                            <label for="salario">Salário Negociado</label>
                        </div>
                    </div>
                </div>
                <div class="dados informacoes-salariais" v-if="objPessoa.tipo == 'Aluno'">
                    <h2>INFORMAÇÕES SOBRE MATRICULA</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="matricula" autocomplete="off" required v-model="objPessoa.numeroMatriculaAluno">
                            <label for="matricula">N° Matricula</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="cursos" autocomplete="off" required>
                            <label for="cursos">Cursos</label>
                        </div>
                    </div>
                </div>
                
                <div class="dados notas" v-if="objPessoa.tipo == 'Aluno'">
                    <h2>INFORMAÇÕES SOBRE MATRICULA</h2>
                    <!-- Table -->
                    <div class="table-espaco">
                        <table class="table table-borderless table-striped m-0 w-970">
                            <thead>
                                <tr>
                                    <th v-for="header in headers" :key="header.texto">{{ header.texto }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dadosFiltrado in dadosFiltrados" :key="dadosFiltrado.id">
                                    <td>{{ dadosFiltrado.descricao }}</td>
                                    <td>{{ dadosFiltrado.nota }}</td>
                                    <td><a><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                    <td><a><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <!-- <div class="table-espaco">
                    <table class="table table-borderless table-striped m-0 w-970">
                        <thead>
                            <tr>
                                <th v-for="header in headers" :key="header.texto">{{ header.texto }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dadosFiltrado in dadosFiltrados" :key="dadosFiltrado.id">
                                <td>{{ dadosFiltrado.descricao }}</td>
                                <td>{{ dadosFiltrado.carga_horaria }}</td>
                                <td>{{ dadosFiltrado.situacao }}</td>
                                <td><a><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                <td><a><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->

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
                {texto: 'Curso', },
                {texto: 'Nota', },
                {texto: '.', },
                {texto: '..', },
            ],

            // Dados da Table
            objPessoa: {id: '', nome: '', data_nascimento: '', tipo: '', numeroMatriculaAluno: '', salarioProfessor: null},

            // Lista apresentada no Select Tipo Pessoa
            tipos_pessoas: ['Aluno', 'Professor'],

        }
    },
    
    methods: {

        // Carrega dados da pessoa pelo ID para popular os campos e atualizar
        carregarDados: function (pId) {

            api.post('/pessoas', pId).then(response => {

            this.populaCampos(response.data[0])
                

            });
        },

        // Salva Pessoa ou manda para atualizar
        salvarPessoa: async function (pPessoa) {

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
            api.put('/atualiza-pessoas', pPessoa).then(response => {
                window.location.href = '/pessoas-consulta'

            })

        },

        // Volta para o Pessoa Consulta
        voltar: function () {
            window.location.href = '/pessoas-consulta'
        },

        // Utilizada para popular os campos clicar em atualizar
        populaCampos: function(pPessoa){
            this.objPessoa.id = pPessoa.id,
            this.objPessoa.nome = pPessoa.nome,
            this.objPessoa.data_nascimento = pPessoa.data_nascimento,
            this.objPessoa.tipo = pPessoa.tipo,
            this.objPessoa.numeroMatriculaAluno = pPessoa.numeroMatriculaAluno,
            this.objPessoa.salarioProfessor = pPessoa.salarioProfessor
        },

        // Retorna o parametro passado pela rota (caso exista)
        PegaParametro: function () {
            return this.$route.params.id
        },

        // Utilizado para buscar o proximo numero de matricula do aluno
        BuscaProximoNumeroMatricula: async function () {
            debugger
            if (this.objPessoa.numeroMatriculaAluno == '' || this.objPessoa.numeroMatriculaAluno == null) {
                api.get('/matricula').then(response => {
                    debugger
                this.objPessoa.numeroMatriculaAluno = response.data[0]
            
                });
            }
        },

        // Utilizado para buscar o proximo ID
        BuscaProximoId: async function () {
            debugger
            if (this.objPessoa.id == '' || this.objPessoa.id == null) {
                api.get('/proximo-id').then(response => {
                    debugger
                this.objPessoa.id = response.data[0]
            
                });
            }
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