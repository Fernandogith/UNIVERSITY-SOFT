<template>
    <main>


        <div class="space inputs">

            <!-- Input Padrão -->
            <div class="input">
                <input type="text" id="nome" autocomplete="off" required>
                <label for="nome">Nome</label>
            </div>

            <div class="button">
                <button class="btn-padrao">Registrar</button>
            </div>

            <!-- Select Padrão -->
            <div class="input-select" id="tipo">
                <v-select v-model="tipo_pessoa_selecionada" :items="tipos_pessoas" attach chips rounded></v-select>
            </div>

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
                            <td>{{ dadosFiltrado.carga_horaria }}</td>
                            <td>{{ dadosFiltrado.situacao }}</td>
                            <td><a><img src="@/assets/img/icones/icon-editar.svg"></a></td>
                            <td><a><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>


    </main>
</template>

<script>
    export default {
    name: 'Components.',
    data() {
        return {
            // Utilizado para pegar o valor selecionado no Input-Select
            tipo_pessoa_selecionada: [],
            
            // Utilizado para gerar a lista do Input-select
            tipos_pessoas: ['Aluno', 'Professor'],

            // Cabeçalho da table
            headers: [
                {texto: 'Descrição', },
                {texto: 'Carga Horaria', },
                {texto: 'Situação', },
                {texto: '.', },
                {texto: '..', },
            ],

            // Dados da Table
            dadosFiltrados: [
                {id: 1, descricao: 'Curso de HTML', carga_horaria: 100, situacao: 'ativo'},
                {id: 2, descricao: 'Curso de CSS', carga_horaria: 100, situacao: 'ativo'},
                {id: 3, descricao: 'Curso de SASS', carga_horaria: 80, situacao: 'ativo'},
                {id: 4, descricao: 'Curso de JavaScript', carga_horaria: 200, situacao: 'inativo'},
            ],

        }
    },



    }
    
</script>


<style src="./components.scss" lang="scss" scoped>
