function init(){
    var route = document.querySelector("[name=route]").value;
    var urlUsuarios = "/api/actUser";
    var urlRoles = "/api/actRoles";
    var urlImages = "/storage/";
    new Vue({
        http:{
            headers:{
                'X-CSRF-TOKEN':document.querySelector('#token').getAttribute('value')
            }
        },
        el:'#viewUsuarios',
        created:function(){
            this.getUrlImagen(); //Trae la url de las imagenes definidas dentro Vue, debe ocurrir primero para asignar la Url o el path de la imágenes.
            this.getUsuarios(0);
        },
        data:{
            arrUsuarios:[],
            arrRoles:[],
            id_usuario:"",
            id_rol:"",
            nombre:"",
            apellido_p:"",
            apellido_m:"",
            usuario:"",
            password:"",
            imagen:"",
            tipo:"",
            rutaImagenes:"",
            auxIdUsuario:"",
            editar:false,
            check:false,
        },
        methods:{
            getUsuarios:function(id){
                if(id != 0) {
                    this.http.get(route + urlUsuarios + "/" + id)(function(response){
                        console.log(response);
                        return response;
                    })
                } else {
                    this.$http.get(route + urlUsuarios).then
                    (function(response){
                        console.log(response);
                        this.arrUsuarios = response.data;
                    })
                }
               
            }, //fin getUsuarios
            getRoles:function(id){
                    this.$http.get(route + urlRoles).then(function(response){
                        console.log(response);
                        this.arrRoles = response.data;
                    })
            },

            getUrlImagen:function(){
                this.rutaImagenes = route + urlImages
            },
            newUser:function() {
                this.showModal(true);
            },
            editUser:function(id) {
                this.editar = true;
                this.getRoles;
                response = this.getUsuarios(id);
                this.showModal(true);
                this.id_usuario = response.data.id_usuario;
                this.id_rol = response.data.id_rol;
                this.nombre = response.data.nombre;
                this.apellido_p = response.data.apellido_p;
                this.apellido_m = response.data.apellido_m;
                this.usuario = response.data.usuario;
                this.password = response.data.password;
                this.imagen = response.data.imagen;

                

                
                    
                


            },
            showModal:function(bool){
                if (bool == true) {
                    $('#ventana_modal').modal('show');//Mostrar un venta modal
                } else {
                    this.Vacio();
				    $('#ventana_modal').modal('hide');
                }
				
			},

			Cancelar:function(){
				//debugger;
				this.Vacio();
				$('#ventana_modal').modal('hide');

			},
        } // fin methods
    
    })
}
window.onload=init;
Vue.config.devtools = true;