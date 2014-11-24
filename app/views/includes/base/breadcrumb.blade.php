<nav id="main-nav">
    <ul class="clearfix" id="nav">
        <li class="active"><a href="{{ Config::get('app.url') }}">Эхлэл</a></li>
        <li>
            <a href="/genres.html" rel="submenu">Киноны жанрууд</a>
            <div class="hover-element">
                <i class="point"></i>
            </div>
            <div class="submenu">
                <div class="content-submenu clearfix">
                    <ul>
                        @foreach($genres as $genre)
                        <li><a href="/action.html"><i>{{ $genre['genre_name'] }}</i></a></li>
                        @endforeach
                    </ul>
                </div> 
            </div> 
        </li>
        <li><a href="/popular.html">Хамгийн их үзсэн</a></li>
        <li><a href="/latest.html">Сүүлд нэмэгдсэн</a></li>
    </ul>
</nav>