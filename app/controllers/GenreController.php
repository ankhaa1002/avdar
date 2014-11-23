<?php

class GenreController extends \BaseController {
    
    public function __construct() {
        Validation::AdminCheck();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $view = View::make('admin.genre.index');
        $view->title = 'Жанрын төрлүүд';
        $view->user = Session::get('admin');
        return $view;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        $view = View::make('admin.genre.create');
        $view->title = 'Жанр үүсгэх';
        $view->user = Session::get('admin');
        return $view;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {
        $genre = new Genre();
        $genre->genre_name = Input::get('genre_name');
        $genre->save();
        return Redirect::to('admin/genre')->with('message', 'Жанр амжилттай нэмэгдлээ');
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
        
        $view = View::make('admin.genre.edit', compact('genre'));
        $view->title = 'Жанр засах';
        $view->genre = Genre::find($id);
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
        $genre = Genre::find($id);
        $genre->genre_name = Input::get('genre_name');
        $genre->save();
        return Redirect::to('admin/genre')->with('message', 'Жанр амжилттай хадгалагдлаа');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $genre = Genre::find($id);
        $genre->delete();

        return Redirect::route('admin.genre.index')->with('message', 'Жанрыг амжилттай устгалаа!');
    }

    public function getGenreList() {
        $name = Input::get('genre_name');
        $page = Input::get('page');
        $rows = Input::get('rows');
        $offset = ($page - 1) * $rows;

        $count = Genre::where('genre_name', 'LIKE', '%' . $name . '%')->count();

        $genreList = Genre::where('genre_name', 'LIKE', '%' . $name . '%')
                ->skip($offset)
                ->take($rows)
                ->get();

        $result = array();
        $result['total'] = $count;
        $result['rows'] = $genreList;

        return $result;
    }

}
