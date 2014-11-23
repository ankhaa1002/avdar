<!doctype html>
<html>
    @include('includes.base.header')
    <body>
        <header id="main-header">
            <div class="top-header clearfix">
                <div id="logo"><a href="/">Avdar movie site</a></div>
                <form action="/search" name="search_movies_form" id="search_movies_form">
                    <ul>
                        <li><input type="text" name="q" value="" placeholder="Хайх киногоо энд бичнэ үү..."></li>
                        <li><button type="submit" class="but1">Кино хайх</button></li>
                    </ul>
                </form>
            </div> 
            @include('includes.base.breadcrumb') 
        </header> 
        <div id="main-section">
            <section>
                <div class="main-content">
                    <header>
                        <h3 style="float:left;" class="previews-section-h"><a href="/popular.html">Кино авдар (Нийт: 1125)</a></h3>
                        <div class="movie-filter">
                            <form action="http://yts.re/browse-movie" class="searchForm" accept-charset="utf-8" method="post">						
                                <label>Жанр:</label>
                                <select name="Жанр" id="form_Genre">
                                    <option value="All" style="text-indent: 0px;" selected="selected">Бүгд</option>
                                    <option value="Action" style="text-indent: 0px;">Action</option>
                                    <option value="Adventure" style="text-indent: 0px;">Adventure</option>
                                    <option value="Animation" style="text-indent: 0px;">Animation</option>
                                    <option value="Biography" style="text-indent: 0px;">Biography</option>
                                    <option value="Comedy" style="text-indent: 0px;">Comedy</option>
                                    <option value="Crime" style="text-indent: 0px;">Crime</option>
                                    <option value="Documentary" style="text-indent: 0px;">Documentary</option>
                                    <option value="Drama" style="text-indent: 0px;">Drama</option>
                                    <option value="Family" style="text-indent: 0px;">Family</option>
                                    <option value="Fantasy" style="text-indent: 0px;">Fantasy</option>
                                    <option value="Film-Noir" style="text-indent: 0px;">Film-Noir</option>
                                    <option value="History" style="text-indent: 0px;">History</option>
                                    <option value="Horror" style="text-indent: 0px;">Horror</option>
                                    <option value="Music" style="text-indent: 0px;">Music</option>
                                    <option value="Musical" style="text-indent: 0px;">Musical</option>
                                    <option value="Mystery" style="text-indent: 0px;">Mystery</option>
                                    <option value="Romance" style="text-indent: 0px;">Romance</option>
                                    <option value="Sci-Fi" style="text-indent: 0px;">Sci-Fi</option>
                                    <option value="Short" style="text-indent: 0px;">Short</option>
                                    <option value="Sport" style="text-indent: 0px;">Sport</option>
                                    <option value="Thriller" style="text-indent: 0px;">Thriller</option>
                                    <option value="War" style="text-indent: 0px;">War</option>
                                    <option value="Western" style="text-indent: 0px;">Western</option>
                                </select>					
                                <label>Үнэлгээ</label>
                                <select name="Үнэлгээ" id="form_Rating">
                                    <option value="0" style="text-indent: 0px;" selected="selected">Бүгд</option>
                                    <option value="9.9" style="text-indent: 0px;">10</option>
                                    <option value="9" style="text-indent: 0px;">9+</option>
                                    <option value="8" style="text-indent: 0px;">8+</option>
                                    <option value="7" style="text-indent: 0px;">7+</option>
                                    <option value="6" style="text-indent: 0px;">6+</option>
                                    <option value="5" style="text-indent: 0px;">5+</option>
                                    <option value="4" style="text-indent: 0px;">4+</option>
                                    <option value="3" style="text-indent: 0px;">3+</option>
                                    <option value="2" style="text-indent: 0px;">2+</option>
                                    <option value="1" style="text-indent: 0px;">1+</option>
                                </select>							
                            </form>			
                        </div>
                    </header>

                    <div class="table-div clearfix">
                        @yield('content') 
                        <div class="clear"></div>
                    </div> 
                     
                    <ul class="pagination">
                        <li class="active">1</li><li><a href="http://justmoviez.to/action.html?page=2" rel="next" title="2">2</a></li><li><a href="http://justmoviez.to/action.html?page=3" title="3">3</a></li><li class="sep_page">...</li><li><a href="http://justmoviez.to/action.html?page=27">27</a></li><li class="next"><a href="http://justmoviez.to/action.html?page=2" title=">">&gt;</a></li> </ul>
                    <div class="clear"></div>
                </div> 
            </section>
            <section class="info-section">
                <div class="info-section-content clearfix">
                    <section class="stars-born column2">
                        <a class="twitter-timeline" href="https://twitter.com/JustMoviezzz" data-widget-id="509318238233063424">Tweets von @JustMoviezzz</a>
                        <script>!function (d, s, id) {
                                var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
                                if (!d.getElementById(id)) {
                                    js = d.createElement(s);
                                    js.id = id;
                                    js.src = p + "://platform.twitter.com/widgets.js";
                                    fjs.parentNode.insertBefore(js, fjs);
                                }
                            }(document, "script", "twitter-wjs");</script>
                    </section> 
                    <section class="latest-coments-preview column2">
                        <header>
                            <h4><a href="/latest-comments.html">Latest Comments</a></h4>
                        </header>
                        <article>
                            <header>
                                <time>Ahmed November 23, 2014 - 09:03</time>
                            </header>
                            <p><a href="/watch-lucy-2014-online/movie-1969.html">here with the brip quality, and no popup http://filmseri.net/lucy-2014/</a></p>
                        </article>
                        <article>
                            <header>
                                <time>Luka November 22, 2014 - 11:22</time>
                            </header>
                            <p><a href="/watch-big-hero-6-2014-online/movie-534.html">I think it will be cool</a></p>
                        </article>
                        <article>
                            <header>
                                <time>georg November 20, 2014 - 18:15</time>
                            </header>
                            <p><a href="/watch-the-ouija-experiment-2011-online/movie-22702.html">another one bad horror movie))</a></p>
                        </article>
                        <article>
                            <header>
                                <time>mariam November 20, 2014 - 18:14</time>
                            </header>
                            <p><a href="/watch-green-zone-2010-online/movie-28913.html">just watched it and can advice all who love action movies</a></p>
                        </article>
                    </section> 
                </div>
            </section>
        </div> 
        @include('includes.base.footer')
    </body>
</html>

