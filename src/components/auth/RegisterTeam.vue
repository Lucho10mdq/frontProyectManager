<template>
    <div class="container-fluid">
        <Navbar></NavBar>
        <div class="contenido">
            <div class="row login">
                <div class="card1 col-md-4 ">
                    <q-card >
                    <q-card-title class="title boxTitle">
                    Join Team
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <q-input v-model="nameJoin"  stack-label="Search Team"/>
                        <q-input v-model="team"    stack-label="Team"/>
                        <q-btn @click="JoinRegister" class="button" label="Save" />
                    </q-card-main>
                    </q-card>
                </div>   
                <div class="col-md-4">
                    <q-card >
                    <q-card-title class="title boxTitle">
                    Create Team
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                        <q-input v-model="name"  stack-label="Name"/>
                        <q-btn @click="TeamRegister" class="button" label="Save" />
                    </q-card-main>
                    </q-card>
                </div>  
            </div>     
        </div>     
    </div>
</template>
<script>
import axios from 'axios'
import { Notify } from 'quasar'
import Navbar from './Navbar.vue'
export default {
    data () {
        return {
            name:'',
            team:'',
            nameJoin:''
        }
    },
    components: {
        Navbar
    },
    methods: {
        MaysPrimera(){
            const app = this
            return  app.name= app.name.charAt(0).toUpperCase() + app.name.slice(1);;
        },
        TeamRegister () {
            const app = this
            var names
            var token = this.$store.state.login.login['token']
            var headers = {
                headers: {'Authorization': 'Bearer ' + token}
            }
            if (app.name != '') {
                //app.name= app.name.charAt(0).toUpperCase() + app.name.slice(1);
                app.name = app.MaysPrimera(app.name.toLowerCase()); //convierto la primer letra en mayusculas el resto en minusculas
                const team = {
                    name : app.name
                }
                const REGISTER_TEAM = process.env.API_URL + '/team'
                axios.post(REGISTER_TEAM,team,headers).then(function (response){
                    if (response.data == 200){
                        Notify.create({
                            message:'Se creo team con exito',
                            position:'center',
                            type:'positive'
                        })
                        app.$router.push('/main')
                    }
                }).catch(function (error){
                    Notify.create({
                        message:'Error en el servidor',
                        position:'center',
                        type:'negative'
                    })
                })
            } else {
                Notify.create ({
                    message:'No pueden quedar datos vacios',
                    position: 'center',
                    type: 'negative'
                })
            }
        },
        JoinRegister () {
            const app = this
            var token = this.$store.state.login.login['token']
            var headers = {
                headers:{'Authorization':'Bare' + token}
            }
        }
    },
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