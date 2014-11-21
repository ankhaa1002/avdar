<?php

class AdminController extends BaseController {

    public function showLogin() {
        $user = Session::get('admin');
        if ($user != null) {
            return Redirect::route('admin_index');
        } else {
            $view = View::make('admin.login');
        }
        return $view;
    }

    public function showIndex() {
        Validation::AdminCheck();
        $user = Session::get('admin');
        $view = View::make('admin.index')->with('user', $user);
        $view->title = 'Удирдлагын хэсэг';
        $view->ses = Session::all();
        return $view;
    }

    public function doLogin() {

        if (Session::get('admin') == null) {
            $rules = array(
                'username' => 'required',
                'password' => 'required'
            );

            $validator = Validator::make(Input::all(), $rules);

            if ($validator->fails()) {
                return Redirect::to('admin/login')
                                ->withErrors($validator)
                                ->withInput(Input::except('password'));
            } else {
                $userdata = array(
                    'username' => Input::get('username'),
                    'password' => Input::get('password')
                );

                if (Auth::attempt($userdata)) {
                    $is_admin = Auth::user()->is_admin;
                    if ($is_admin == 1) {
                        Session::put('admin', Auth::user());
                        return Redirect::route('admin_index');
                    } else {
                        return Redirect::to('admin/login')->with('message', 'Та удирдлага руу нэвтрэх эрхгүй байна!');
                    }
                } else {

                    return Redirect::to('admin/login')->with('message', 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!');
                }
            }
        } else {
            return Redirect::route('admin_index');
        }
    }

    public function dologout() {
        Auth::logout();
        Session::forget('admin');
        return Redirect::to('admin/login')->with('logout_msg', 'Амжилттай гарлаа');
    }

    public function home() {
        return View::make('hello');
    }

}
