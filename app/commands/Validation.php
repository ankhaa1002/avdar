<?php

class Validation {

    public static function AdminCheck() {
        $user = Session::get('admin');
        if (!$user) {
            header('location: ' . Config::get('app.url') . '/admin/login');
            exit;
        }
    }

}
?>

