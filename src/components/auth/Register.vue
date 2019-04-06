<template>
    <div class="container-fluid">
        <Navbar></NavBar>
        <div class="row login">
            <div class="col-md-4">
                <q-card >
                <q-card-title class="title boxTitle">
                   Register
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-input v-model="nick"  stack-label="Name"/>
                    <q-input v-model="email" type="email" @blur="$v.form.email.$touch" :error="$v.form.email.$error" placeholder="user@gmail.com" stack-label="Email"/>
                    <q-input v-model="password"  type="password" stack-label="Password" />
                    <q-input v-model="confirm_password"  type="password" stack-label="Confirm Password" />
                    <q-btn @click="Register" class="button" label="Save" />
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
import { required, email } from 'vuelidate/lib/validators'
export default {
    data ( ) {
        return {
            nick: '',
            email: '',
            password: '',
            confirm_password: '',
            access: ''
        }
    },
    components: {
        Navbar
    },
    validations: {
    form: {
      email: { required, email }
        },
      nick: {required, email}  
    },
    methods: {
        setAxiosHeaders (token) {
            var app = this
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            console.log(this.$store.state.login.login)
            app.$router.push('/main')
        },
        Register ({commit}) {
           /* this.$v.form.$touch()
            if (this.$v.form.$error) {
                this.$q.notify('Por favor revise los campos de nuevo')
                return
            }*/
            const app = this
            if (( app.nick != '') && (app.email) && (app.password != '')) {
                if ( app.password == app.confirm_password){
                    const credentials = {
                        nick : app.nick,
                        email : app.email,
                        password : app.password,
                        confirm_password : app.confirm_password
                    }
                    const REGISTER_URL = process.env.API_URL + '/register'
                    axios.post(REGISTER_URL,credentials).then(function (response){
                        console.log('llegue')
                        app.$store.commit('login/updatelogin', {token: response.data.token, user: response.data.user})
                        app.setAxiosHeaders(response.data.token)
                        Notify.create({
                            message: 'Se agrego mozo correctamente',
                            type: 'positive',
                            position: 'center'
                        })
                    }).catch(function (error){
                        Notify.create({
                            message:'Servidor no encontrado o Passwor y/o Contrasena incorrectas',
                            type:'negative',
                            position: 'center'
                        })
                    })
                } else {
                    Notify.create({
                        message:'No coinciden los Password',
                        type:'negative',
                        position:'center'
                    })
                }
            } else {
                Notify.create({
                    message: 'No deben quedar campos vacios',
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
    margin-left: 70%;
    }
    .title {
        color:white;
    }
    .boxTitle{
        background:black;
    }
</style>