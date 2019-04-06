<template>
    <div class="container-fluid">
        <Navbar></NavBar>
        <div class="contenido">
            <div class="row login">
                <div class="card1 col-md-4 ">
                    <q-card >
                    <q-card-title class="title boxTitle">
                    Join
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <q-input v-model="name"  stack-label="Name"/>
                        <q-input v-model="team" type="email"   stack-label="Team"/>
                        <q-btn  class="button" label="Save" />
                    </q-card-main>
                    </q-card>
                </div>   
                <div class="col-md-4">
                    <q-card >
                    <q-card-title class="title boxTitle">
                    Team
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <q-input v-model="name"  stack-label="Name"/>
                        <q-btn  class="button" label="Save" />
                    </q-card-main>
                    </q-card>
                </div>  
            </div>     
        </div>     
    </div>
</template>
<script>
import Navbar from './Navbar.vue'
export default {
    data () {
        return {
            name:''
        }
    },
    components: {
        Navbar
    }
}
</script>
<style>
    .contenido{
     margin: 5%;
     margin-top: 4%
    }
    .card1{
        margin-right: 5%;
    }
</style>