<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Acceso Usuarios | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{URL::asset('plugins/fontawesome-free/css/all.min.css')}}">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{URL::asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{URL::asset('dist/css/adminlte.min.css')}}">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
    <!-- Vue Js-->
    <meta name="token" id="token" value="{{ csrf_token() }}">
    <script src="{{URL::asset('dist/js/vue/vue.js')}}"></script>
    <script src="{{URL::asset('dist/js/vue/vue-resource.js')}}"></script>
  </head>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="../../index2.html"><b>Soluciones</b> Chac Mool</a>
      </div>
      <!-- /.login-logo -->
      <div id="login" class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Proporcione sus datos para Iniciar Sesión</p>

          <form method="post" action="{{url('login')}}">
            {{ csrf_field() }}
            <div class="input-group mb-3">
              <input v-model="usuario" type="text" class="form-control" placeholder="Usuario" name="usuario">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input v-model="password" type="password" class="form-control" placeholder="Password" name="password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember">
                  <label for="remember">
                    Recordar
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">Entrar</button>
              </div>
              <!-- /.col -->
            </div>
          </form>

          <div class="social-auth-links text-center mb-3">
            <p>- O -</p>
            <a href="#" class="btn btn-block btn-primary">
              <i class="fab fa-facebook mr-2"></i> Inciar sesión con Facebook
            </a>
            <a href="#" class="btn btn-block btn-danger">
              <i class="fab fa-google-plus mr-2"></i> Inciar sesión con Google+
            </a>
          </div>
          <!-- /.social-auth-links -->

          <p class="mb-1">
            <a href="forgot-password.html">Olvide mi password</a>
          </p>
          <p class="mb-0">
            <a href="register.html" class="text-center">Registro de nuevo usuario</a>
          </p>
        </div>
        <!-- /.login-card-body -->
      </div> <!-- Fin de VUE-->
      <script src="{{asset('dist/js/vue/admin/login.js')}}"></script>
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="{{URL::asset('plugins/jquery/jquery.min.js')}}"></script>
    <!-- Bootstrap 4 -->
    <script src="{{URL::asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <!-- AdminLTE App -->
    <script src="{{ ('dist/js/adminlte.min.js') }}"></script>
    <input type="hidden" name="route" value="{{url('/')}}">
  </body>
</html>
