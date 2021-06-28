
function init() 
{
  //Este variable tiene como propósito guardar la ruta url para que sea dinámica, para ello en la estructura HTML
  //Existe un input oculto al usuario con el nombre route
  var route = document.querySelector("[name=route]").value;
  //Definimos la ruta de la api
  var urlWorcket = route + '/api/apiWorcket';
  //Realizamos una nueva instancia de Vue que ya esta definida dentro la cabecera dejemplo: <script src="public/js/vue-min.js"></script>
  new Vue({
      http:{
        headers:{
          'X-CSRF-TOKEN':document.querySelector('#token').getAttribute('value') //Esta instrucción es para poder definir el token de seguridad.
        }
      },
      el:"#peticion", //Nombre de la instancia definida dentro el html con la etiqueta "id".
      created:function(){ //Primer siclo de vida de Vue js, se ejecuta al llamar una nueva istancia.
 
      },
      data: { //Area de definición de datos.
          wUrl:null,
          sFullname:null,
          sCorreo:null,
          res:[],
          conEmail:null,
          expression: /\w+@\w+\.+[a-z]/,
          errores:[],
          sMensaje:null
      }, //fin de data.
      methods: { 
          //Area para definir los métodos.
          //  Abreviando los mensajes
          //Validar que el usuario proporcionó Nombre de usuario y correo.
          validarDatos:function(){
            this.errores.length=0;
            console.log(this.errores.length);
                if (!this.sCorreo) {
                  this.errores.push('Email requerido');
                }  else {
                  if (!this.expression.test(this.sCorreo)) this.errores.push('El formato del correo es incorrecto');
                }
                if (!this.sFullname) this.errores.push('Nombre completo requerido');
                console.log(this.errores.length);
          }, //fin de validar datos
          
          wRequest:function(){ //Esta función tiene como propósito comunicarse con la API definida dentro otra Api en laravel
              var urlRes='';
             
              var credenciales={ //este arreglo almacena los parámetros solicitados por la API.
                  fullname:this.sFullname,
                  correo:this.sCorreo,
                  enviar:this.conEmail
              };
             //if para validar datos.
             this.validarDatos();
          
              if (this.errores.length == 0) {  
                //Empieza la definición para la experiencia del usuario.
                //SE definen los mensajes gráficos.
                let timerInterval
                Swal.fire({ //Swal son mensajes enriquecidos.
                  title: 'Punto de enlace UTC-Worcket, espera máxima de respuesta 30 segundos',
                  html: 'Espere solicitando datos de Worcket, tiempo de espera: <b></b> segundos',
                  // showConfirmButton: false,
                  allowOutsideClick: false, //es un modal, con esta propiedad definimos que no puede salirse al dar click fuera.
                  //los forsamos a esperar la petición.
                  allowEscapeKey: false,
                  timer: 30000, //Definir 30 segundos de espera.
                  timerProgressBar: true, //Mostrar el progress bar.
                  onBeforeOpen: () => { //Ciclo de vida del Swal.
                    Swal.showLoading(); //mostrar el modal de progreso.
                    timerInterval = setInterval(() => {
                      const content = Swal.getContent()
                      if (content) { //Instrucción para mostrar el progreso del tiempo al usuario.
                        const b = content.querySelector('b')
                        if (b) {
                          b.textContent = Swal.getTimerLeft()/1000
                        }
                      }
                    }, 1000)
                  },
                  onClose: () => { //Ciclo de vida de swal al cerrarse.
                    clearInterval(timerInterval)
                  },
                }).then((result) => { //Ciclo de vida al recibir el resultado.
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) { //Si termino el intervalo de tiempo y no recibio respuesta alguna entonces ocurrio un error.
                    Swal.fire(
                      'Ha ocurrido un error!',
                      'Se esta tardando demasioado en responder Worcket, por favor Intenta mas tarde!',
                      'error'
                    )
                  } 
                }),

              
              this.$http.post(urlWorcket, credenciales).then //petición o llamada a la API a otra API.
              (function(response) {
                urlRes = response.bodyText; //Almacenamos el cuerpo de la respeusta para poder realizar una comparación.
            
              if (urlRes=="Error 400") { //Error 400
                Swal.close();
                Swal.fire(
                  'Ha ocurrido un error!',
                  'No se ha podido generar el enlace, por favor verifique sus datos!',
                  'error'
                )
                console.log(response);
              } else {
                this.wUrl=urlRes;
                Swal.close();
                Swal.fire(
                  'Enlace creado!',
                  'Ya eres parte de la comunidad Worcket!',
                  'success'
                );
                if(this.conEmail) { //Verifica si el usuario seleccionó la opción de mandar el mensaje.
                  $(document).Toasts('create', { //mensaje Toast enriquecido
                    body: 'Se envia a: ' + this.sCorreo,
                    title: 'Solicitud Correo',
                    subtitle: 'Confirmación de correo',
                    icon: 'fas fa-envelope fa-lg',
                  });
                };
              }
              
              
              }).catch(function(response){
              
                
              
              });
            } else {//fin de if para validad datos.
             
              this.sMensaje = '';
        
                for(var error in this.errores) {
                  this.sMensaje = this.sMensaje + this.errores[error] + "<br>"
                };
            
              Swal.fire( //Swal son mensajes enriquecidos.
                'Acción invalida!',
                this.sMensaje,
                'error' 
              );
          
            
            
            
            }
          },
          wRedirect:function(){//Función encargada de mandar a la URL resultante.
          
            
        

            
              // const Toast = Swal.mixin({
              //   toast: true,
              //   position: 'top-end',
              //   showConfirmButton: false,
              //   timer: 3000});

              
                      
              // Swal.fire(
              //   'Good job!',
              //   'You clicked the button!',
              //   'success'
              // )
              // alert(this.wUrl);
              // Toast.fire({
              //   icon: 'fas fa-envelope fa-lg',
              //   title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
              // });
              // toastr.success('listo');
              if (this.wUrl) {
                url = this.wUrl;
                window.location=url; //Redirigir a la URL
              } 
          } //Fin de wRedirect
      },// fin de method
      computed: {//Ciclo de vida, realiza una acción de manera automática.
      } //fin de computed.
  }); //fin de Vue
} //fin de Init.
window.onload=init;
Vue.config.devtools = true;
