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
                        <button @click="DirecionarPaginaDisciplinaCadastro()" class="btn-padrao">Novo</button>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="filtros">
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input v-model="campoFiltro"  class="input-filtro" v-on:keyup.enter="filter(campoFiltro)"  type="text" id="nome" autocomplete="off" required>
                            <label for="nome">Pesquisar</label>
                        </div>
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
                            <tr v-for="listaDisciplinasFiltrado in listaDisciplinasFiltrados" :key="listaDisciplinasFiltrado.id">
                                <td>{{ listaDisciplinasFiltrado.id }}</td>
                                <td>{{ listaDisciplinasFiltrado.nome }}</td>
                                <td><a @click="editarDisciplinas(listaDisciplinasFiltrado)"><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                <td><a @click="deletaDisciplinas(listaDisciplinasFiltrado)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
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
    name: "DisciplinaConsulta",
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
            listaDisciplinas: [],

            campoFiltro: '',
            listaDisciplinasFiltrados: '',
        }
    },
    
    methods: {

        carregarDados: function () {

            api.post('/disciplinas').then(response => {


                response.data.forEach(resposta => {
                    this.listaDisciplinas.push(resposta)
                });

                this.listaDisciplinasFiltrados = this.listaDisciplinas

            });
        },

        editarDisciplinas: function(pDisciplinas) {
            window.location.href = '/disciplinas-cadastro'+ pDisciplinas.id
        },

        deletaDisciplinas: function (pDisciplinas) {
            debugger
            api.post('/deleta-disciplinas', pDisciplinas).then(response => {
                if (response.data == 'Sucesso') {
                    window.location.href = ('/disciplinas-consulta')
                }
                
                debugger


            });
        },

        DirecionarPaginaDisciplinaCadastro: function() {
            window.location.href = 'disciplinas-cadastro'
        },

        voltar: function () {
            window.location.href = '/inicio'
        },

        // FUNÇÕES PARA FILTROS
        filter (pCampoFiltro) {
            this.listaDisciplinasFiltrados = this.listaDisciplinas.filter(item => {

                return ((`${item.id}`).includes(pCampoFiltro) || !pCampoFiltro)
                    || ((`${item.nome}`).includes(pCampoFiltro) || !pCampoFiltro)
            })
        },
        
    },

    mounted() {
        this.carregarDados ()
    }
}

</script>

<style src="./DisciplinasConsulta.scss" lang="scss" scoped>