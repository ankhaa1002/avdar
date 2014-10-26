<?php

class MovieController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$hereglegch = Session::get('user');
		Movie::all();
		$view = View::make('admin.movie.index');
		$view->title = 'Кино жагсаалт';
		$view->user = $hereglegch;
		return $view;
	}

	public function getList(){
		$hereglegch = Session::get('user');
		Movie::all();
		$view = View::make('admin.movie.list');
		$view->title = 'Кино жагсаалт';
		$view->user = $hereglegch;
		return $view;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$hereglegch = Session::get('user');
		$view = View::make('admin.movie.create');
		$view->title = 'Кино нэмэх';
		$view->user = $hereglegch;
		$view->genres = Genre::lists('genre_name','genre_id');
		return $view;
	}

	public function movieCreate(){

		$destinationPath = 'uploads/movies/covers';
		$fileSize = Input::file('moviecover')->getSize();

		$fileName = 'file_'.mt_rand(99999999, 9999999999).'.'.Input::file('moviecover')->getClientOriginalExtension();

		if($fileSize > 10000000){
			Redirect::to('admin/movie/create')->with('file_upload_error','Файлын хэмжээ хэтэрсэн байна!');
		}
		else{
			Input::file('moviecover')->move($destinationPath,$fileName);
		}

		$movie = new Movie;
		$movie->featured_image = $destinationPath.'/'.$fileName;
		$movie->name = Input::get('moviename');
		$movie->rating = Input::get('movierating');
		$movie->cast = Input::get('moviecast');
		$movieDate = strtotime(Input::get('moviedate'));
		$realMovieDate = date('Y-m-d',$movieDate);
		$movie->release_date = $realMovieDate;
		$movie->length = Input::get('movielength');
		$movie->language = Input::get('movielanguage');
		$movie->synopsis = Input::get('moviesynopsis');
		$movie->movie_trailer = Input::get('movietrailer');
		$movie->is_upcoming = ((Input::get('movieisupcoming') == null) ? 0 : 1);
		$movie->imdb_link = Input::get('movieimdblink');
		$movie->director = Input::get('moviedirector');
		$movie->uploaded_admin = Session::get('user')->user_id;
		$movie->movie_content = Input::get('moviecontent');
		$movie->save();

		$last_inserted_id = DB::getPdo()->lastInsertId();

		foreach (Input::get('genres') as $genre) {
			DB::table('movie_genre')->insert(
			    array('movie_id' => $last_inserted_id, 'genre_id' => intval($genre))
			);
		}


		

		return Redirect::to('admin/movie/')->with('message','Кино амжилттай нэмэгдлээ');
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


}
