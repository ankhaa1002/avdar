@extends('layouts.master')

@section('content')
@if(Session::has('message'))
<div class="alert alert-success" role="alert">
    <p>{{ Session::get('message') }}</p>
</div>
@endif

<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Хайлт</h3>
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label for="movieName" class="col-sm-1 control-label">Нэр:</label>
                    <div class="col-sm-2">
                        <input name="movieName" id="movie_name" class="form-control" id="inputEmail3">
                    </div>
                    <button type="submit" onclick="filterMovie()" class="btn btn-default">Хайх</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="toolbar" style="margin-bottom: 15px;overflow: hidden;">
    <b><a href="{{ url('admin/movie/create') }}" class="easyui-linkbutton pull-left" style="margin-right: 5px"><i class="glyphicon glyphicon-plus" style="margin-right: 5px"></i>Шинэ</a></b>
    <button onclick="editMovie()" class="easyui-linkbutton pull-left" style="margin-right: 5px"><i class="glyphicon glyphicon-pencil" style="margin-right: 5px"></i><b>Засах</b></button>
    <!--<a href="#" class="easyui-linkbutton"><i class="glyphicon glyphicon-minus" style="margin-right: 5px"></i>Хасах</a>-->
    {{ Form::open(array('url' => 'movie/','id'=>'deleteMovieForm','class'=>'pull-left')) }}
    {{ Form::hidden('_method', 'DELETE') }}
    {{ Form::submit('Устгах', array('class' => 'easyui-linkbutton','onclick'=>'deleteMovie()','style'=>'padding: 4px; font-size: 12px;font-weight: bold;')) }}
    {{ Form::close() }}
</div>
<div class="table-responsive">
    <table id="movie-table">
    </table>
</div>

@stop