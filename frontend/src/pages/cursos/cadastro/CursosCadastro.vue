<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top" data-aos="fade-left">
                <span>| Cursos Cadastro</span>
                <div class="actions">
                    <div class="button">
                        <button @click="voltar()"  class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="salvarCursoDisiciplinas(objCurso)" class="btn-padrao">Salvar</button>
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
                                <td>{{ listaDisciplina.id }}</td>
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
        carregarCursosDisciplinas: async function (pId) {

            try {
                await api.post('/cursos', pId).then(response => {
                    // Criação do objeto que receberá o retorno do backend
                    let retorno = {}


                    // Atribui ao objeto de retorno, o retorno do backend
                    retorno = response.data
                    

                    // Atribui ao objeto ligado aos campos, as informações do curso
                    this.objCurso = {curso_id: retorno[0].id, nome: retorno[0].nome}


                    // Atribui ao array ligado a tabela de disciplinas, as disciplinas ligadas ao curso vindas do backend
                    retorno[0].disciplinas.forEach(item => {
                        this.listaDisciplinas.push(item)
                    });

                    
                });
   
            } catch (error) {
                alert(error)
            }

        },

        // Salva Curso ou manda para atualizar
        salvarCursoDisiciplinas: function (pCurso) {
            
            
            // Criação do objeto que será enviado ao backend
            let objCursoDisciplinas = {}


            // Adicionando ao objeto de envio, as informações dos campos que vieram pelo parametro
            objCursoDisciplinas = pCurso


            // Criação do array no objeto de envio que receberá as disciplinas para salvar ou atualizar
            objCursoDisciplinas.disciplinas = []


            // Adicionando ao objeto de retorno as disciplinas para salvar ou atualizar 
            for (let i = 0; i < this.listaDisciplinas.length; i++) {
                objCursoDisciplinas.disciplinas.push(this.listaDisciplinas[i]);
            }

            
            // Verifica se é um novo registro (Mediante clique no botão novo var novoRegistro recebe true na mouted)
            if (this.novoRegistro) {
                
                // Envia objeto para salvar no backend
                api.post('/insere-cursos', objCursoDisciplinas).then(response => {
                
                // Retorna com sucesso
                alert('Salvo com sucesso!')

                // Redireciona para a pagina de consulta
                window.location.href = '/cursos-consulta'
            })

            // Caso não seja um novo registro, chama função para atualizar o registro
            } else {
                // Chama a função para atualizar o curso
                this.atualizar(objCursoDisciplinas)
            }
        },

        // Atualiza Pessoa
        atualizar: async function (pCursoDisciplinas) {
            // Envia o objeto para atualizar no backend
            await api.post('/atualiza-cursos', pCursoDisciplinas).then(response => {

                // Retorna com sucesso
                alert('Atualizado com sucesso!')

                // Redireciona para a pagina de consulta
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
            
            this.objCurso = {
                curso_id: pCurso.curso_id,
                nome: pCurso.nome,
            }
   
            





        },

        // Retorna o parametro passado pela rota (caso exista)
        PegaParametro: function () {
            return this.$route.params.id
        },

        // Utilizado para buscar o proximo numero de matricula do aluno
        BuscaProximoNumeroMatricula: async function () {
            
            if (this.objPessoa.numeroMatriculaAluno == '' || this.objPessoa.numeroMatriculaAluno == null) {
                api.post('/matriculas').then(response => {
                    
                this.objPessoa.numeroMatriculaAluno = response.data[0]
            
                });
            }
        },

        // Utilizado para buscar o proximo ID
        BuscaProximoId:  function () {
            
            if (this.objCurso.curso_id == '' || this.objCurso.curso_id == null) {
                 api.post('/cursos-proximo-id').then(response => {
                    
                this.objCurso = {
                    curso_id: response.data.curso_id
                }
            
                })
            }
        },

        carregaDisciplinas: async function() {
            
            await api.post('/disciplinas').then(response => {
               
               this.arrDisciplinas = response.data
            });
            
            
        },

        adicionarDisciplina: function (pDisciplinas) {
            
            let addDisciplina = {
                    disciplina_id: pDisciplinas.id, 
                    nome: pDisciplinas.nome, 
                    professor_id: pDisciplinas.professor_id
                }

                this.listaDisciplinas.push(addDisciplina);
                this.objCurso.disciplinas = addDisciplina.disciplina_id;
                
            
                this.arrDisciplinasSelecionadas = null;
            
        },

        deletaDisciplinaCurso: async function (pDisciplina_id) {

            let itemDelete = {}
            itemDelete.disciplina_id = pDisciplina_id;
            itemDelete.curso_id = this.objCurso.curso_id;


            await api.post('/Deleta-disciplina-curso', itemDelete).then(response => {
               
                if (response.data == 'Sucesso') {
                    alert('deletado com sucesso!')
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
            this.carregarCursosDisciplinas(this.parametro)
        } else {
            // Se for um novo registro, busca-se o próximo ID no backend
            this.novoRegistro = true
            this.BuscaProximoId()
            
        }
    }
}

</script>

<style src="./CursosCadastro.scss" lang="scss" scoped>