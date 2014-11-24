<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>{{ $title }}</title>

<!-- Bootstrap Core CSS -->
{{ HTML::style('css/bootstrap.min.css') }}

<!-- Custom CSS -->
{{ HTML::style('css/sb-admin.css') }}

<!-- Morris Charts CSS -->
{{ HTML::style('css/plugins/morris.css') }}

<!-- Custom Fonts -->
{{ HTML::style('font-awesome-4.1.0/css/font-awesome.min.css') }}

{{ HTML::style('css/datepicker3.css') }}

{{ HTML::style('css/bootstrap-multiselect.css') }}

{{ HTML::style('css/font-awesome.min.css') }}

{{ HTML::style('css/froala_editor.min.css') }}

{{ HTML::style('css/froala_style.min.css') }}

{{ HTML::style('css/froala_content.min.css') }}

{{ HTML::style('css/cmxform.css') }}

{{ HTML::style('css/plugins/easyui/metro/datagrid.css') }}

{{ HTML::style('css/plugins/easyui/metro/easyui.css') }}

<link rel="shortcut icon" href="{{ Config::get('app.url') }}/img/favicon.ico"/>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->