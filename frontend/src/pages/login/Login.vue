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
                <!-- Botão menu responsivo -->
                <button class="btn-menu-responsivo" @click="abrirMenu">
                    <img src="@/assets/img/icones/icon-menu-responsivo.svg" alt="">
                </button>
        
                <!-- Navegação Desktop -->
                <nav class="menu-desktop">
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/">Quem Somos</a></li>
                        <li><a href="/">Contate-nos</a></li>
                    </ul>
                </nav>
            </div>
        
            <!-- Menu Responsivo -->
            <nav class="menu-responsivo" id="menu-responsivo">
                <div class="logo">
                    <a href="/">
                        <img src="@/assets/img/traco-logo.svg" alt="">
                        <strong>University</strong> <span>&nbsp;Soft</span>
                    </a>
                </div>
        
                <ul>
                    <li><a href="/" @click="fecharMenu">Quem Somos</a></li>
                    <li><a href="/" @click="fecharMenu">Contate-nos</a></li>
                </ul>
                
            </nav>
        
            <!-- Overley Responsivo -->
            <div class="overlay" id="overlay" @click="fecharMenu">
        
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
                            <input id="usuario" class="user" placeholder="Usuário" type="text" v-model="objDadosAcesso.usuario" v-on:keyup.enter="acessar(objDadosAcesso)">
                        </div>
                        <div class="div-password">
                            <input class="password" placeholder="Senha" type="password" v-model="objDadosAcesso.senha" v-on:keyup.enter="acessar(objDadosAcesso)">
                        </div>
                        <div class="btn-access">

                            <a class="button" @click="acessar(objDadosAcesso)">Acessar</a>
                            
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
        <footer>
            <h2>© Copyright 2022. Developed by Fernando Souza</h2>
        </footer>

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
        acessar: function (pDadosAcesso) {
            try {
                api.post('/login', pDadosAcesso).then(response => {

                    if (response.data == 'Sucesso') {
                        localStorage.setItem('usuario', pDadosAcesso.usuario);
                        window.location.href = '/inicio'
                    } else {
                        alert('Dados Incorretos, verifique!')
                    }

                });                
            } catch (error) {
                console.log(error);
            }

        },

        abrirMenu: function() {
            const openMenu = document.getElementById("menu-responsivo");
                openMenu.classList.add("active");

            const openOverlay = document.getElementById("overlay");
                openOverlay.classList.add("active");
        
        },

        fecharMenu: function() {
            const openMenu = document.getElementById("menu-responsivo");
                openMenu.classList.remove("active");

            const openOverlay = document.getElementById("overlay");
                openOverlay.classList.remove("active");
        
        }
    },
    mounted() {
        usuario.focus()
    }
}

</script>

<style src="./login.scss" lang="scss" scoped>