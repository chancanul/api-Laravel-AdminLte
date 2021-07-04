function init(){
    var route = document.querySelector("[name=route]").value; //Esta variable hace referencia a un input text definido
    //al final del layout principal con el objetivo de obtener la ruta completa de nuestro servidor, de esta manera
    //no estar declarando la dirección por cada inmplementación de vue js.
    var urlUsuarios = "/api/actUser"; // texto para enrutar a los usuarios
    var urlRoles = "/api/actRoles"; // Texto para enrutar a los roles
    var urlImages = "/storage/"; // Texto para enrutar las imágenes.
    new Vue({ //Inicio de vue
        //todas las peticiones http, deben proporcionar un token para poder comunicarse, en este caso se define al inicio
        //de esta manera todas llevan e token.
        http:{
            headers:{
                'X-CSRF-TOKEN':document.querySelector('#token').getAttribute('value')
            }
        },
        el:'#viewUsuarios', //definir el campo de acción del vue, dentro el html definir con #viewUsuarios.
        created:function(){ // El primer ciclo de vida de Vue inicia con created, las llamadas dentro de el
            //traen a la url de la imagen y los usuarios, pues al cargarse la vista solo se requiere enlistar
            //a todos los usuarios de la BD.
            this.getUrlImagen(); //Trae la url de las imagenes definidas dentro Vue, debe ocurrir primero para asignar la Url o el path de la imágenes.
            this.getUsuarios(0);
        },
        data:{ //Se definen todas las variables a utilizar dentro de Vue, las variables a enlazar con el HTML es v-model.
            //Arreglos
            arrUsuarios:[], // Almacene en forma de arreglos para los usuarios
            arrSingleUserById:[], // Almacen en forma de arreglos para los usuarios de acuerdo a un ID
            arrRoles:[], // Almacen en forma de arreglo para los roles
            //Controles HTML
            id_usuario:"",
            id_rol:"",
            nombre:"",
            apellido_p:"",
            apellido_m:"",
            usuario:"",
            password:"",
            imagen:"",
            //Acciones
            rutaImagenes:"", //para almacenar la ruta de las imágenes
            editar:false, //para indicar si el usuario realiza una acción para editar.
            loading:false, //Para indicar si una promesa esta en ejecución, esto fue un experimento para entender 
            //el funcionamiento de las rutas dentro el html se encuentran utilizadas con v-if, lo que se pretende alcanzar
            //es determinar si una promesa esta en petición que no pinte los controles.
            thumbnail:"" // pra almacenar la imagen dentro el modal, cuando el usuario elija una imagen.
        },
        methods:{ // Area para definir todos los métodos o funciones
            /**
             * función para traer el listado de usurios dentro la BD, recibe un parámetro para indicar el tipo de acción
             * si el id es distinto a cero entonces solo se consulta a un usuario de acuerdo al id proporcionado,
             *  si es cero se listan a todos los usuarios. De igual manera si es igual a cero entonces los usuarios
             * son almacenados dentro un Array y pintados en los controles  , si es distinto a cero devuelve un response.data generado por la promesa.
             * @param {*} id
             */
            getUsuarios:function(id){
                this.loading=true;
                if(id != 0) { //si es distinto a cero trae a todos los usuarios y los pinta en los controles enlazados
                    this.$http.get(route + urlUsuarios + "/" + id).then //Inincio de al petición (promesa)
                        (function(response){ //Si hay respuesta por parte del servidor
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
                      if(this.imagen != "") { //Esto es para pasar la url apuntando a la imagen, dentro el html se define el src dentro el control
                        //de la imagen, el llenado de la imagen occure dentro el compute retornando el thumbnail.
                          this.thumbnail = this.rutaImagenes + this.imagen; //concatenando la URI de la imagen (ruta)
                          this.image; //llamando a la función dentro el computed.
                      }
                      this.showModal(true); //Muestra el modal (true)
                        this.loading=false;
                    })
                } else { // Si se desea listar a todos los usuarios.
                    this.$http.get(route + urlUsuarios).then //inicio de la promesa
                    (function(response){ // en caso de que la promesa devuelva un valor
                        console.log(response);
                        this.arrUsuarios = response.data;
                        this.loading=false;
                    })
                }

            }, //fin getUsuarios
            /**
             * Método para guardar al usuario.
             */
            saveUser:function() {
                let formData = new FormData(); //Esto es porque se desea mandar una imagen por lo tanto es multiparte
                formData.append('id_rol', '1');
                formData.append('nombre', this.nombre);
                formData.append('apellido_p', this.apellido_p);
                formData.append('apellido_m', this.apellido_m);
                formData.append('usuario', this.usuario);
                formData.append('password', this.password);
                formData.append('imagen', this.imagen);
                this.$http.post(route + urlUsuarios, formData).then(function(response){
                    //en caso de éxito
                    alert('El usuario se agregó con éxito');
                })
            },
            /**
             * Método para modificar los datos del usuario
             */
            updateUser:function() {
                let formData = new FormData(); //por multiparte
                formData.append('id_rol', '1');
                formData.append('nombre', this.nombre);
                formData.append('apellido_p', this.apellido_p);
                formData.append('apellido_m', this.apellido_m);
                formData.append('usuario', this.usuario);
                formData.append('password', this.password);
                formData.append('_method', 'put');
                formData.append('imagen', this.imagen);
                this.$http.post(route + urlUsuarios + "/" + this.id_usuario, formData).then(function(response){ //inicio de la promesa
                    console.log(response); // en caso de +exito
                    alert('El usuario se modificó con éxito');
                })
            },
            /**
             * método para traer los roles
             */
            getRoles:function(){
                    this.$http.get(route + urlRoles).then(function(response){
                        console.log(response);
                        this.arrRoles = response.data;
                    })
            },
            /**
             * Método para traer la url de las imágenes
             */
            getUrlImagen:function(){
                this.rutaImagenes = route + urlImages
            },
            /**
             * Método para capturar un nuevo usuario, solo muestra el modal con datos vacíos.
             */
            newUser:function() {
                this.showModal(true);
            },
            /**
             * Método para esitar al usuario, ocurre cuando el usuario presiona el botón editar.
             * @param {*} id  como parámetro debe proporcionarse el ID del usuario a modificar.
             */
            editUser:function(id) {
                this.editar = true;
                //this.getRoles;
                this.getUsuarios(id);
            },
            /**
             * Método para mostrar el modal, tiene dos comportamientos para mostrar u ocultar
             * @param {*} bool  parámetro que define el comportamiento, true para mostrar, false para ocultar
             */
            showModal:function(bool){
                if (bool == true) {
                    $('#ventana_modal').modal('show');//Mostrar un venta modal
                } else {
				    $('#ventana_modal').modal('hide');
                }

			},
            /**
             * Método para cancelar, cierra la ventana modal y limpia los valores.
             */
			Cancelar:function(){ 
				//debugger;
				this.limpiarData();
				this.showModal(false);

			},
            /**
             * Método para limpiar todos los controlews y acciones lógicas definidas
             */
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
            /**
             * Método para obtener imagen seleccionada por el usuario, se ejecutada dentro el hatml
             * dentro el input type file que elige la imagen dentro la etiqueta esta definida la instrucción
             * @onchange para caprutar el evento.
             * @param {*} e  parámetro e resultante de la elección del usuario.
             */
            readImagen:function(e) {
                let file = e.target.files[0]; //Elegir la imagen seleccioda es cero por cer un array, el usaurio puede elegir varia imágenes
                this.imagen = file; // almacenar el resultado en la variable imagen para ser enviada dentro la petición
                this.loadImage(file); // llamar a un segundo método para mostrar la imagen dentro el control
            },
            /**
             * Método para cargar la imagen dentro el control
             * @param {*} file  proporcionar un prámetro file, es decir la imagen seleccionada
             */
            loadImage(file){
                let reader = new FileReader(); // una variable de tipo File Reader para leer el archivo
                reader.onload = (e) => { //al cargar el reader
                    this.thumbnail = e.target.result; // a la imagen previa se le asigna el resultado de la lectura del reader
                }
                reader.readAsDataURL(file); //le da formato de imagen al archivo segun la url dentro el file esto
                //hace que sea posible colocarla dentro el src del control img
            }

        }, // fin methods
        /**
         * El área conputed es para poder ejecutarse en tiempo d ejecución es decir al momento de estar interactuando 
         * con la vista
         */
        computed: { 
            /**
             * El método computed es ejecuatado dentro el src de la imagen, de esta manera si el usaurio ejecuta una
             * elecciónd de imagen se autorefleja al momento dentro el control, va de la mano con el evento onchange 
             * dentro el input file. cuando se trata de una edición el control hereda la ruta de la url de la imagen d
             * del usuario, cuando se trata de elegir una imagen se da lugar al evento onchange para autollenar la imagen
             * de acuerdo a la elección del usuario.
             */
            image() {
                return this.thumbnail;
            }
        }

    })
}
window.onload=init; // esto es para que el vue se ejecute al iniciar la vista
Vue.config.devtools = true;
