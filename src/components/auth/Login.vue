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
                   Login
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-input v-model="text" stack-label="Email"/>
                    <q-input v-model="text" stack-label="Password" />
                    <q-btn class="button" label="Sign In " />
                    <q-btn class="button" @click="$router.push('/register')" label="Register" />
                </q-card-main>
                </q-card>
            </div>   
        </div>     
    </div>    
</template>
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