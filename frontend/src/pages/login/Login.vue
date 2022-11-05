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
                <div class="left">
                    <h1>Bem vindo ao <br/>Futuro em educação</h1>
                    <p>Somos uma startup conceito em gestão de educação e visamos <br/> revolucionar a educação em todo o mundo</p>
                    <div class="img">
                        <img src="@/assets/img/img-foguete-login.svg" alt="">
                    </div>
                </div>
                <div class="right">
                    <div class="items-login">
                        <div class="div-user">
                            <input class="user" placeholder="Usuário" type="text">
                        </div>
                        <div class="div-password">
                            <input class="password" placeholder="Senha" type="password">
                        </div>
                        <div class="btn-access">
                            <button class="access" @click="acessar()">Acessar</button>
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


export default {
    name: "Login",
    

    data() {
        return {
    
        }
    },
    
    methods: {

        // Valida o acesso no sistema
        acessar: function () {
            window.location.href = '/inicio'

        }
        
    },
}

</script>

<style src="./login.scss" lang="scss" scoped>