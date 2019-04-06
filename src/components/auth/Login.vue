<template>
    <div class="container-fluid">
        <Navbar></NavBar>
        <div class="row login">
            <div class="col-md-4">
                <q-card >
                <q-card-title class="title boxTitle">
                   Login
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-input v-model="email" stack-label="Email" placeholder="user@gmail.com"/>
                    <q-input v-model="password" type="password" stack-label="Password" />
                    <q-btn class="button" @click="Login" label="Sign In " />
                    <q-btn class="button" @click="$router.push('/register')" label="Register" />
                </q-card-main>
                </q-card>
            </div>   
        </div>     
    </div>    
</template>
<script>
import Navbar from './Navbar.vue'
import { Notify } from 'quasar'
import axios from 'axios'
export default {
    data () {
        return {
            email:'',
            password:''
        }
    },
    components: {
        Navbar
    },
    methods: {
        setAxiosHeaders (token) {
            var app = this
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            console.log(this.$store.state.login.login)
            app.$router.push('/main')
        },
        Login ({commit}) {
            const app = this
            if (( app.email != '') && (app.password != '')){
                const credentials = {
                    email: app.email,
                    password : app.password
                }
                const LOGIN_URL = process.env.API_URL + '/login'
                axios.post(LOGIN_URL,credentials).then(function (response){
                    if(response.status == 200) {
                        app.$store.commit('login/updatelogin', {token: response.data.token, user: response.data.user})
                        app.setAxiosHeaders(response.data.token)
                    } else {
                        Notify.create({
                            message: 'Password y/o Email incorrecto',
                            type: 'negative',
                            position: 'center'
                        })
                    } 
                }).catch (function (error){
                    Notify.create({
                        message: 'Ah ocurrido un error en el servidor',
                        type: 'negative',
                        position: 'center'
                    })
                })
            } else {
                Notify.create({
                    message: 'No pueden quedar datos vacios',
                    type: 'negative',
                    position: 'center'
                })
            } 
        }
    },
}
</script>
<style>
    .bg-primary {
         background: black !important;
    /*background: var(--q-color-primary) !important;*/
    }
    .login {
        margin-top: 6%;
        display: flex;
        align-items: center !important;
        justify-content: center !important;
    }
  .button {
    -webkit-appearance: button;
    color: white;
    background: red;
    margin-top: 3%;
    margin-left: 20%;
}
.title {
    color:white;
}
.boxTitle{
    background:black;
}
</style>