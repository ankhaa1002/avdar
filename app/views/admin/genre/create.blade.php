@extends('layouts.master')

@section('content')
{{ Form::open(array('url'=>'admin/genre','id'=>'create-genre')) }}
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Жанр нэмэх</h3>
    </div>
    <div class="panel-body" style="padding: 20px;">
        <div class="col-lg-12">
            <div class="col-lg-6">
                <div class="form-group">
                    {{ Form::label('Жанрын нэр:') }}
                    {{ Form::text('genre_name', '', array('class'=>'form-control')) }}
                </div>
    </div>
</div>
{{ HTML::link('admin/genre/','Болих',array('class'=>'btn btn-default pull-right')) }}
{{ Form::submit('Хадгалах', array('class'=>'btn btn-primary pull-right','style'=>'margin-right: 5px')) }}
{{ Form::close() }}
@stop