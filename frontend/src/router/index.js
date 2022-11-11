import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login/Login.vue'
import Inicio from '../pages/inicio/Inicio.vue'
import PessoasConsulta from '../pages/pessoas/consulta/PessoasConsulta.vue'
import PessoasCadastro from '../pages/pessoas/cadastro/PessoasCadastro.vue'
import CursosConsulta from '../pages/cursos/consulta/CursosConsulta.vue'
import CursosCadastro from '../pages/cursos/cadastro/CursosCadastro.vue'
import DisciplinasConsulta from '../pages/disciplinas/consulta/DisciplinasConsulta.vue'
import DisciplinasCadastro from '../pages/disciplinas/cadastro/DisciplinasCadastro.vue'
import GestaoConsulta from '../pages/gestao/consulta/GestaoConsulta.vue'
import Components from '../components/Components..vue'

Vue.use(VueRouter)

const routes = [
    // LOGIN
    {
        path: '/',
        redirect: '/login',
    },
    // Aqui é um redirect
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
    path: '/inicio',
    name: 'inicio',
    component: Inicio
    },
    {
    path: '/inicio:id',
    name: 'inicio-parametro',
    component: Inicio
    },
    // PESSOAS
    {
    path: '/pessoas-consulta',
    name: 'pessoas-consulta',
    component: PessoasConsulta
    },
    {
    path: '/pessoas-cadastro',
    name: 'pessoas-cadastro',
    component: PessoasCadastro
    },
    // PESSOAS CADASTRO COM PARAMETRO
    {
    path: '/pessoas-cadastro:id',
    name: 'pessoas-cadastro-parametro',
    component: PessoasCadastro
    },
    // CURSOS
    {
    path: '/cursos-consulta',
    name: 'cursos-consulta',
    component: CursosConsulta
    },
    {
    path: '/cursos-cadastro',
    name: 'cursos-cadastro',
    component: CursosCadastro
    },
    // CURSOS CADASTRO COM PARAMETRO
    {
    path: '/cursos-cadastro:id',
    name: 'cursos-cadastro-parametro',
    component: CursosCadastro
    },
    // DISCIPLINAS
    {
    path: '/disciplinas-consulta',
    name: 'disciplinas-consulta',
    component: DisciplinasConsulta
    },
    {
    path: '/disciplinas-cadastro',
    name: 'disciplinas-cadastro',
    component: DisciplinasCadastro
    },
    // DISCIPLINAS CADASTRO COM PARAMETRO
    {
    path: '/disciplinas-cadastro:id',
    name: 'disciplinas-cadastro-parametro',
    component: DisciplinasCadastro
    },
    // DISCIPLINAS
    {
    path: '/gestao-consulta',
    name: 'gestao-consulta',
    component: GestaoConsulta
    },
    {
    path: '/components',
    name: 'components',
    component: Components
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
