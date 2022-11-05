import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login/Login.vue'
import Inicio from '../pages/inicio/Inicio.vue'
import PessoasConsulta from '../pages/pessoas/consulta/PessoasConsulta.vue'
import PessoasCadastro from '../pages/pessoas/cadastro/PessoasCadastro.vue'
import CursosConsulta from '../pages/cursos/consulta/CursosConsulta.vue'
import CursosCadastro from '../pages/cursos/cadastro/CursosCadastro.vue'
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
