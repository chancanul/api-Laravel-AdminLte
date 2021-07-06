<div data-controls-modal="your_div_id" data-backdrop="static" data-keyboard="false"
    class="modal fade" tabindex="-1" role="dialog" id="ventana_modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title" v-if="!editar">Proporcionar datos del usuario (Alta)</h3>
                    <h3 class="card-title" v-if="editar">Proporcionar datos del usuario (Modificar)</h3>
                </div>
              
                    <div class="card-body">
                        <div class="row">
                            <div v-if="!loading" class="form-group col-md-6">
                                <label for="exampleUsuario">Clave Usuario</label>
                                <input disabled type="text" class="form-control" id="exampleUsuario" v-model="id_usuario">
                            </div>
                            <div v-if="!loading" class="form-group col-md-6">
                                <label for="examplenombre">Nombre</label>
                                <input type="text" class="form-control" id="examplenombre" v-model="nombre" placeholder="Nombre/s">
                            </div>
                        </div>
                        <div class="row">
                            <div v-if="!loading" class="form-group col-md-6">
                                <label for="exampleapellidop">Apellido Paterno</label>
                                <input type="text" class="form-control" id="exampleapellidop" v-model="apellido_p" placeholder="Apellido Paterno">
                            </div>
                            <div v-if="!loading" class="form-group col-md-6">
                                <label for="exampleapellidom">Apellido Materno</label>
                                <input type="text" class="form-control" id="exampleapellidom" v-model="apellido_m" placeholder="Apellido Materno">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="examplerol">Rol</label>
                                <select class="form-control" id="examplerol">
                                    <option value="admin">admin</option>
                                </select>
                            </div>
                            <div class="col-md-6 text-center">
                                {{--<img class="rounded-circle" v-if="!selectImage" v-bind:src="`${rutaImagenes}/${imagen}`" alt="foto" width="100" height="100">--}}
                                <img class="rounded-circle" :src="image" alt="foto" width="100" height="100">
                            </div>
                        </div>
                        <div class="row">
                            <div v-if="!loading" class="form-group col-md-6">
                                <label for="exampleusuario">Usuario</label>
                                <input type="text" class="form-control" id="exampleusuario" v-model="usuario" placeholder="Usuario">
                            </div>
                            <div v-if="!loading" class="form-group col-md-6">
                                <label for="examplepassword">Password</label>
                                <input type="password" class="form-control" id="exampleapassword" v-model="password" placeholder="Password">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label for="exampleInputFile">Subir Imagen</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" @change="readImagen" class="custom-file-input" id="imagen" name="imagen">
                                        <label class="custom-file-label" for="exampleInputFile">Examinar...</label>
                                    </div>
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="">Upload</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-danger active" data-dismiss="modal" v-on:click="Cancelar()">Cancelar</button>

                            <button type="submit" class="btn btn-primary active" v-on:click="saveUser()" v-if="!editar" >Guardar</button>

                            <button type="submit" class="btn btn-primary active" v-on:click="updateUser()" v-if="editar" >Actualizar</button>
                        </div>
                    </div>
               
            </div> {{--Fin de card-primary--}}
      </div>{{--fin modal-body--}}
    </div>
  </div>
</div>

