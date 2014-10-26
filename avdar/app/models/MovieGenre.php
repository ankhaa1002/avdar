<?php
class MovieGenre extends Eloquent{

	public $timestamps = false;
	protected $fillable = ['genres'];
	protected $table = 'movie_genre';
}