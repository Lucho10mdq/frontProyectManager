<template>
    <div class="container-fluid">
        <q-toolbar class="bg-primary">
        <q-toolbar-title>
            Proyect Manager
        </q-toolbar-title>
        </q-toolbar>
        <div class="row login">
            <div class="col-md-4">
                <q-card >
                <q-card-title class="title boxTitle">
                   Register
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-input v-model="name" stack-label="Name"/>
                    <q-input v-model="email" type="email" placeholder="user@gmail.com" stack-label="Email"/>
                    <q-input v-model="pass" type="password" stack-label="Password" />
                    <q-input v-model="confirm_pass" type="password" stack-label="Confirm Password" />
                    <q-btn @click="Register" class="button" label="Save" />
                </q-card-main>
                </q-card>
            </div>   
        </div>     
    </div>    
</template>
<script>
import axios from 'axios'
export default {
    data ( ) {
        return {
            name: '',
            email: '',
            pass: '',
            confirm_pass: '',
            access: ''
        }
    },
    methods: {
        setAxiosHeaders (token) {
            var app = this
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            console.log(this.$store.state.login.login)
            app.$router.push('/main')
        },
        Register ({commit}) {
            const app = this
            if (( app.name != '') && (app.email) && (app.pass != '')) {
                if ( app.pass == app.confirm_pass){
                    const credentials = {
                        nick : app.name,
                        email : app.email,
                        password : app.password,
                        confirm_password : app.confirm_pass
                    }
                    const REGISTER_URL = process.env.API_URL + '/register/'
                    axios.post(REGISTER_URL,credentials).then(function (response){
                        app.$store.commit('login/updatelogin', {token: response.data.token, user: response.data.user})
                        app.setAxiosHeaders(response.data.token)
                    }).catch(function (error){
                        console.log(error)
                    })
                } else {
                    alert("No coinciden los password")
                }
            } else {
                alert ("Debe llenar todos los campos")
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