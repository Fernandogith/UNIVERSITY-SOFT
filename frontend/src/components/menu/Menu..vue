<template>
    <main>
        <div class="menu menu-desktop" data-aos="fade-right">
            
            <div class="container-fluid">
                <div class="top">
                    <div class="logo">
                        <a href="/">
                            <strong>University</strong> <span>&nbsp;Soft</span> 
                        </a>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a href="/inicio">
                                    <img src="@/assets/img/icones/icon-inicio.svg" alt="">
                                    <span>Inicio</span>
                                </a>
                            </li>
                            <li>
                                <a href="/pessoas-consulta">
                                    <img src="@/assets/img/icones/icon-pessoas.svg" alt="">
                                    <span>Pessoas</span>
                                </a>
                            </li>
                            <li>
                                <a href="/cursos-consulta">
                                    <img src="@/assets/img/icones/icon-cursos.svg" alt="">
                                    <span>Cursos</span>
                                </a>
                            </li>
                            <li>
                                <a href="/disciplinas-consulta">
                                    <img src="@/assets/img/icones/icon-materias.svg" alt="">
                                    <span>Disciplinas</span>
                                </a>
                            </li>
                            <li>
                                <a href="/gestao-consulta">
                                    <img src="@/assets/img/icones/icon-gestao.svg" alt="">
                                    <span>Gestão</span>
                                </a>
                            </li>
                            <li>
                                <a href="/usuarios-consulta">
                                    <img src="@/assets/img/icones/icon-pessoas.svg" alt="">
                                    <span>Usuários</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="@/assets/img/icones/icon-sair.svg" alt="">
                                    <span>Saír</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    
                </div>
                <div class="versao">
                    <span>Versão 1.0</span>
                </div>
            </div>

        </div>

        <div class="menu menu-mobile">
            <!-- Botão menu responsivo -->
            <button class="btn-menu-responsivo" @click="abrirMenu">
                <img src="@/assets/img/icones/icon-menu-responsivo.svg" alt="">
            </button>
            <!-- Menu Responsivo -->
            <nav class="menu-responsivo" id="menu-responsivo">
                <div class="logo">
                    <a href="/">
                        <img src="@/assets/img/traco-logo.svg" alt="">
                        <strong>University</strong> <span>&nbsp;Soft</span>
                    </a>
                </div>
            
                <ul>
                    <li>
                        <a href="/inicio">
                            <img src="@/assets/img/icones/icon-inicio.svg" alt="">
                            <span>Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href="/pessoas-consulta">
                            <img src="@/assets/img/icones/icon-pessoas.svg" alt="">
                            <span>Pessoas</span>
                        </a>
                    </li>
                    <li>
                        <a href="/cursos-consulta">
                            <img src="@/assets/img/icones/icon-cursos.svg" alt="">
                            <span>Cursos</span>
                        </a>
                    </li>
                    <li>
                        <a href="/disciplinas-consulta">
                            <img src="@/assets/img/icones/icon-materias.svg" alt="">
                            <span>Disciplinas</span>
                        </a>
                    </li>
                    <li>
                        <a href="/gestao-consulta">
                            <img src="@/assets/img/icones/icon-gestao.svg" alt="">
                            <span>Gestão</span>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <img src="@/assets/img/icones/icon-sair.svg" alt="">
                            <span>Saír</span>
                        </a>
                    </li>
                </ul>
            
            </nav>
            
            <!-- Overley Responsivo -->
            <div class="overlay" id="overlay" @click="fecharMenu">
            
            </div>
        </div>
    </main>
</template>

<script>
    export default {
    name: 'Menu.',


    methods: {
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
    }
}

</script>

<style src="./Menu.scss" lang="scss" scoped>
