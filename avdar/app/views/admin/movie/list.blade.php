@extends('layouts.master')

@section('content')
	@if(Session::has('message'))
		<div class="alert alert-success" role="alert"><p>{{ Session::get('message') }}</p></div>
	
	@endif
	Movies
@stop