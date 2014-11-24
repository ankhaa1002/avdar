<?php

class MainController extends BaseController {

    public function index() {
        $view = View::make('index');
        $view->title = "Avdar Movie Site";
        $view->genres = Genre::orderBy('genre_name')->get();
        $view->movies = Movie::with(array('genres' => function($query) {
                $query->join('genre', 'movie_genre.genre_id', '=', 'genre.id');
            }))->get();

        return $view;
    }
    
    public function show($id){
        $movies = Movie::with(array('genres' => function($query) {
                $query->join('genre', 'movie_genre.genre_id', '=', 'genre.id');
            }))->get();
        $movie = $movies->find($id);
        $view = View::make('movie.show');
        $view->genres = Genre::orderBy('genre_name')->get();
        $view->movie = $movie;
        $view->title = $movie->name;
        $view->comments = DB::table('comment')->where('movie_id','=',$id)->get();
        return $view;
    }

}
