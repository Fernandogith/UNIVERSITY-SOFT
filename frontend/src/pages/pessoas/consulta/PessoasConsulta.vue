<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top" data-aos="fade-left">

                <span>| Pessoas Consulta</span>
                <div class="actions">
                    <div class="button">
                        <button @click="buscarNoBack()" class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="DirecionarPaginaPessoasCadastro()" class="btn-padrao">Novo</button>
                    </div>
                </div>
            </div>

            <div class="main" data-aos="fade-left">
                <div class="filtros">
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input class="input-filtro" v-model="campoFiltro" @change="filter(campoFiltro)" v-on:keyup.enter="filter(campoFiltro)" type="text" id="nome" autocomplete="off" required>
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
                            <tr v-for="listaPessoasFiltrada in listaPessoasFiltradas" :key="listaPessoasFiltrada.id">
                                <td>{{ listaPessoasFiltrada.id }}</td>
                                <td>{{ listaPessoasFiltrada.nome }}</td>
                                <td>{{ listaPessoasFiltrada.pessoa_tipo_descricao}}</td>
                                <td><a @click="editarPessoa(listaPessoasFiltrada)"><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                                <td><a @click="deletaPessoa(listaPessoasFiltrada)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <!-- Caixa de Mensagem/notificação -->
        <template>
            <div class="text-center ma-2">
                <v-snackbar v-model="exibeMensagem">
                    {{ textoMensagem }}
        
                    <template v-slot:action="{ attrs }">
                        <v-btn color="pink" text v-bind="attrs" @click="exibeMensagem = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
        </template>
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
                {texto: 'Tipo', },
                {texto: null, },
                {texto: null, },

            ],

            // Dados da Table
            listaPessoas: [],

            campoFiltro: '',
            listaPessoasFiltradas: '',

            // Mensagem
            exibeMensagem: false,
            textoMensagem: `Hello, I'm a snackbar`,
        }
    },
    
    methods: {

        carregarDados: function () {

            api.post('/pessoas').then(response => {
                response.data.forEach(resposta => {
                    this.listaPessoas.push(resposta)
                    
                });
                
                this.listaPessoasFiltradas = this.listaPessoas
                


            });
        },

        editarPessoa: function(pPessoa) {
            window.location.href = '/pessoas-cadastro'+ pPessoa.id
        },

        deletaPessoa: function (pPessoa) {
            
            api.post('/deleta-pessoas', pPessoa).then(response => {
                if (response.data == 'Sucesso') {
                    window.location.href = ('/pessoas-consulta')
                    alert('Deletado com sucesso!')
                }
                
                


            });
        },

        DirecionarPaginaPessoasCadastro: function() {
            window.location.href = 'pessoas-cadastro'
        },

        // FUNÇÕES PARA FILTROS
        filter (pCampoFiltro) {
            this.listaPessoasFiltradas = this.listaPessoas.filter(item => {

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

<style src="./PessoasConsulta.scss" lang="scss" scoped>