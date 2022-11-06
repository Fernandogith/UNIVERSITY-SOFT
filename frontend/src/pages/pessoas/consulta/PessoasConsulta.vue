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
                        <button @click="buscarNoBack()" class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="DirecionarPaginaPessoasCadastro()" class="btn-padrao">Novo</button>
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
                            <tr v-for="listaPessoa in listaPessoas" :key="listaPessoa.id">
                                <td>{{ listaPessoa.id }}</td>
                                <td>{{ listaPessoa.nome }}</td>
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
            listaPessoas: [],
        }
    },
    
    methods: {

        carregarDados: function () {

            api.get('/pessoas').then(response => {


                response.data.forEach(resposta => {
                    this.listaPessoas.push(resposta)
                });

            });
        },

        DirecionarPaginaPessoasCadastro: function() {
            let ultimo = this.listaPessoas[this.listaPessoas.length - 1];

            window.location.href = 'pessoas-cadastro' + ultimo.id
        }
        
    },

    mounted() {
        this.carregarDados ()
    }
}

</script>

<style src="./PessoasConsulta.scss" lang="scss" scoped>