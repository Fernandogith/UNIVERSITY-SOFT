<template>
    <main>
        <header>
            <div class="container-fluid">
                <div class="logo">
                    <a href="/">
                        <img src="@/assets/img/traco-logo.svg" alt="">
                        <strong>University</strong> <span>&nbsp;Soft</span> 
                    </a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        <li>
                            <a href="/">Quem Somos</a>
                        </li>
                        <li>
                            <a href="/">Contate-nos</a>
                        </li>
                    </ul>
                </nav>
                <div class="btn-registrar">
                    <button class="btn-login">Registrar</button>
                </div>
            </div>
        </header>

        <section class="main">
            <div class="container-fluid">
                <div class="left" data-aos="fade-right">
                    <h1>Bem vindo ao <br/>Futuro em educação</h1>
                    <p>Somos uma startup conceito em gestão de educação e visamos <br/> revolucionar a educação em todo o mundo</p>
                    <div class="img">
                        <img src="@/assets/img/img-foguete-login.svg" alt="">
                    </div>
                </div>
                <div class="right" >
                    <div class="items-login" data-aos="fade-left">
                        <div class="div-user">
                            <input class="user" placeholder="Usuário" type="text" v-model="objDadosAcesso.usuario">
                        </div>
                        <div class="div-password">
                            <input class="password" placeholder="Senha" type="password" v-model="objDadosAcesso.senha">
                        </div>
                        <div class="btn-access">
                            <button class="access" @click="acessar(objDadosAcesso)">Acessar</button>
                        </div>
                        <span>━━━━━━━━━━&nbsp;&nbsp;&nbsp;&nbsp;continue por&nbsp;&nbsp;&nbsp;&nbsp;━━━━━━━━━━</span>
                        <div class="social">
                            <a href="/">
                                <img src="@/assets/img/icones/icon-google.svg" alt="">
                            </a>
                            <a href="/">
                                <img src="@/assets/img/icones/icon-apple.svg" alt="">
                            </a>
                            <a href="/">
                                <img src="@/assets/img/icones/icon-facebook.svg" alt="">
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </section>

    </main>
</template>


<script>

import api from '@/services/api'
export default {
    name: "Login",
    

    data() {
        return {
            objDadosAcesso: {usuario: '', senha: ''}
    
        }
    },
    
    methods: {

        // Valida o acesso no sistema
        acessar: async function (pDadosAcesso) {
debugger

            await api.post('/login', pDadosAcesso).then(response => {

                if (response.data == 'Sucesso') {
                    localStorage.setItem('usuario', pDadosAcesso.usuario);
                    window.location.href = '/inicio'
                } else {
                    alert('Dados Incorretos, verifique!')
                }

            });
        }
    },
}

</script>

<style src="./login.scss" lang="scss" scoped>