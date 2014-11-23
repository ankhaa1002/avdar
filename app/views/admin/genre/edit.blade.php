@extends('layouts.master')

@section('content')
{{ Form::model($genre,array('method'=>'PATCH','route'=>array('admin.genre.update',$genre->id),'id'=>'edit-genre')) }}
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Жанр засах</h3>
    </div>
    <div class="panel-body" style="padding: 20px;">
        <div class="col-lg-12">
            <div class="col-lg-6">
                <div class="form-group">
                    {{ Form::label('Жанрын нэр:') }}
                    {{ Form::text('genre_name', $genre->genre_name, array('class'=>'form-control')) }}
                </div>
    </div>
</div>
{{ HTML::link('admin/genre/','Болих',array('class'=>'btn btn-default pull-right')) }}
{{ Form::submit('Хадгалах', array('class'=>'btn btn-primary pull-right','style'=>'margin-right: 5px')) }}
{{ Form::close() }}
@stop