<!doctype html>
<html>
    @include('includes.base.header')
    <body>
        <header id="main-header">
            <div class="top-header clearfix">
                <div id="logo"><a href="{{ Config::get('app.url') }}">Avdar movie site</a></div>
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

            @yield('content')

        </div> 
        @include('includes.base.footer')
    </body>
</html>

