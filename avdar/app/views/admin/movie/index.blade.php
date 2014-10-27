@extends('layouts.master')

@section('content')
	@if(Session::has('message'))
		<div class="alert alert-success" role="alert"><p>{{ Session::get('message') }}</p></div>
	@endif
	Movies
	<div class="table-responsive">
		<table id="movie-table" class="table table-bordered">
		    <thead>
		            <th>Киноны нэр</th>
		    </thead>
		</table>
	</div>
@stop