<template>
    <main>
        <header>
            <Menu />
        </header>
        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top" data-aos="fade-left">
                <span>| Cursos Consulta</span>
                <div class="actions">
                    <div class="button">
                        <button @click="voltar()" class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="DirecionarPaginaCursoCadastro()" class="btn-padrao">Novo</button>
                    </div>
                </div>
            </div>

            <div class="main" data-aos="fade-left">
                <div class="filtros">
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input v-model="campoFiltro" class="input-filtro" v-on:keyup.enter="filter(campoFiltro)" type="text" id="nome" autocomplete="off" required>
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
                            <tr v-for="listaCursosFiltrado in listaCursosFiltrados" :key="listaCursosFiltrado.id">
                                <td>{{ listaCursosFiltrado.id }}</td>
                                <td>{{ listaCursosFiltrado.nome }}</td>
                                <td><a @click="editarCurso(listaCursosFiltrado)"><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                <td><a @click="deletaCurso(listaCursosFiltrado)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
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
                {texto: null, },
                {texto: null, },

            ],

            // Dados da Table
            listaCursos: [],

            campoFiltro: '',
            listaCursosFiltrados: '',
        }
    },
    
    methods: {

        carregarDados: function () {

            api.post('/cursos').then(response => {

                
                response.data.forEach(resposta => {
                    this.listaCursos.push(resposta)
                });
                this.listaCursosFiltrados = this.listaCursos

            });
        },

        editarCurso: function(pCurso) {
            window.location.href = '/cursos-cadastro'+ pCurso.id
        },

        deletaCurso: function (pCurso) {
            
            api.post('/deleta-cursos', pCurso).then(response => {
                if (response.data == 'Sucesso') {
                    alert('Deletado com sucesso!')
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

        // FUNÇÕES PARA FILTROS
        filter (pCampoFiltro) {
            this.listaCursosFiltrados = this.listaCursos.filter(item => {

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

<style src="./CursosConsulta.scss" lang="scss" scoped>