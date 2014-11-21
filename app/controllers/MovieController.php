<?php

class MovieController extends \BaseController {

    public function __construct() {
        Validation::AdminCheck();
    }

    public function index() {
        $view = View::make('admin.movie.index');
        $view->title = 'Кино жагсаалт';
        $view->user = Session::get('admin');
        $view->movies = Movie::with(array('genres' => function($query) {
                $query->join('genre', 'movie_genre.genre_id', '=', 'genre.genre_id');
            }))->get();
        return $view;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        $view = View::make('admin.movie.create');
        $view->title = 'Кино нэмэх';
        $view->user = Session::get('admin');
        $view->genres = Genre::lists('genre_name', 'genre_id');
        return $view;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {
        $destinationPath = 'uploads/movies/covers';
        $fileName = 'file_' . mt_rand(99999999, 9999999999) . '.' . Input::file('moviecover')->getClientOriginalExtension();
        $this->uploadFile($destinationPath, $fileName, Input::file('moviecover'));

        $movie = new Movie;
        $movie->featured_image = $destinationPath . '/' . $fileName;
        $movie->name = Input::get('moviename');
        $movie->rating = Input::get('movierating');
        $movie->cast = Input::get('moviecast');
        $movieDate = strtotime(Input::get('moviedate'));
        $realMovieDate = date('Y-m-d', $movieDate);
        $movie->release_date = $realMovieDate;
        $movie->length = Input::get('movielength');
        $movie->language = Input::get('movielanguage');
        $movie->synopsis = Input::get('moviesynopsis');
        $movie->movie_trailer = Input::get('movietrailer');
        $movie->is_upcoming = ((Input::get('movieisupcoming') == null) ? 0 : 1);
        $movie->imdb_link = Input::get('movieimdblink');
        $movie->director = Input::get('moviedirector');
        $movie->uploaded_admin = Session::get('admin')->user_id;
        $movie->movie_content = Input::get('moviecontent');
        $movie->save();

        $last_inserted_id = DB::getPdo()->lastInsertId();

        foreach (Input::get('genres') as $genre) {
            DB::table('movie_genre')->insert(
                    array('movie_id' => $last_inserted_id, 'genre_id' => intval($genre))
            );
        }
        return Redirect::to('admin/movie/')->with('message', 'Кино амжилттай нэмэгдлээ');
    }

    public function uploadFile($destinationPath, $fileName, $file) {
        $fileSize = $file->getSize();
        if ($fileSize > 10000000) {
            Redirect::to('admin/movie/create')->with('file_upload_error', 'Файлын хэмжээ хэтэрсэн байна!');
        } else {
            $file->move($destinationPath, $fileName);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {
        $movie = Movie::with(array('genres' => function($query) {
                $query->join('genre', 'movie_genre.genre_id', '=', 'genre.genre_id');
            }))->get()->find($id);

        $view = View::make('admin.movie.edit', compact('movie'));
        $view->title = 'Кино нэмэх';
        $view->movieGenres = Movie::find($id)->genres->lists('genre_id');
        $view->genres = Genre::lists('genre_name', 'genre_id');
        $view->user = Session::get('admin');
        return $view;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        $genres = DB::table('movie_genre')->where('movie_id', '=', $id)->delete();

        $movie = Movie::find($id);
        $featured_image = $movie->featured_image;

        if (Input::file('featured_image') != null) {
            $destinationPath = 'uploads/movies/covers';
            $fileName = 'file_' . mt_rand(99999999, 9999999999) . '.' . Input::file('featured_image')->getClientOriginalExtension();
            $this->uploadFile($destinationPath, $fileName, Input::file('featured_image'));
            $featured_image = $destinationPath . '/' . $fileName;
        }

        $movie->featured_image = $featured_image;
        $movie->name = Input::get('name');
        $movie->rating = Input::get('rating');
        $movie->cast = Input::get('cast');
        $movieDate = strtotime(Input::get('release_date'));
        $realMovieDate = date('Y-m-d', $movieDate);
        $movie->release_date = $realMovieDate;
        $movie->length = Input::get('length');
        $movie->language = Input::get('language');
        $movie->synopsis = Input::get('synopsis');
        $movie->movie_trailer = Input::get('movie_trailer');
        $movie->is_upcoming = ((Input::get('is_upcoming') == null) ? 0 : 1);
        $movie->imdb_link = Input::get('imdb_link');
        $movie->director = Input::get('director');
        $movie->movie_content = Input::get('movie_content');
        $movie->save();

        if (Input::get('genres') != null) {
            foreach (Input::get('genres') as $janr) {
                DB::table('movie_genre')->insert(
                        array('movie_id' => $id, 'genre_id' => intval($janr))
                );
            }
        }

        return Redirect::to('admin/movie')->with('message', 'Өөрчлөлт амжилттай хадгалагдлаа!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $movie = Movie::find($id);
        $movie->delete();

        return Redirect::route('admin.movie.index')->with('message', 'Киног амжилттай устгалаа!');
    }

}
