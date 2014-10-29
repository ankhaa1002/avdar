<ul class="nav navbar-nav side-nav">
    <li class="{{ Request::is('admin') ? 'active' : '' }}">
        {{ HTML::linkroute('admin_index','Эхлэл') }}
    </li>
    <li class="{{ Request::is('admin/movie*') ? 'active' : '' }}">
        <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="glyphicon glyphicon-facetime-video" style="margin-right: 10px;"></i> Кино <i class="fa fa-fw fa-caret-down"></i></a>
        <ul id="demo" class="{{ Request::is('admin/movie*') ? 'collapse in' : 'collapse' }}">
            <li class="{{ Request::is('admin/movie/create') ? 'active' : '' }}">{{ HTML::link('admin/movie/create','Нэмэх') }}</li>
        	<li class="{{ Request::is('admin/movie') ? 'active' : '' }}">{{ HTML::link('admin/movie/','Жагсаалт') }}</li>
        </ul>
    </li>
</ul>