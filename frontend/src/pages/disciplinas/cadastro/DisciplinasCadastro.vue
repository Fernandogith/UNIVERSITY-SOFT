<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top" data-aos="fade-left">
                <span>| Cadastro</span>
                <div class="actions">
                    <div class="button">
                        <button @click="voltar()"  class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="salvarDisciplina(objDisciplina)" class="btn-padrao">Salvar</button>
                    </div>
                </div>
            </div>

            <div class="main" data-aos="fade-left">
                <div class="dados dados-gerais">
                    <h2>DADOS GERAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="codigo" autocomplete="off" required v-model="objDisciplina.id">
                            <label for="codigo" >Código</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="nome" autocomplete="off" required v-model="objDisciplina.nome">
                            <label for="nome">Nome</label>
                        </div>
                        <!-- Selected Padrão -->
                        <div class="input-select" id="tipo">
                            <v-select v-model="objDisciplina.professor" :items="listaProfessores" item-text="nome" return-object @change="objDisciplina.professor" @click="carregaProfessores()" placeholder="Professor" attach chips rounded></v-select>
                        </div>
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
    name: "DisciplinasCadastro",
    

    data() {
        return {
            // Utilizado para verificar se é um novo registro sendo inserido
            novoRegistro: null,

            // Cabeçalho da table
            headers: [
                {texto: 'Código', },
                {texto: 'Disciplinas', },
                {texto: null, },
                {texto: null, },
            ],

            // Dados da Table
            objDisciplina: {id: '', nome: ''},

            // Utilzado para salvar o professor selecionado
            listaProfessorSelecionado: [],

            // Utilzado para carregar a lista de professores
            listaProfessores: [],

        }
    },
    
    methods: {

        // Carrega dados da pessoa pelo ID para popular os campos e atualizar
        carregarDados: function (pId) {

            api.post('/disciplinas', pId).then(response => {

            this.populaCampos(response.data[0])
                

            });
        },

        // Salva Disciplina ou manda para atualizar
        salvarDisciplina: async function (pDisciplina) {

            if (this.novoRegistro) {
                
                await api.post('/insere-disciplinas', pDisciplina).then(response => {
                alert('Salvo com sucesso!')
                window.location.href = '/disciplinas-consulta'

            })
            } else {
                this.atualizar(pDisciplina)
            }
        },

        // Atualiza Pessoa
        atualizar: async function (pDisciplina) {
            
            await api.post('/atualiza-disciplinas', pDisciplina).then(response => {
                alert('Atualizado com sucesso!')
                window.location.href = '/disciplinas-consulta'

            })

        },

        // Volta para o Pessoa Consulta
        voltar: function () {
            window.location.href = '/disciplinas-consulta'
        },

        // Utilizada para popular os campos clicar em atualizar
        populaCampos: function (pDisciplina) {
            
            this.carregaProfessores()
            this.objDisciplina.id = pDisciplina.id,
            this.objDisciplina.nome = pDisciplina.nome,
            this.objDisciplina.professor = pDisciplina.professor
        },

        // Retorna o parametro passado pela rota (caso exista)
        PegaParametro: function () {
            return this.$route.params.id
        },

        // Utilizado para buscar o proximo ID
        BuscaProximoId: async function () {
            
            if (this.objDisciplina.id == '' || this.objDisciplina.id == null) {
                api.post('/disciplina-proximo-id').then(response => {
                    
                this.objDisciplina.id = response.data[0]
            
                })
            }
        },

        // Utilizado para buscar os tipos de pessoa no banco
        carregaProfessores: async function () {
            api.post('/carrega-professores').then(response => {
            
                response.data.forEach(professor => {
                    this.listaProfessores.push(professor)
                })
            });
        },

    },

    mounted() {
        
        let parametro = {}
        parametro.id = this.PegaParametro()

        if (parametro.id != undefined) {
            this.carregarDados(parametro)
        } else {
            this.novoRegistro = true
            this.objDisciplina.id = this.BuscaProximoId()

        }


        
    }
}

</script>

<style src="./DisciplinasCadastro.scss" lang="scss" scoped>