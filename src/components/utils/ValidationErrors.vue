<template>
    <div v-if="validationErrors">
        <div v-for="(value, key, index) in validationErrors"@{{ value }}>
        <q-alert color="primary"
        /> 
        </q-alert>
        </div>
    </div>
</template>
<script>
export default {
    data(){
            return {
                
            }
        },
    props: ['errors'],
    computed: {
        validationErrors(){
            let errors = Object.values(this.errors);
            errors = errors.flat();
            return errors;
        }
    }
}
</script>
