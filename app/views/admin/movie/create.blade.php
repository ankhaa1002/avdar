@extends('layouts.master')

@section('content')

{{ Form::open(array('url'=>'admin/movie/create','files' => true,'id'=>'create-movie')) }}
 <div class="panel panel-default">
	<div class="panel-heading">
	    <h3 class="panel-title">Кино нэмэх</h3>
	</div>
	<div class="panel-body" style="padding: 20px;">
		<div class="col-lg-12">
			<div class="col-lg-6">
			
				<div class="form-group">
				{{ Form::label('Киноны нэр:') }}
				{{ Form::text('moviename', Input::old('username'), array('class'=>'form-control')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Киноны cover:') }}
				{{ Form::file('moviecover', array('id'=>'moviecover','class'=>'form-control')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Киноны ангилал:') }}
				<br>
				<?php $count = 1; ?>
				@foreach($genres as $genre)
				{{ Form::checkbox('genres[]', $count) }} {{ $genre }}
				<?php $count++ ?>
				@endforeach
				</div>
				<div class="form-group">
				{{ Form::label('Киноны үнэлгээ:') }}
				{{ Form::text('movierating','', array('class'=>'form-control','style'=>'width: 150px;')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Дүрүүдэд:') }}
				{{ Form::text('moviecast','', array('class'=>'form-control')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Гарсан огноо:') }}
				{{ Form::text('moviedate','', array('class'=>'form-control','id'=>'release-date')) }}
				</div>
			</div>
			<div class="col-lg-6">
				<div class="form-group">
				{{ Form::label('Найруулагч:') }}
				{{ Form::text('moviedirector','', array('class'=>'form-control')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Киноны хугацаа:') }}
				{{ Form::text('movielength','', array('class'=>'form-control','style'=>'width: 150px;')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Киноны хэл:') }}
				{{ Form::text('movielanguage','', array('class'=>'form-control','style'=>'width: 150px;')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Trailer link:') }}
				{{ Form::text('movietrailer','', array('class'=>'form-control')) }}
				</div>
				<div class="form-group">
				{{ Form::label('Удахгүй тавигдах кино эсэх:') }}
				{{ Form::checkbox('movieisupcoming','0','false')}}
				</div>
				<div class="form-group">
				{{ Form::label('IMDB link:') }}
				{{ Form::text('movieimdblink','', array('class'=>'form-control')) }}
				</div>
			</div>
		</div>
		<div class="col-lg-6">
			<div class="form-group">
			{{ Form::label('Кино контент:') }}
			{{ Form::textarea('moviecontent','', array('class'=>'form-control')) }}
			</div>
		</div>
		<div class="col-lg-6">
			<div class="form-group">
			{{ Form::label('Киноны тухай товч:') }}
			{{ Form::textarea('moviesynopsis','', array('class'=>'form-control')) }}
			</div>
		</div>
	</div>
</div>
{{ HTML::link('admin/movie/','Болих',array('class'=>'btn btn-default pull-right')) }}
{{ Form::submit('Хадгалах', array('class'=>'btn btn-primary pull-right','style'=>'margin-right: 5px')) }}

{{ Form::close() }}
	
@stop

