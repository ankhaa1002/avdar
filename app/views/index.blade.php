@extends('layouts.base')

@section('content')
<div class="main-content">
    <header>
        <h3 class="previews-section-h"><a href="/popular.html">Шинээр нэмэгдсэн</a></h3>
    </header>
    <div class="table-div clearfix">
        <section class="popular-movies-section previews-section column">
            <ul class="previews clearfix">
                @foreach($movies as $movie)
                <li>
                    <a href="movie/{{$movie->id}}">
                        <figure>
                            <p>
                                <img src="{{ $movie->featured_image }}" width="160" height="238" alt="Lucy">
                            </p>
                            <div class="description clearfix">
                                <h6>
                                    <?php $count = 0; ?>
                                    @foreach($movie->genres as $genre)
                                    @if(count($movie->genres)-1 == $count)
                                    {{ $genre['genre_name'] }}
                                    @else
                                    {{ $genre['genre_name'] }},
                                    @endif
                                    <?php $count++; ?>
                                    @endforeach
                                </h6>
                                <p>{{ $movie->release_date }}</p>
                                <p>{{ $movie->synopsis }}</p>
                                <div class="clear"></div>
                                <span class="cover">
                                    <i>{{ $movie->rating }}</i>
                                </span>
                            </div>
                            <figcaption>{{ $movie->name }}</figcaption>
                        </figure>
                    </a>
                </li>
                @endforeach
            </ul> 
        </section> 
        <aside class="column">
            <header>
                <h3>
                    Welcome to<br>
                    Justmoviez</h3>
                <p>
                    If you love Movies and TV Series then JustMoviez is the right place for you! Our portal provides streaming links where you can watch movies online for free and without any registration. On JustMoviez you can browse through thousands of film by genre, year, name, release date or movie rating. Our site offers full information about each release: storyline, directors, actors, trailers, screenshots, comments and reviews, stream locations and much more. The portal will be updated daily to offer the best collection for every movie fan. We appreciate any feedback from your side concerning things we can make better. You are welcome to leave your comments on the movie pages. We hope you would love our site!</p>
            </header>
        </aside> 
        <div class="clear"></div>
    </div> 

    <div class="clear"></div>
    <section class="latest-movies-section previews-section">
        <header>
            <h3><a href="/latest.html">Олон хандалттай</a></h3>
        </header>
        <ul class="previews">
            <li>
                <a href="/watch-birdman-2014-online/movie-858.html">
                    <figure>
                        <p>
                            <img src="http://justmoviez.to/uploads/movies/858/160/efea01191d28fae0411144856bae1916.jpg" width="160" height="238" alt="Birdman">
                        </p>
                        <div class="description clearfix" style="height: 187px;">
                            <h6>Comedy, Drama</h6>
                            <p>28 Jan 2015 (USA, France)</p>
                            <p>
                                A washed-up actor who once played an iconic superhero must overcome his ego and family trouble as he moun...</p>
                            <div class="clear"></div>
                            <span class="cover">
                                <i>8.8</i>
                            </span>
                        </div>
                        <figcaption>Birdman</figcaption>
                    </figure>
                </a>
            </li>

        </ul> 
    </section> 
</div> 
<section class="info-section">
    <div class="info-section-content clearfix">
        <section class="latest-coments-preview column2">
            <header>
                <h4><a href="/latest-comments.html">Latest Comments</a></h4>
            </header>
            <article>
                <header>
                    <time>aleks November 23, 2014 - 16:55</time>
                </header>
                <p><a href="/watch-transit-2006-online/movie-46058.html">а че фильм не на русском?</a></p>
            </article>
            <article>
                <header>
                    <time>toby November 23, 2014 - 16:54</time>
                </header>
                <p><a href="/watch-the-hunt-2012-online/movie-12886.html">so how to watch this movie online now? do you have any tutorial on how to use your site?</a></p>
            </article>
            <article>
                <header>
                    <time>ella November 23, 2014 - 16:53</time>
                </header>
                <p><a href="/watch-zero-dark-thirty-2012-online/movie-13043.html">thanks for stream</a></p>
            </article>
            <article>
                <header>
                    <time>greg November 23, 2014 - 16:53</time>
                </header>
                <p><a href="/watch-zero-dark-thirty-2012-online/movie-13043.html">the movie tells a story about the gunt of mysterious authorities for unreal person Osama bin Laden</a></p>
            </article>
        </section> 
    </div> 
</section>
@stop