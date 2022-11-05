<template>

    <div class="menu">
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
                            <a href="/">
                                <img src="@/assets/img/icones/icon-materias.svg" alt="">
                                <span>Materias</span>
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

</template>

<script>
    export default {
    name: 'Menu.',

}
</script>

<style src="./Menu.scss" lang="scss" scoped>
