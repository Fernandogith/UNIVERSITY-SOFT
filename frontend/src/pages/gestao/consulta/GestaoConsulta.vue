<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top">
                <span>| Consulta</span>
                <div class="actions">
                    <div class="button">
                        <button @click="voltar()" class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="salvaNotasDisciplina()" class="btn-padrao" v-if="ambienteDisciplinas == true">Salvar</button>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="filtros">
                    <div class="group-inputs">
                        <div class="input-busca-aluno">
                            <div class="label">
                                <label for="selecione-aluno">SELECIONE O ALUNO</label>
                            </div>
                            <!-- Selected Padrão -->
                            <div class="input-select lista-alunos" id="disciplinas" @click="carregaAlunos()">
                                
                                <v-autocomplete id="selecione-aluno" v-model="listaAlunoSelecionado" :items="listaAlunos" item-text="nome" @change="carregaCursosAluno(listaAlunoSelecionado.id)" return-object  @click="carregaAlunos()" attach chips rounded>
                                </v-autocomplete>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="ambiente-cursos table-espaco " v-if="ambienteCursos == true && listaAlunoSelecionado != null">
                    <div class="voltar">
                        <h2>CURSOS</h2>
                    </div>
                    
                    <table class="table table-borderless table-striped m-0 w-970">
                        <thead>
                            <tr>
                                <th v-for="headersCurso in headersCursos" :key="headersCurso.texto">{{ headersCurso.texto }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="arrCurso in arrCursos" :key="arrCurso.id">
                                <td>{{ arrCurso.id }}</td>
                                <td>{{ arrCurso.nome }}</td>
                                <td><a @click="abrirDisciplinas(true, arrCurso.id)"><img src="@/assets/img/icones/icon-abrir.svg"></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>



                <div class="ambiente-disciplinas table-espaco " v-if="ambienteDisciplinas == true">
                    <div class="voltar">
          
                            <button @click="voltarCursoDisciplina('cursos')"><img src="@/assets/img/icones/icon-voltar.svg" alt=""></button>
          
       
                            <h2>DISCIPLINAS</h2>
              
                        
                    </div>
                    
                    <table class="table table-borderless table-striped m-0 w-970">
                        <thead>
                            <tr>
                                <th v-for="headersDisciplina in headersDisciplinas" :key="headersDisciplina.texto">{{ headersDisciplina.texto }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="listaDisciplina in listaDisciplinas" :key="listaDisciplina.id">
                                <td>{{ listaDisciplina.id }}</td>
                                <td>{{ listaDisciplina.nome }}</td>
                                <td>
                                    <div class="input">
                                        <input class="input-filtro menor" type="text" id="notas" autocomplete="off" required v-model="listaDisciplina.nota" >
                                    </div>
                                </td>
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
    name: "Login",
    components: {
        Menu,
    },
    

    data() {
        return {

            // Cabeçalho da table
            headersCursos: [
                {texto: 'Código', },
                {texto: 'Nome', },
                {texto: ' ', },
            ],
            
            // Cabeçalho da table
            headersDisciplinas: [
                {texto: 'Código', },
                {texto: 'Nome', },
                {texto: 'Notas', },
            ],

            // Dados da Table
            listaAlunos: [],
            
            // Aluno selecionado
            listaAlunoSelecionado: null,

            // Utilizado para mostrar os dados na table
            arrCursos: [],

            // Utilizada para verificar se o ambiente de cursos está ativo
            ambienteCursos: true,

            notasDisciplina: [],

            // Utilizada para verificar se o ambiente de cursos está ativo
            ambienteDisciplinas: false,

            // Dados da Table Disciplina
            listaDisciplinas: [],
        }
    },
    
    methods: {

        carregaDisciplinas: async function (pCurso) {
            debugger
            this.listaDisciplinas = []
            await api.post('/cursos-disciplinas', {id: pCurso}).then(response => {
                response.data.forEach(resposta => {
                    this.listaDisciplinas.push(resposta)
                });
            });
            

        },

        carregaAlunos: async function () {
            await api.post('/pessoas').then(response => {
                debugger

                response.data.forEach(resposta => {
                    
                    if (resposta.pessoa_tipo == 1 || resposta.pessoa_tipo.id) {
                        this.listaAlunos.push(resposta)
                    }
                    
                });

            });
            

        },

        carregaCursosAluno: async function (pAluno) {
            this.arrCursos = []
            await api.post('/cursos-aluno', {id: pAluno}).then(response => {
                
                let aux = response.data
                aux.forEach(resposta => {
                    debugger
                    this.arrCursos.push(resposta)   
                });

            });
        },

        abrirDisciplinas: function (pModo, pCursoId) {
            
            this.ambienteCursos = false
            this.ambienteDisciplinas = pModo
            this.carregaDisciplinas(pCursoId)
        },

        salvaNotasDisciplina: async function () {
            await api.post('/salva-notas-disciplinas', this.listaDisciplinas).then(response => {
                if (response.data == 'Sucesso') {
                    this.carregaDisciplinas(this.listaDisciplinas[0].curso_id)
                }

            });
            
        },

        editarCurso: function(pCurso) {
            window.location.href = '/cursos-cadastro'+ pCurso.id
        },

        deletaCurso: function (pCurso) {
            
            api.post('/deleta-cursos', pCurso).then(response => {
                if (response.data == 'Sucesso') {
                    window.location.href = ('/cursos-consulta')
                }
                
                


            });
        },

        DirecionarPaginaCursoCadastro: function() {
            window.location.href = 'cursos-cadastro'
        },

        voltar: function () {
            window.location.href = '/inicio'
        },

        voltarCursoDisciplina: function (pMovimento) {
            if (pMovimento == 'cursos') {
                this.ambienteDisciplinas = false
                this.ambienteCursos = true
            } else if (pMovimento == 'disciplinas') {  
                this.ambienteCursos = false
                this.ambienteDisciplinas = true

            }
        }
        
    },

    mounted() {

    }
}

</script>

<style src="./GestaoConsulta.scss" lang="scss" scoped>