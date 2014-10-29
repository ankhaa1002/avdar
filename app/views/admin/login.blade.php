<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Нэвтрэх</title>

    <!-- Bootstrap Core CSS -->
    {{ HTML::style('css/bootstrap.min.css') }}
    {{ HTML::style('css/login.css') }}
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-md-offset-4">
                <h1 class="text-center login-title">Удирдлага руу нэвтрэх</h1>
                @if(Session::has('message'))
                <div class="alert alert-danger" role="alert"><p>{{ Session::get('message') }}</p></div>
                @endif
                @if(Session::has('logout_msg'))
                <div class="alert alert-success" role="alert"><p>{{ Session::get('logout_msg') }}</p></div>
                @endif
                @if($errors->has())
                <div class="alert alert-danger" role="alert">
                    <li>{{ $errors->first('username') }}</li>
                    <li>{{ $errors->first('password') }}</li>
                </div>
                @endif
                <div class="account-wall">
                    <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                        alt="">
                    {{ Form::open(array('url' => 'admin/login','class'=>'form-signin')) }}
                        {{ Form::text('username', Input::old('username'), array('placeholder'=>'Хэрэглэгчийн нэр','class'=>'form-control')) }}
                        {{ Form::password('password', array('placeholder'=>'Нууц үг:','class'=>'form-control')) }}
                        {{ Form::submit('Нэвтрэх',array('class'=>'btn btn-lg btn-primary btn-block')) }}
                    {{ Form::close() }}
                </div>
            </div>
        </div>
    </div>
</body>
</html>