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
                        <button @click="DirecionarPaginaCursoCadastro()" class="btn-padrao">Novo</button>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="filtros">
                    <h2>SELECIONE O ALUNO</h2>
                    <div class="group-inputs">
                        <!-- Selected Padrão -->
                        <div class="input-select lista-alunos" id="disciplinas" @click="carregaAlunos()">
                            <v-autocomplete v-model="listaAlunoSelecionado" :items="listaAlunos" item-text="nome" return-object  @click="carregaAlunos()" placeholder="Selecione o Aluno" attach chips rounded>
                            </v-autocomplete>

                        </div>
                        <button @click="carregaCursosAluno(listaAlunoSelecionado.id)">
                            <img src="@/assets/img/icones/icon-search.svg" alt="">
                        </button>
                    </div>
                </div>
                <div class="table-espaco">
                    <table class="table table-borderless table-striped m-0 w-970">
                        <thead>
                            <tr>
                                <th v-for="header in headers" :key="header.texto">{{ header.texto }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="arrCurso in arrCursos" :key="arrCurso.id">
                                <td>{{ arrCurso.id }}</td>
                                <td>{{ arrCurso.nome }}</td>
                                <td><a @click="editarCurso(arrCurso)"><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                <td><a @click="deletaCurso(arrCurso)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
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
            headers: [
                {texto: 'Código', },
                {texto: 'Nome', },
                {texto: '.', },
                {texto: '..', },

            ],

            // Dados da Table
            listaAlunos: [],
            
            // Aluno selecionado
            listaAlunoSelecionado: null,

            // Utilizado para mostrar os dados na table
            arrCursos: [],
        }
    },
    
    methods: {

        carregaAlunos: async function () {
            this.arrCursos = []
            await api.post('/pessoas').then(response => {
                
                let aux = response.data
                aux.forEach(resposta => {
                    
                    if (resposta.pessoa_tipo == 1) {
                        this.listaAlunos.push(resposta)
                    }
                    
                });

            });
        },

        carregaCursosAluno: async function (pAluno) {
            debugger
            await api.post('/cursos-aluno', {id: pAluno}).then(response => {
                
                let aux = response.data
                aux.forEach(resposta => {
                    debugger
                    this.arrCursos.push(resposta)   
                });

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
        }
        
    },

    mounted() {

    }
}

</script>

<style src="./GestaoConsulta.scss" lang="scss" scoped>