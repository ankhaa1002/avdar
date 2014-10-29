<?php
class Movie extends Eloquent{

	protected $guarded = ['id'];
	protected $fillable = ['moveisupcoming'];
	protected $table = 'movie';

	public function genres(){
		return $this->hasMany('MovieGenre');
	}
}