function init() {
    var route = document.querySelector("[name=route]").value;
    var urlLogin = "/api/actUser";

    new Vue({
        http:{
            headers:{
                'X-CSRF-TOKEN':document.querySelector('#token').getAttribute('value')
            }
        },

        el:'#login',
        data:{
            usuario:"",
            password:""
        },
        methods: {
            logRequest:function(){
                var urlRes='';
                var credenciales={
                    usuario:this.usuario,
                    password:this.password
                };
                console.log(route);
                this.http.post(route + urlLogin, credenciales).then
                (function(response){
                    urlRes = respose.bodyText;
                    if(urlRes == "ok") {
                        
                    }
                    console.log(urlRes);
                }).catch(function(response){})
            } //Fin logRequest
        } //Fin de methods
    })//Fin de Vue

} //fin function Init
//window.onload=init;
//Vue.config.devtools = true;