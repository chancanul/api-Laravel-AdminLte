 <!-- Content Header (Page header) -->
 <div id="viewUsuarios">
  <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Usuarios</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
                <button v-on:click="newUser()" class="btn btn-primary btn-xl float-right"><i class="fa fa-user-plus"></i></button>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content ---------------------------------------------------------------------------------------------------------------->
    <div class="content">
          <div class="container-fluid">
              <div class="row">
                      <div class="col-lg-12">
                          <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Listado de usuarios activos</h3>
                                    <div class="card-tools">
                                      <form method="POST" action="{{ url('usuario/buscar') }}">
                                        {{ csrf_field() }}
                                        <div class="input-group input-group-sm" style="width: 150px;">
                                          <input type="text" name="buscar" class="form-control float-right" placeholder="Buscar">
                                          <div class="input-group-append">
                                              <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div><!--card-header-->
                                  
                                  <div class="card-body table-responsive p-0">
                                    <table class="table table-hover text-nowrap">
                                      <thead>
                                        <th>Clave</th>
                                        <th>Clave rol</th>
                                        <th>Nombre</th>
                                        <th>Apellido Paterno</th>
                                        <th>Apellido Materno</th>
                                        <th>Rol</th>
                                        <th>Usuario</th>
                                        <th>Password</th>
                                        <th>Imagen</th>
                                        <th>Opciones</th>
                                      </thead>
                                      <tbody>
                                            <tr v-for="users in arrUsuarios">
                                              {{-- <td>{{ $loop -> iteration }}</td>
                                              <td>{{ $usuario -> nombre}}</td>
                                              <td>{{ $usuario -> apellido_p}}</td>
                                              <td>{{ $usuario -> apellido_m}}</td>
                                              <td>{{ $usuario -> rol}}</td>
                                              <td>{{ $usuario -> usuario}}</td>
                                              <td>{{ $usuario -> password}}</td> --}}
                                              <td>@{{ users.id_usuario }}</td>
                                              <td>@{{ users.id_rol }}</td>
                                              <td>@{{ users.nombre }}</td>
                                              <td>@{{ users.apellido_p }}</td>
                                              <td>@{{ users.apellido_m }}</td>
                                              <td>@{{ users.roles.nombre }}</td>
                                              <td>@{{ users.usuario }}</td>
                                              <td>@{{ users.password }}</td>
                                              <td>
                                                {{--<img class="img-thumbnail" src="{{ URL::asset('storage'.'/'.'app'.'/'.'public'.users.imagen)}}" alt="" width="50">--}}
                                                <img v-bind:src="`${rutaImagenes}/${users.imagen}`" class="img-thumbnail" alt="" width="50">
                                              </td>
                                              <td>
                                                     <button v-on:click="editUser(users.id_usuario)" class="btn btn-active"><i class="fa fa-user-edit"></i></button>
                                                     <button class="btn btn-active btn-xs float-right" type="submit" onclick="return confirm('Desea eliminar el usuario?');"><i class="fa fa-user-times"></i></button>
                                              </td>
                                            </tr>
                                      </tbody>
                                    </table>
                                  </div>
                          </div><!-- card -->
                  </div><!--col-lg-12-->    
              </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div> <!-- content -->
    @include('rol.admin.usuarios.modal')
</div> <!--Fin de Vue-->
<script src="{{URL::asset('dist/js/vue/admin/usuarios.js')}}"></script>