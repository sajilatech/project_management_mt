
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Admin:Login</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="{{asset('assets/bootstrap/css/bootstrap.min.css')}}">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{asset('assets/dist/font/font-awesome_4_5_0.min.css')}}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="{{asset('assets/dist/font/font-awesome_4_5_0.min.css')}}">
  <link href="{{asset('assets/css/style.css?v=1')}}" rel="stylesheet">
  <!-- iCheck -->
  <link rel="stylesheet" href="{{asset('assets/plugins/iCheck/square/blue.css')}}">
</head>
  <body class="hold-transition login-page" style="overflow:hidden;">
<div class="login-box">
  <div class="login-logo">
    <a href=""><img src="{{asset('assets/img/logo.png')}}" alt="Jawlati"> </a>
    <h2>Administration</h2>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>
    @if (session('success_msg'))
    <div style="color:green; font-size:20px;"> {{ session('success_msg') }}</div>
    @endif
    @if (session('error_msg'))
    <div style="color:red; font-size:20px;"> {{ session('error_msg') }}</div>
    @endif
    <form action="{{route('authenticate')}}" method="post">@csrf
   
      
      <input type="text" class="form-control" id="username" placeholder="Username" name="username">
                                    @error('username')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror  
      
      <input type="password" class="form-control" id="password" name="password">
                                    @error('password')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror 
                                    <div class="row">
        <div class="col-xs-8">
              
            </div><!-- /.col -->
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->























    
 

   <!-- jQuery 2.2.3 -->
<script src="asset('plugins/jQuery/jquery-2.2.3.min.js')}}"></script>
<!-- Bootstrap 3.3.6 -->
<script src="asset('assets/bootstrap/js/bootstrap.min.js')}}"></script>
<!-- form validator -->
<script src="asset('assets/dist/js/jquery.form-validator.min.js')}}"></script>
<script>
  $.validate({
    validateOnBlur : false, // disable validation when input looses focus
    //errorMessagePosition : 'top' ,// Instead of 'inline' which is default
    scrollToTopOnError : false // Set this property to true on longer forms
  });
</script>
</body>
</html>
