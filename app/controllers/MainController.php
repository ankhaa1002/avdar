<?php

class MainController extends BaseController {

    public function index() {
        $view = View::make('index');
        $view->title = "Avdar Movie Site";
        $view->genres = Genre::orderBy('genre_name')->get();
        $view->movies = Movie::with(array('genres' => function($query) {
                        $query->join('genre', 'movie_genre.genre_id', '=', 'genre.id');
                    }))->where('is_upcoming', '=', 0)->get();

        return $view;
    }

    public function show($id) {
        $movies = Movie::with(array('genres' => function($query) {
                        $query->join('genre', 'movie_genre.genre_id', '=', 'genre.id');
                    }))->get();
        $movie = $movies->find($id);
        if (!$movie) {
            $response = View::make('error.404');
            $response->title = 'Алдаа!';
            $response->genres = Genre::orderBy('genre_name')->get();
            return $response;
        } else {
            $view = View::make('movie.show');
            $view->genres = Genre::orderBy('genre_name')->get();
            $view->movie = $movie;
            $view->title = $movie->name . " (" . substr($movie->release_date, 0, 4) . ")";
            $view->comments = DB::table('comment')->where('movie_id', '=', $id)->take(20)->orderBy('created_date', 'desc')->get();
            return $view;
        }
    }

    public function store_comment() {
        $validator = Validator::make(
                        array('name' => Input::get('name'), 'comment' => Input::get('comment')), array('name' => 'required|min:3', 'comment' => 'required|max:255')
        );

        if ($validator->fails()) {
            return Redirect::to(Config::get('app.url') . '/movie/' . Input::get('m_id'))->with('messages', $validator->messages());
        } else {
            $comment = new Comment();
            $comment->name = Input::get('name');
            $comment->created_date = date("Y-m-d H:i:s");
            $comment->content = Input::get('comment');
            $comment->movie_id = Input::get('m_id');

            $comment->save();

            return Redirect::to(Config::get('app.url') . '/movie/' . Input::get('m_id'));
        }
    }

}
