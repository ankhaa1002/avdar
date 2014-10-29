@extends('layouts.master')

@section('content')
	@if(Session::has('message'))
		<div class="alert alert-success" role="alert"><p>{{ Session::get('message') }}</p></div>
	@endif
	<div id="toolbar" style="margin-bottom: 15px;">
	    <a href="{{ url('admin/movie/create') }}" class="easyui-linkbutton"><i class="glyphicon glyphicon-plus" style="margin-right: 5px"></i>Шинэ</a>
	    <button onclick="editMovie()" class="easyui-linkbutton"><i class="glyphicon glyphicon-pencil" style="margin-right: 5px"></i>Засах</button>
	    <a href="#" class="easyui-linkbutton"><i class="glyphicon glyphicon-minus" style="margin-right: 5px"></i>Хасах</a>
	</div>
	<div class="table-responsive">
		<table id="movie-table">
		</table>
	</div>

@stop