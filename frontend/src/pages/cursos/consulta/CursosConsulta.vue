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
                        <button class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="PessoasCadastro()" class="btn-padrao">Novo</button>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="filtros">
                    <h2>FILTRO</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input class="input-filtro" type="text" id="nome" autocomplete="off" required>
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
                            <tr v-for="dadosFiltrado in dadosFiltrados" :key="dadosFiltrado.id">
                                <td>{{ dadosFiltrado.descricao }}</td>
                                <td>{{ dadosFiltrado.carga_horaria }}</td>
                                <td>{{ dadosFiltrado.situacao }}</td>
                                <td><a><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                <td><a><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
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
    name: "Login",
    

    data() {
        return {

            // Cabeçalho da table
            headers: [
                {texto: 'Descrição', },
                {texto: 'Carga Horaria', },
                {texto: 'Situação', },
                {texto: '.', },
                {texto: '..', },

            ],

            // Recebe os dados para carregar a Table
            dadosFiltrados: [
                {id: 1, descricao: 'Curso de HTML', carga_horaria: 100, situacao: 'ativo'},
                {id: 2, descricao: 'Curso de CSS', carga_horaria: 100, situacao: 'ativo'},
                {id: 3, descricao: 'Curso de SASS', carga_horaria: 80, situacao: 'ativo'},
                {id: 4, descricao: 'Curso de JavaScript', carga_horaria: 200, situacao: 'inativo'},
            ]
        }
    },
    
    methods: {

        buscarNoBack: function () {

            api.get('/').then(response => {

                console.log(response.data); 
            });
        },

        // Leva para a Pagina de Cadastro
        PessoasCadastro: function() {
            window.location.href = '/cursos-cadastro'
        }
        
    },
}

</script>

<style src="./CursosConsulta.scss" lang="scss" scoped>