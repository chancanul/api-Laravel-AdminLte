 <!-- Content Header (Page header) -->
 <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0 text-dark">Agregar Usuario</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <a href="{{ url('usuario') }}">
              <button class="btn btn-primary btn-xl float-right"><i class="fa fa-arrow-left"></i></button>
          </a>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
       
             <!-- general form elements -->
             <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Proporcionar datos del usuario</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
              <form method="POST" action="{{ url('usuario')}}" role="form" id="formulario" enctype="multipart/form-data">
                 {{ csrf_field() }}
                  <div class="card-body">
                    <div class="form-group">
                      <label for="examplenombre">Nombre</label>
                      <input type="text" class="form-control" id="examplenombre" name="nombre" placeholder="Nombre/s">
                    </div>
                    <div class="form-group">
                      <label for="exampleapellidop">Apellido Paterno</label>
                      <input type="text" class="form-control" id="exampleapellidop" name="apellido_p" placeholder="Apellido">
                    </div>
                    <div class="form-group">
                        <label for="exampleapellidom">Apellido Materno</label>
                        <input type="text" class="form-control" id="exampleapellidom" name="apellido_m" placeholder="Apellido">
                    </div>
                    <div class="form-group">
                        <label for="examplerol">Rol</label>
                         <select class="form-control" name="rol" id="examplerol">
                           @foreach ($roles as $rol)
                            <option value="{{ $rol->id_rol}}">{{$rol->nombre}}</option>
                           @endforeach
                         </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleusuario">Usuario</label>
                        <input type="text" class="form-control" id="exampleusuario" name="usuario" placeholder="Usuario">
                    </div>
                    <div class="form-group">
                        <label for="examplepassword">Password</label>
                        <input type="password" class="form-control" id="exampleapassword" name="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputFile">Subir Imagen</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" id="imagen" name="imagen">
                          <label class="custom-file-label" for="exampleInputFile">Examinar...</label>
                        </div>
                        <div class="input-group-append">
                          <span class="input-group-text" id="">Subir</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.card-body -->
  
                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                  </div>
                </form>
              </div>
              <!-- /.card -->
  
             
        

          
        </div>
      
      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content -->