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
                        <button @click="salvarCurso(objCurso)" class="btn-padrao">Salvar</button>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="dados dados-gerais">
                    <h2>DADOS GERAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="codigo" autocomplete="off" required v-model="objCurso.id">
                            <label for="codigo" >Código</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="nome" autocomplete="off" required v-model="objCurso.nome">
                            <label for="nome">Nome</label>
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
                                <td>{{ listaDisciplina.disciplinas_id }}</td>
                                <td>{{ listaDisciplina.nome }}</td>
                                <td><a @click="editarDisciplinas(listaDisciplina)"><img src="@/assets/img/icones/icon-editar.svg"></a>                         <div class="input">
                            <input type="text" id="nome" autocomplete="off" required v-model="objCurso.nome">
                            <label for="nome">Nome</label>
                        </div></td>
                                <td><a @click="deletaDisciplinas(listaDisciplina)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
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
                {texto: '.', },
                {texto: '..', },

            ],

            // Dados da Table Disciplinas
            listaDisciplinas: [],
        

            // Dados da Table
            objCurso: {id: '', nome: '', disciplinas: []},



        }
    },
    
    methods: {

        // Carrega dados da pessoa pelo ID para popular os campos e atualizar
        carregarDados: async function (pId) {
            let vDadosCurso
            let vDadosCursoDisciplina = []

            await api.post('/cursos', pId).then(response => {
            vDadosCurso = response.data[0]
    

            });

            await api.post('/cursos-disciplinas', pId).then(response => {
                    debugger
                response.data.forEach(DadosCursoDisciplina => {
                    debugger
                    vDadosCursoDisciplina.push(DadosCursoDisciplina)
                    debugger
                });

            
            });
            
            this.populaCampos(vDadosCurso, vDadosCursoDisciplina)
        },

        // Salva Curso ou manda para atualizar
        salvarCurso: async function (pCurso) {

            if (this.novoRegistro) {
                
                await api.post('/insere-cursos', pCurso).then(response => {
                
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
        populaCampos: function (pCurso, pDadosCursoDisciplina) {
            // Popula campos
            this.objCurso.id = pCurso.id,
            this.objCurso.nome = pCurso.nome
            debugger
            // Popula Tabela
            this.listaDisciplinas = pDadosCursoDisciplina.tipo
            
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
        BuscaProximoId: async function () {
            
            if (this.objCurso.id == '' || this.objCurso.id == null) {
                api.get('/cursos-proximo-id').then(response => {
                    
                this.objCurso.id = response.data[0]
            
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

        adicionarDisciplina(pDisciplinas) {
            
            for (let i = 0; i < pDisciplinas.length; i++) {
                
                let addDisciplina = {
                    disciplinas_id: pDisciplinas[i].id, 
                    nome: pDisciplinas[i].nome, 
                    professor_id: pDisciplinas[i].professor_id
                }
debugger
                this.listaDisciplinas.push(addDisciplina);
                this.objCurso.disciplinas.push(addDisciplina.disciplinas_id);
                
            }
            this.arrDisciplinasSelecionadas = null
            
        }
    },

    mounted() {
        
        // Utilizado para pegar o parametro vindo na rota caso seja uma atualização de registro
        let parametro = {}
        parametro.id = this.PegaParametro()

        // Caso veio parametro na rota, utilizando ele solicitamos o carregamento no backend
        if (parametro.id != undefined) {
            this.carregarDados(parametro)
        } else {
            // Se for um novo registro, busca-se o próximo ID no backend
            this.novoRegistro = true
            this.objCurso.id = this.BuscaProximoId()
        }

         


        
    }
}

</script>

<style src="./GestaoCadastro.scss" lang="scss" scoped>