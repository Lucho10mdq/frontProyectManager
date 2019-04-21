<template>
    <div class="container-fluid">
        <Navbar></NavBar>
        <div class="contenido">
            <validation-errors :errors="validationErrors" v-if="validationErrors"></validation-errors>
            <div class="row login">
                <div class="card1 col-md-4 ">
                    <q-card >
                    <q-card-title class="title boxTitle">
                    Join Team
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
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
import ValidationErrors from '../utils/ValidationErrors.vue'
export default {
    data () {
        return {
            name:'',
            team:'',
            validationErrors:'',
            teams : []
        }
    },
    components: {
        Navbar,
        ValidationErrors
    },
    methods: {
        MaysPrimera(){
            const app = this
            return  app.name= app.name.charAt(0).toUpperCase() + app.name.slice(1);;
        },
        MaysPrimera2(){
            const app = this
            return  app. team= app. team.charAt(0).toUpperCase() + app. team.slice(1);;
        },
        TeamRegister () {
            const app = this
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
                    if (response.status == 200){
                        Notify.create({
                            message:'Se creo team con exito',
                            position:'center',
                            type:'positive'
                        })
                        app.$router.push('/main')
                    }
                }).catch(function (error){
                    if (error.response )
                    {
                        if(error.response.status == 422){
                            app.validationErrors = error.response.data.error;
                        } else if(error.response.status == 401){
                            Notify.create({
                                message:'A caducado la sesion',
                                position:'center',
                                type:'negative'
                            })
                        }
                    } else {
                        Notify.create({
                                message:'Error en el servidor',
                                position:'center',
                                type:'negative'
                        })
                    }
                })
            }
        },
        JoinRegister () {
           const app = this
           const id = ''
            var token = this.$store.state.login.login['token']
            var headers = {
                headers: {'Authorization': 'Bearer ' + token}
            }
            if(app.team != ''){
                app.team = app.MaysPrimera2(app.team.toLowerCase());
                const JOIN_URL = process.env.API_URL + '/team/'
                axios.get(JOIN_URL + app.team, headers).then(function (response){
                    app.teams = response.data.team
                }).catch(function (error){
                     if (error.response )
                    {
                        if(error.response.status == 422){
                            app.validationErrors = error.response.data.error;
                        } else if(error.response.status == 401){
                            Notify.create({
                                message:'A caducado la sesion',
                                position:'center',
                                type:'negative'
                            })
                        }
                    } else {
                        Notify.create({
                                message:'Error en el servidor',
                                position:'center',
                                type:'negative'
                        })
                    }
                })
                if (app.teams == 0) {
                    Notify.create({
                        message:'No deben quedar campos vacios',
                        position:'center',
                        type:'negative'
                    })
                }
               //console.log(app.teams[0].id)
               /* app.teams.forEach(element => {
                 id = element.id
                })
               */
               const id = app.teams[0].id 
               console.log(id)
                const REGISTER_TEAM = process.env.API_URL + '/team/join/'
                axios.get(REGISTER_TEAM + id,headers).then(function (response){
                    if (response.status == 200){
                        Notify.create({
                            message:'Se unio al  team con exito',
                            position:'center',
                            type:'positive'
                        })
                        app.$router.push('/main')
                    }
                }).catch(function (error){
                    if (error.response )
                    {
                        if(error.response.status == 422){
                            app.validationErrors = error.response.data.error;
                        } else if(error.response.status == 401){
                            Notify.create({
                                message:'A caducado la sesion',
                                position:'center',
                                type:'negative'
                            })
                        }
                    } else {
                        Notify.create({
                                message:'Error en el servidor',
                                position:'center',
                                type:'negative'
                        })
                    }
                })
            } else {
                Notify.create({
                    message:'No deben quedar campos vacios',
                    position:'center',
                    type:'negative'
                })
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