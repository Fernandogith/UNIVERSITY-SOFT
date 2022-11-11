<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top">
                <span data-aos="zoom-in">Olá, {{usuario}}</span>
            </div>

            <div class="indicadores">
                <div class="indicadores-grupo-01">
                    <div class="indicador indicador-02" data-aos="zoom-in">
                        <img src="@/assets/img/img-01.svg" alt="">
                    </div>
                    <div class="indicador indicador-04" data-aos="zoom-in">
                        <img src="@/assets/img/img-02.svg" alt="">
                    </div>
                </div>
                <div class="indicadores-grupo-02">
                    <div class="indicador indicador-01" data-aos="zoom-in">
                        <img src="@/assets/img/img-03.svg" alt="">
                    </div>
                    <div class="indicador indicador-03" data-aos="zoom-in">
                        <img src="@/assets/img/img-04.svg" alt="">
                    </div>
                </div>
            </div>
        </section>
    </main>


</template>


<script>
import api from '@/services/api'
import Menu from '../../components/menu/Menu..vue';


export default {
    components: { Menu },
    name: "Login",
    

    data() {
        return {
            usuario: 'Usuario',
        }
    },
    
    methods: {

        buscarNoBack: function () {

            api.post('/').then(response => {
            });
        },

        carregaUsuario: function () {
            this.usuario = localStorage.getItem('usuario')
            
        },
        
    },
    mounted() {
        this.carregaUsuario()
    }
}

</script>

<style src="./inicio.scss" lang="scss" scoped>