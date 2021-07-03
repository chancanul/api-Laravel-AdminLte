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
            arrSingleUserById:[],
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
            loading:false,
            thumbnail:""
        },
        methods:{
            /**
             * función para traer el listado de usurios dentro la BD, recibe un parámetro para indicar el tipo de acción
             * si el id es distinto a cero entonces solo se consulta a un usuario de acuerdo al id proporcionado,
             *  si es cero se listan a todos los usuarios. De igual manera si es igual a cero entonces los usuarios
             * son almacenados dentro un Array, si es distinto a cero devuelve un response.data generado por la promesa.
             * @param {*} id
             */
            getUsuarios:function(id){
                this.loading=true;
                if(id != 0) { //si es distinto a cero trae a todos los usuarios
                    this.$http.get(route + urlUsuarios + "/" + id).then
                        (function(response){
                        console.log(response);
                        this.arrSingleUserById = response.data;
                        for (usuario in this.arrSingleUserById) {
                            this.id_usuario = this.arrSingleUserById[usuario].id_usuario;
                            this.id_rol = this.arrSingleUserById[usuario].id_rol;
                            this.nombre = this.arrSingleUserById[usuario].nombre;
                            this.apellido_p = this.arrSingleUserById[usuario].apellido_p;
                            this.apellido_m = this.arrSingleUserById[usuario].apellido_m;
                            this.usuario = this.arrSingleUserById[usuario].usuario;
                            this.password = this.arrSingleUserById[usuario].password;
                            this.imagen = this.arrSingleUserById[usuario].imagen;
                      }
                      if(this.imagen != "") {
                          this.thumbnail = this.rutaImagenes + this.imagen;
                          this.image;
                      }
                      this.showModal(true);
                        this.loading=false;
                    })
                } else {
                    this.$http.get(route + urlUsuarios).then
                    (function(response){
                        console.log(response);
                        this.arrUsuarios = response.data;
                        this.loading=false;
                    })
                }

            }, //fin getUsuarios
            saveUser:function() {
                let formData = new FormData();
                formData.append('id_rol', '1');
                formData.append('nombre', this.nombre);
                formData.append('apellido_p', this.apellido_p);
                formData.append('apellido_m', this.apellido_m);
                formData.append('usuario', this.usuario);
                formData.append('password', this.password);
                formData.append('imagen', this.imagen);
                this.$http.post(route + urlUsuarios, formData).then(function(response){
                    alert('El usuario se agregó con éxito');
                })
            },
            updateUser:function() {
                let formData = new FormData();
                formData.append('id_rol', '1');
                formData.append('nombre', this.nombre);
                formData.append('apellido_p', this.apellido_p);
                formData.append('apellido_m', this.apellido_m);
                formData.append('usuario', this.usuario);
                formData.append('password', this.password);
                formData.append('_method', 'put');
                formData.append('imagen', this.imagen);
                this.$http.post(route + urlUsuarios + "/" + this.id_usuario, formData).then(function(response){
                    console.log(response);
                    alert('El usuario se modificó con éxito');
                })
            },
            getRoles:function(){
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
                //this.getRoles;
                this.getUsuarios(id);
            },
            showModal:function(bool){
                if (bool == true) {
                    $('#ventana_modal').modal('show');//Mostrar un venta modal
                } else {
				    $('#ventana_modal').modal('hide');
                }

			},

			Cancelar:function(){
				//debugger;
				this.limpiarData();
				this.showModal(false);

			},
            limpiarData:function() {
                this.id_usuario = "";
                this.id_rol = "";
                this.nombre = "";
                this.apellido_p = "";
                this.apellido_m = "";
                this.usuario = "";
                this.password = "";
                this.imagen = "";
                this.editar = false;
            },
            readImagen:function(e) {
                let file = e.target.files[0];
                this.imagen = file;
                this.loadImage(file);
            },
            loadImage(file){
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.thumbnail = e.target.result;
                }
                reader.readAsDataURL(file);
            }

        }, // fin methods

        computed: {
            image() {
                return this.thumbnail;
            }
        }

    })
}
window.onload=init;
Vue.config.devtools = true;
