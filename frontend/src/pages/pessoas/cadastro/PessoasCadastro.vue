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
                <span>| Pessoas Cadastro</span>
                <div class="actions">
                    <div class="button">
                        <button @click="voltar()"  class="btn-padrao">Voltar</button>
                    </div>
                    <div class="button">
                        <button @click="salvarPessoa(objPessoa)" class="btn-padrao">Salvar</button>
                    </div>
                </div>
            </div>

            <div class="main" data-aos="fade-left">
                <div class="dados dados-gerais">
                    <h2>DADOS GERAIS</h2>
                    <div class="group-inputs">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="codigo" autocomplete="off" required v-model="objPessoa.id">
                            <label for="codigo" >Código</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="nome"  autocomplete="off" required v-model="objPessoa.nome">
                            <label for="nome">Nome</label>
                        </div>
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" v-mask="'##/##/####'" placeholder = " 00/00/0000 " id="data_nascimento" autocomplete="off" required v-model="objPessoa.data_nascimento">
                            <label for="data_nascimento">Data Nascimento</label>
                        </div>
                        <!-- Selected Padrão -->
                        <div class="input-select" id="tipo">
                            <v-select v-model="tipos_pessoas_selecionado" :disabled="novoRegistro == true ? false : true" :items="tipos_pessoas" item-text="nome" return-object @click="carregaTiposPessoa()" @change="tipos_pessoas_selecionado.nome == 'Aluno' ? BuscaProximoNumeroMatricula() : tipos_pessoas_selecionado.nome"  placeholder="Tipo" attach chips rounded></v-select>
                        </div>
                    </div>
                    <div class="group-inputs"> 
                        <!-- Input Padrão -->
                        <div class="input" v-if="tipos_pessoas_selecionado.nome == 'Aluno'">
                            <input type="text" id="matricula" autocomplete="off" required v-model="objPessoa.numeroMatriculaAluno">
                            <label for="matricula">N° Matricula</label>
                        </div>                     
                    </div>
                    <div class="group-inputs" v-if="tipos_pessoas_selecionado.nome == 'Professor'">
                        <!-- Input Padrão -->
                        <div class="input">
                            <input type="text" id="salario" autocomplete="off" required  v-mask = " currencyMask "  v-model="objPessoa.salarioProfessor"  placeholder = " € 100.00 ">
                            <label for="salario">Salário Negociado</label>
                        </div>
                    </div>
                </div>
                <div class="add-cursos" v-if="tipos_pessoas_selecionado.nome == 'Aluno'">
                    <div class="group-inputs">
                        <div class="input-busca-aluno">
                            <div class="label">
                                <label for="selecione-aluno">SELECIONE OS CURSOS PARA ADICIONAR</label>
                            </div>
                            <!-- Selected Padrão -->
                            <div class="input-select lista-alunos" id="cursos" @change="adicionarCurso(listaCursosSelecionado)" @click="carregaCursos()">
                                
                                <v-autocomplete id="selecione-aluno" v-model="listaCursosSelecionado" :items="listaCursos" item-text="nome" return-object @click="carregaCursos()" @change="adicionarCurso(listaCursosSelecionado)" attach chips rounded>
                                </v-autocomplete>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="dados pessoa-cursos" v-if="tipos_pessoas_selecionado.nome == 'Aluno'">
                    <div class="table-espaco" v-if="listaCursosContratados.length >=1">
                    <table class="table table-borderless table-striped m-0 w-970">
                        <thead>
                            <tr>
                                <th v-for="header in headers" :key="header.texto">{{ header.texto }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="listaCursosContratado in listaCursosContratados" :key="listaCursosContratado.id">
                                <td>{{ listaCursosContratado.curso_id }}</td>
                                <td>{{ listaCursosContratado.nome }}</td>
                                <td><a @click="deletaCurso(listaCursosContratado.curso_id)"><img src="@/assets/img/icones/icon-excluir.svg"></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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

// Mascara para Moedas
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
  const currencyMask = createNumberMask({
    prefix: '€ ',
    allowDecimal: true,
    includeThousandsSeparator: true,
    allowNegative: false,
  });

export default {
    components: { Menu },
    name: "Login",
    

    data() {
        return {
            // Utilizado para verificar se é um novo registro sendo inserido
            novoRegistro: null,

            // Cabeçalho da table
            headers: [
                {texto: 'Código', },
                {texto: 'Curso', },
                {texto: null, },
            ],

            // Dados da Table
            objPessoa: {id: '', nome: '', data_nascimento: '', tipo: '', numeroMatriculaAluno: '', salarioProfessor: null, infos_aluno: []},

            // Utilizado para receber o tipo de pessoa selecionado
            tipos_pessoas_selecionado: {},
            // Lista apresentada no Select Tipo Pessoa
            tipos_pessoas: [],

            // Array para receber a lista de cursos contratados do aluno
            listaCursosContratados: [],

            // Array para receber a lista de cursos existentes
            listaCursos: [],

            // Array para receber o curso selecionado
            listaCursosSelecionado: {},

            // Utilizado para pegar o parametro enviado pela rota ao editar
            parametro: {},

            currencyMask, 
            myInputModel : ' ',

            // Mensagem
            exibeMensagem: false,
            textoMensagem: `Hello, I'm a snackbar`,
        }
    },
    
    methods: {

        // Carrega dados da pessoa pelo ID para popular os campos e atualizar
        carregarDados: async function (pId) {

            await api.post('/pessoas', pId).then(response => {
                
                this.carregaTiposPessoa()
                this.populaCampos(response.data[0])
                

            });
        },

        // Salva Pessoa ou manda para atualizar
        salvarPessoa: async function (pPessoa) {
            
            pPessoa.tipo = this.tipos_pessoas_selecionado.id

            // Caso o tipo seja aluno, adiciona no objeto que estamos enviando a lista de cursos selecionados
            if (pPessoa.tipo == 1) {
                this.listaCursosContratados.forEach(curso => {
                    pPessoa.infos_aluno.push(curso)
                });
                
            }
            
            if (this.novoRegistro == true) {
                
                await api.post('/insere-pessoas', pPessoa).then(response => {
                alert('Salvo com sucesso!')
                window.location.href = '/pessoas-consulta'

            });
            } else {
                
                this.atualizar(pPessoa)
            }
        },

        // Atualiza Pessoa
        atualizar: function (pPessoa) {
            try {
                let objAtualizaPessoa = {}
                objAtualizaPessoa = pPessoa
                let arrAux = pPessoa.infos_aluno
            
                objAtualizaPessoa.tipo = this.tipos_pessoas_selecionado.nome
            
            for (let i = 0; i < arrAux.length; i++) {
                if (arrAux[i].pessoa_id == undefined) {
                    arrAux[i].pessoa_id = objAtualizaPessoa.id
                }
                
            }
            objAtualizaPessoa.infos_aluno = arrAux

                api.post('/atualiza-pessoas', pPessoa).then(response => {
                    alert('Atualizado com sucesso!')
                    window.location.href = '/pessoas-consulta'
                })   
                 
            } catch (error) {
                alert(error)
            }
            

        },

        // Volta para o Pessoa Consulta
        voltar: function () {
            window.location.href = '/pessoas-consulta'
        },

        carregaCursos: function () {
            api.post('/cursos').then(response => {
                let curso = {}
                response.data.forEach(cursoAdd => {
                    curso = {
                        curso_id: cursoAdd.id,
                        nome: cursoAdd.nome
                    }


                    this.listaCursos.push(curso)
                });

                
                

            });
        },

        adicionarCurso: function(pCurso) {
            this.listaCursosContratados.push(pCurso)
            this.listaCursosSelecionado = null;  
            
        },

        deletaCurso: async function(pCursoId) {
            
            let itemDelete = {}
            itemDelete.pessoa_id = this.objPessoa.id;
            itemDelete.curso_id = pCursoId;


            await api.post('/deleta-curso-contratado', itemDelete).then(response => {
               
                if (response.data == 'Sucesso') {
                    window.location.href = window.location.pathname
                    alert('Deletado com Sucesso!')
                }
            });
        },

        // Utilizada para popular os campos clicar em atualizar
        populaCampos: function(pPessoa){
            
            this.objPessoa.id = pPessoa.id,
            this.objPessoa.nome = pPessoa.nome,
            this.objPessoa.data_nascimento = pPessoa.data_nascimento,
            this.tipos_pessoas_selecionado = {id: pPessoa.tipo, nome: pPessoa.tipo == 1 ? 'Aluno' : 'Professor'}
            this.objPessoa.numeroMatriculaAluno = pPessoa.numeroMatriculaAluno,
            this.objPessoa.salarioProfessor = pPessoa.salarioProfessor

            if (pPessoa.cursosAluno.length > 0) {
                pPessoa.cursosAluno.forEach(cursoContratado => {
                    this.listaCursosContratados.push(cursoContratado)
                });
            } else {
                this.listaCursosContratados = [];
            }

       
            
        },

        // Retorna o parametro passado pela rota (caso exista)
        PegaParametro: function () {
            return this.$route.params.id
        },

        // Utilizado para buscar o proximo numero de matricula do aluno
        BuscaProximoNumeroMatricula: async function () {
            
            if (this.objPessoa.numeroMatriculaAluno == '' || this.objPessoa.numeroMatriculaAluno == null) {
                api.post('/matriculas').then(response => {
                    
                this.objPessoa.numeroMatriculaAluno = response.data[0]
            
                });
            }
        },

        // Utilizado para buscar o proximo ID
        BuscaProximoId: async function () {
            
            if (this.objPessoa.id == '' || this.objPessoa.id == null) {
                api.post('/pessoas-proximo-id').then(response => {
                    
                this.objPessoa.id = response.data[0]
            
                });
            }
        },

        // Utilizado para buscar os tipos de pessoa no banco
        carregaTiposPessoa: async function () {
            api.post('/tipos-pessoa').then(response => {
                response.data.forEach(tipo => {
                    this.tipos_pessoas.push(tipo)
                })
            });
        },
    },

    mounted() {
        
        this.parametro = {}
        this.parametro.id = this.PegaParametro()

        if (this.parametro.id != undefined) {
            this.carregarDados(this.parametro)
        } else {
            this.novoRegistro = true
            this.objPessoa.id = this.BuscaProximoId()

        }


        
    }
}

</script>

<style src="./PessoasCadastro.scss" lang="scss" scoped>