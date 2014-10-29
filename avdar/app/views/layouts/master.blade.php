<!DOCTYPE html>
<html lang="en">

<head>

    @include('includes.header')

</head>

<body>
   
    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="{{ url('admin') }}">Авдар</a>
            </div>
            <!-- Top Menu Items -->
            <ul class="nav navbar-right top-nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-envelope"></i> <b class="caret"></b></a>
                    <ul class="dropdown-menu message-dropdown">
                        <li class="message-preview">
                            <a href="#">
                                <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                    <div class="media-body">
                                        <h5 class="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="message-preview">
                            <a href="#">
                                <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                    <div class="media-body">
                                        <h5 class="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="message-preview">
                            <a href="#">
                                <div class="media">
                                    <span class="pull-left">
                                        <img class="media-object" src="http://placehold.it/50x50" alt="">
                                    </span>
                                    <div class="media-body">
                                        <h5 class="media-heading"><strong>John Smith</strong>
                                        </h5>
                                        <p class="small text-muted"><i class="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="message-footer">
                            <a href="#">Read All New Messages</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bell"></i> <b class="caret"></b></a>
                    <ul class="dropdown-menu alert-dropdown">
                        <li>
                            <a href="#">Alert Name <span class="label label-default">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-primary">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-success">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-info">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-warning">Alert Badge</span></a>
                        </li>
                        <li>
                            <a href="#">Alert Name <span class="label label-danger">Alert Badge</span></a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="#">View All</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> {{ $user->username }} <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            {{ HTML::linkRoute('logout','Log Out') }}
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                @include('includes.sidebar')
            </div>
            <!-- /.navbar-collapse -->
        </nav>

        <div id="page-wrapper">

            <div class="container-fluid">

                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            {{ $title }}
                        </h1>
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-dashboard"></i> Нүүр
                            </li>
                            @if(!Request::is('admin'))
                            <li class="active">
                                {{ $title }}
                            </li>
                            @endif
                        </ol>
                    </div>
                </div>
                <!-- /.row -->

                @yield('content')

            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery Version 1.11.0 -->
    {{ HTML::script('js/jquery-1.11.0.js') }}

    <!-- Bootstrap Core JavaScript -->
    {{ HTML::script('js/bootstrap.min.js') }}

    <!-- Morris Charts JavaScript -->
    <!-- {{ HTML::script('js/plugins/morris/raphael.min.js') }}
    {{ HTML::script('js/plugins/morris/morris.min.js') }}
    {{ HTML::script('js/plugins/morris/morris-data.js') }} -->
    {{ HTML::script('js/bootstrap-datepicker.js') }}

    {{ HTML::script('js/bootstrap-multiselect.js') }}

    {{ HTML::script('js/plugins/froala/js/froala_editor.min.js') }}

    {{ HTML::script('js/jquery.validate.min.js') }}

    {{ HTML::script('js/jquery.easyui.min.js') }}

    <script type="text/javascript">
         jQuery(document).ready(function () {
            
            $('#release-date').datepicker();

            $("#genres").multiselect();

            $('textarea').editable({inlineMode: false});

            $("#create-movie").validate({
                rules: {
                    moviename: 'required',
                    moviecontent: 'required',
                    moviecover: 'required'
                },
                messages: {
                    moviename: 'Киноны нэрээ оруулна уу!',
                    moviecontent: 'Киноны тайлбараа оруулна уу!',
                    moviecover: 'Киноны ковер зураг оруулна уу!'
                }
            });

            $("#moviecover").change(function() {
                var ext = $('#moviecover').val().split('.').pop().toLowerCase();
                if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
                    alert('Файлын төрөл буруу байна!');
                }
            });

            $('#movie-table').datagrid({
                url: 'movielist',
                pagination: true,
                pageSize: 20,
                rownumbers: true,
                fitColumns: true,
                singleSelect: true,
                sortName: 'name',
                sortOrder: 'asc',
                columns: [[
                        {field: 'name', title: 'Киноны нэр'},
                        {field: 'genres',title: 'Киноны ангилал', 
                        formatter: function (value, rowData, rowIndex) {
                            var genre_types = '';
                            var counter = 0;
                            var size = rowData.genres.length;
                            for(i = 0;i < size; i++){
                                if(counter == size - 1){
                                    genre_types += rowData.genres[i]['genre_name'];  
                                }
                                else{
                                    genre_types += rowData.genres[i]['genre_name'] + ', ';
                                }

                                counter++;
                            }
                            return  genre_types;
                        }},
                        {field: 'director', title: 'Найруулагч'},
                        {field: 'release_date', title: 'Гарсан огноо'},
                        {field: 'rating', title: 'IMDB'},
                        {field: 'language', title: 'Хэл'},
                        {field: 'created_at', title: 'Оруулсан огноо'},
                        {field: 'updated_at', title: 'Шинэчилсэн огноо'}
                ]]
            });

        });

        function editMovie(){
            $row = $('#movie-table').datagrid('getSelected');
            if($row != null){
                window.location.href = 'movie/'+$row['id']+'/edit';
            }
            else{
                alert('Сонгоно уу!')
            }
            
        }
    </script>

</body>

</html>
