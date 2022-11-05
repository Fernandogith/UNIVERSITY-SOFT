<template>
    <main>

        <section class="left">
            <Menu />
        </section>

        <section class="right">
            <div class="top">
                <span>Olá, Usuário</span>
            </div>

            <div class="indicadores">
                <div class="indicadores-grupo-01">
                    <div class="indicador indicador-02">
                        <img src="@/assets/img/img-01.svg" alt="">
                    </div>
                    <div class="indicador indicador-04">
                        <img src="@/assets/img/img-02.svg" alt="">
                    </div>
                </div>
                <div class="indicadores-grupo-02">
                    <div class="indicador indicador-01">
                        <img src="@/assets/img/img-03.svg" alt="">
                    </div>
                    <div class="indicador indicador-03">
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
    
        }
    },
    
    methods: {

        buscarNoBack: function () {

            api.get('/').then(response => {

                console.log(response.data); 
            });
        }
        
    },
}

</script>

<style src="./inicio.scss" lang="scss" scoped>