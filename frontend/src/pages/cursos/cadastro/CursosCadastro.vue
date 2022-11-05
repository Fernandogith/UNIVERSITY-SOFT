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
                        <button class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="PessoasCadastro()" class="btn-padrao">Novo</button>
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="dados dados-gerais">
                    <h2>DADOS GERAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="nome" autocomplete="off" required>
                            <label for="nome">Código</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="nome" autocomplete="off" required>
                            <label for="nome">Nome</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="data_nascimento" autocomplete="off" required>
                            <label for="data_nascimento">Data Nascimento</label>
                        </div>
                        <!-- Selected Padrão -->
                        <div class="input-select" id="tipo">
                            <v-select v-model="tipo_pessoa_selecionada" :items="tipos_pessoas" attach chips rounded></v-select>
                        </div>
                        
                    </div>
                </div>
                <div class="dados informacoes-matricula" v-if="tipo_pessoa_selecionada == 'Aluno'">
                    <h2>INFORMAÇÕES SOBRE MATRICULA</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="matricula" autocomplete="off" required>
                            <label for="matricula">N° Matricula</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="cursos" autocomplete="off" required>
                            <label for="cursos">Cursos</label>
                        </div>
                    </div>
                </div>
                
                <div class="dados notas" v-if="tipo_pessoa_selecionada == 'Aluno'">
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
                {texto: 'Curso', },
                {texto: 'Nota', },
                {texto: '.', },
                {texto: '..', },
            ],

            // Dados da Table
            dadosFiltrados: [
                {id: 1, descricao: 'Curso de HTML', nota: 8.5,},
                {id: 2, descricao: 'Curso de CSS', nota: 10,},
                {id: 3, descricao: 'Curso de SASS', nota: 9.4,},
                {id: 4, descricao: 'Curso de JavaScript', nota: 10,},
            ],

            // Utilizado para receber a pessoa selecionada no select tipo
            tipo_pessoa_selecionada: [],
            
            // Utilizado para carregar o select tipo
            tipos_pessoas: ['Aluno', 'Professor'],

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
            window.location.href = '/pessoas-cadastro'
        }
        
    },
}

</script>

<style src="./CursosCadastro.scss" lang="scss" scoped>