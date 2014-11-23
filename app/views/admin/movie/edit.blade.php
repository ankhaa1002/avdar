@extends('layouts.master')

@section('content')
	{{ Form::model($movie,array('method'=>'PATCH','route'=>array('admin.movie.update',$movie->id),'files' => true,'id'=>'create-movie')) }}
	 <div class="panel panel-default">
		<div class="panel-heading">
		    <h3 class="panel-title">Кино нэмэх</h3>
		</div>
		<div class="panel-body" style="padding: 20px;">
			<div class="col-lg-12">
				<div class="col-lg-6">
					<div class="form-group">
					{{ Form::label('Киноны нэр:') }}
					{{ Form::text('name', null, array('class'=>'form-control')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Киноны cover:') }}
					{{ Form::file('featured_image', array('id'=>'featured_image','class'=>'form-control')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Киноны ангилал:') }}
					<br>

					
					@foreach($genres as $genre)
					<input type="checkbox" name="genres[]" value="{{ $genre->id }}" @if(in_array($genre->id,$movieGenres)) checked="checked" @endif ) /> {{ $genre->genre_name }}
					
					@endforeach
					</div>
					<div class="form-group">
					{{ Form::label('Киноны үнэлгээ:') }}
					{{ Form::text('rating',null, array('class'=>'form-control','style'=>'width: 150px;')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Дүрүүдэд:') }}
					{{ Form::text('cast',null, array('class'=>'form-control')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Гарсан огноо:') }}
					{{ Form::text('release_date',null, array('class'=>'form-control','id'=>'release-date')) }}
					</div>
				</div>
				<div class="col-lg-6">
					<div class="form-group">
					{{ Form::label('Найруулагч:') }}
					{{ Form::text('director',null, array('class'=>'form-control')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Киноны хугацаа:') }}
					{{ Form::text('length',null, array('class'=>'form-control','style'=>'width: 150px;')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Киноны хэл:') }}
					{{ Form::text('language',null, array('class'=>'form-control','style'=>'width: 150px;')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Trailer link:') }}
					{{ Form::text('movie_trailer',null, array('class'=>'form-control')) }}
					</div>
					<div class="form-group">
					{{ Form::label('Удахгүй тавигдах кино эсэх:') }}
					{{ Form::checkbox('is_upcoming',null,'false')}}
					</div>
					<div class="form-group">
					{{ Form::label('IMDB link:') }}
					{{ Form::text('imdb_link',null, array('class'=>'form-control')) }}
					</div>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="form-group">
				{{ Form::label('Кино контент:') }}
				{{ Form::textarea('movie_content',null, array('class'=>'form-control')) }}
				</div>
			</div>
			<div class="col-lg-6">
				<div class="form-group">
				{{ Form::label('Киноны тухай товч:') }}
				{{ Form::textarea('synopsis',null, array('class'=>'form-control')) }}
				</div>
			</div>
		</div>
	</div>
<div class="form-group">
{{ HTML::link('admin/movie/','Болих',array('class'=>'btn btn-default pull-right')) }}
{{ Form::submit('Хадгалах', array('class'=>'btn btn-primary pull-right','style'=>'margin-right: 5px')) }}
</div>

{{ Form::close() }}
@stop