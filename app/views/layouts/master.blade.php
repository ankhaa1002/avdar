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
                        <span class="sr-only">Цэс</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="{{ url('admin') }}">Авдар</a>
                </div>
                <!-- Top Menu Items -->
                <ul class="nav navbar-right top-nav">
                    <li><a target="_blank" href="{{ Config::get('app.url') }}">Сайт руу орох</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> {{ $user->username }} <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                {{ HTML::linkRoute('logout','Гарах') }}
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

        {{ HTML::script('js/plugins/easy-ui/locale/easyui-lang-mn.js') }}

        <script type="text/javascript">
            $(function () {

                $("#deleteMovieForm").submit(function (e) {
                    var row = $('#movie-table').datagrid('getSelected');
                    if (row == null) {
                        e.preventDefault();
                    } else {
                        $('#deleteMovieForm').attr('action', 'movie/' + row.id).submit();
                    }
                });
                
                $('#deleteGenreForm').submit(function(e){
                    var row = $('#genre-table').datagrid('getSelected');
                    if (row == null) {
                        e.preventDefault();
                    } else {
                        $('#deleteGenreForm').attr('action', 'genre/' + row.id).submit();
                    }
                });

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

                $("#moviecover").change(function () {
                    var ext = $('#moviecover').val().split('.').pop().toLowerCase();
                    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                        alert('Файлын төрөл буруу байна!');
                    }
                });

                $('#genre-table').datagrid({
                    url: 'genrelist',
                    pagination: true,
                    pageSize: 20,
                    rownumbers: true,
                    fitColumns: true,
                    singleSelect: true,
                    sortName: 'name',
                    sortOrder: 'asc',
                    columns: [[
                            {field: 'genre_name', title: 'Жанрын төрөл', width: 20},
                        ]]
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
                            {field: 'featured_image', title: 'Зураг', width: 20,
                                formatter: function (value, rowData, rowIndex) {
                                    return '<center><img src="{{ Config::get('app.url') }}/' + rowData.featured_image + '" width="80" height="100"/></center>';
                                }
                            },
                            {field: 'name', title: 'Киноны нэр', width: 20},
                            {field: 'genres', title: 'Киноны ангилал',
                                formatter: function (value, rowData, rowIndex) {
                                    var genre_types = '';
                                    var counter = 0;
                                    var size = rowData.genres.length;
                                    for (i = 0; i < size; i++) {
                                        if (counter == size - 1) {
                                            genre_types += rowData.genres[i]['genre_name'];
                                        }
                                        else {
                                            genre_types += rowData.genres[i]['genre_name'] + ', ';
                                        }

                                        counter++;
                                    }
                                    return  genre_types;
                                }, width: 20},
                            {field: 'director', title: 'Найруулагч', width: 20},
                            {field: 'release_date', title: 'Гарсан огноо', width: 20},
                            {field: 'rating', title: 'IMDB', width: 20},
                            {field: 'language', title: 'Хэл', width: 20},
                            {field: 'created_at', title: 'Оруулсан огноо', width: 20},
                            {field: 'updated_at', title: 'Шинэчилсэн огноо', width: 20}
                        ]]
                });

            });



            function editMovie() {
                $row = $('#movie-table').datagrid('getSelected');
                if ($row != null) {
                    window.location.href = 'movie/' + $row.id + '/edit';
                }
                else {
                    alert('Сонгоно уу!')
                }

            }

            function editGenre() {
                $row = $('#genre-table').datagrid('getSelected');
                if ($row != null) {
                    window.location.href = 'genre/' + $row.id + '/edit';
                }
                else {
                    alert('Сонгоно уу!')
                }
            }


            function filterMovie() {
                $('#movie-table').datagrid('load', {
                    movie_name: $('#movie_name').val()
                });
            }

            function filterGenre() {
                $('#genre-table').datagrid('load', {
                    genre_name: $('#genre_name').val()
                });
            }



        </script>

    </body>

</html>
