<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', array('uses'=>'AdminController@home'));

Route::get('admin/login',array('as'=>'admin_login','uses'=>'AdminController@showLogin'));

Route::get('admin',array('as'=>'admin_index','uses'=>'AdminController@showIndex'));

Route::post('admin/login',array('uses'=>'AdminController@doLogin'));

Route::get('admin/dologout',array('as'=>'logout','uses'=>'AdminController@dologout'));

Route::resource('admin/movie', 'MovieController');

Route::post('admin/movie/create',array('as'=>'movie_create','uses'=>'MovieController@movieCreate'));