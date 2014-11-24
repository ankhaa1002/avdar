@extends('layouts.base')

@section('content')
<div class="main-content clearfix">
    <header class="clearfix">
        <h1><i itemprop="name">{{ $movie->name }}</i> ({{ substr($movie->release_date,0,4) }})</h1>
    </header>
    <section class="left-side column">
        <article class="description-moovie clearfix">
            <header class="clearfix">
                <ul class="genre clearfix">
                    <li><i itemprop="duration">{{ $movie->length }} минут</i> -</li>
                    @foreach($movie->genres as $genre)
                    <li itemprop="genre"><a href="/action.html">{{ $genre['genre_name'] }}</a></li>
                    @endforeach
                    <li>- {{ $movie->release_date }}</li>
                </ul>
            </header>
            <figure><img src="{{ Config::get('app.url') }}/{{ $movie->featured_image }}" alt="{{ $movie->name }}" itemprop="image"><a href="#" class="stream_a but1" rel="nofollow" target="_blank">Үзэх</a></figure>
            <div class="content-description-moovie">
                <ul class="discription-ul clearfix">
                    <li class="clearfix"><span class="title">Үнэлгээ:</span>
                        <i>
                            <span class="cover"><i>{{ $movie->rating }}</i></span>
                        </i>
                    </li>
                    <li class="clearfix"><span class="title">Гарсан он</span><i>{{ substr($movie->release_date,0,4) }}</i></li>
                    <li class="clearfix"><span class="title">Гарсан огноо</span><i>{{ $movie->release_date }}</i></li>
                    <li class="clearfix"><span class="title">Найрлуулагч</span><i>{{ $movie->director }}</i></li>
                    <li class="clearfix"><span class="title">Дүрүүдэд</span><i><p>{{ $movie->cast }}</p>  </i></li>

                </ul>
                <p itemprop="description">{{ $movie->synopsis }}</p>
            </div> 
            <div class="clear"></div>
        </article> 

        <section class="video-section">
            <header>
                <h3>кино танилцуулга</h3>
                <div class="video-div">
                    <center>{{ $movie->movie_trailer }}</center>
                </div>
            </header>
        </section>

        <section class="popular-movies-section previews-section popular">
            <header>
                <h3><a href="/popular.html">Олон хандалттай кинонууд</a></h3>
            </header>
            <ul class="previews clearfix">
                <li>
                    <a href="/watch-lucy-2014-online/movie-1969.html">
                        <figure>
                            <p>
                                <img src="http://justmoviez.to/uploads/movies/1969/160/188000a74b5473d8a4ea4c10eb78cc3b.jpg" width="160" height="238" alt="Lucy">
                            </p>
                            <div class="description clearfix" style="height: 187px;">
                                <h6>Action, Sci-Fi</h6>
                                <p>25 Jul 2014 (France)</p>
                                <p>Even yesterday she was just a sexy blonde&nbsp;but today is the most dangerous and deadly creation on the planet wi...</p>
                                <div class="clear"></div>
                                <span class="cover">
                                    <i>6.6</i>
                                </span>
                            </div>
                            <figcaption>Lucy</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="/watch-the-equalizer-2014-online/movie-1103.html">
                        <figure>
                            <p>
                                <img src="http://justmoviez.to/uploads/movies/1103/160/8093d9aaa32a9642f002e37458218918.jpg" width="160" height="238" alt="The Equalizer">
                            </p>
                            <div class="description clearfix" style="height: 187px;">
                                <h6>Action, Crime, Thriller</h6>
                                <p>26 Sep 2014 (USA)</p>
                                <p>
                                    McCall (Denzel Washington) sets an end with his dangerous past and decides to begin a new, quiet life. Th...</p>
                                <div class="clear"></div>
                                <span class="cover">
                                    <i>7.6</i>
                                </span>
                            </div>
                            <figcaption>The Equalizer</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="/watch-lets-be-cops-2014-online/movie-1719.html">
                        <figure>
                            <p>
                                <img src="http://justmoviez.to/uploads/movies/1719/160/f945a64907893d6003eb759902597be0.jpg" width="160" height="238" alt="Let's Be Cops">
                            </p>
                            <div class="description clearfix" style="height: 187px;">
                                <h6>Action, Comedy</h6>
                                <p>13 Aug 2014 (USA)</p>
                                <p>
                                    It's another one cop movie with the only exception: they are not real cops. Two buddies dress as poli...</p>
                                <div class="clear"></div>
                                <span class="cover">
                                    <i>6.8</i>
                                </span>
                            </div>
                            <figcaption>Let's Be Cops</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="/watch-dawn-of-the-planet-of-the-apes-2014-online/movie-2361.html">
                        <figure>
                            <p>
                                <img src="http://justmoviez.to/uploads/movies/2361/160/5b6127b226f296f04993d583c5369abd.jpg" width="160" height="238" alt="Dawn of the Planet of the Apes">
                            </p>
                            <div class="description clearfix" style="height: 187px;">
                                <h6>Action, Drama, Sci-Fi</h6>
                                <p>11 Jul 2014 (USA)</p>
                                <p>The number of genetically modified monkeys, leading by Caesar, continues to increase But people who managed to...</p>
                                <div class="clear"></div>
                                <span class="cover">
                                    <i>8.1</i>
                                </span>
                            </div>
                            <figcaption>Dawn of the Planet of the Apes</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="/watch-22-jump-street-2014-online/movie-2584.html">
                        <figure>
                            <p>
                                <img src="http://justmoviez.to/uploads/movies/2584/160/8af69d82e649decb70af86d5e8c12ee1.jpg" width="160" height="238" alt="22 Jump Street">
                            </p>
                            <div class="description clearfix" style="height: 187px;">
                                <h6>Action, Comedy, Crime</h6>
                                <p>13 Jun 2014 (USA)</p>
                                <p>Our friends Jenco and Schmidt prove themselves in a new case. New job is undercover. Now they appear in colleg...</p>
                                <div class="clear"></div>
                                <span class="cover">
                                    <i>7.8</i>
                                </span>
                            </div>
                            <figcaption>22 Jump Street</figcaption>
                        </figure>
                    </a>
                </li>
            </ul> 
        </section> 
    </section> 
    <section class="right-side column">
        <section class="movie-discussion-section" id="discussion">
            <header>
                <h3>Үзэгчдийн сэтгэгдэл</h3>
            </header>
            {{ Form::open(array('url'=>'movie/comment','id'=>'discussion_form','name'=>'discussion_form','novalidate'=>'novalidate')) }}
            <dl>
                {{Form::hidden('m_id',$movie->id)}}
                @if(Session::has('messages'))
                @foreach(Session::get('messages')->all() as $message)
                <span class="error" style="display:block;">{{ $message }}</span>
                @endforeach
                @endif
                <dt><label for="name">Таны нэр</label></dt>
                <dd>
                    {{ Form::text('name', '', array('placeholder'=>'Нэр','id'=>'name','required'=>'')) }}
                </dd>

                <dt><label for="comment">Сэтгэгдэл</label></dt>
                <dd>
                    {{ Form::textarea('comment', '', array('placeholder'=>'Өөрийнхөө сэтгэгдлийг бидэнтэй хуваалцана уу :)','id'=>'comment')) }}
                </dd>
            </dl>
            <div>
                <button name="submit_comment" class="but1">Оруулах</button>
            </div>
            {{ Form::close() }}
            <div class="scroll-pane" style="overflow: hidden; padding: 0px; width: 320px;">

                <div class="jspContainer" style="width: 320px; height: 908px;">
                    <div class="jspPane" style="padding: 0px; top: 0px; left: 0px; width: 320px;"><article class="some-comment">
                            @foreach($comments as $comment)
                            <article class="some-comment">
                                <header>
                                    <h6>{{ $comment->name }} <time>{{ $comment->created_date }}</time></h6>
                                </header>
                                <div class="content-comment">
                                    <i class="point"></i>
                                    <p>{{ $comment->content }}</p>
                                </div>
                            </article>
                            @endforeach
                    </div>
                </div>
            </div> 
        </section> 
    </section> 
</div>
@stop