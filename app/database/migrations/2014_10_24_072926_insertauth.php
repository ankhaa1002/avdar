<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Insertauth extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		DB::table('users')->insert(
    	array(
    		'user_id' => 2,
    		'code' => 002,
    		'username' => 'user',
    		'password' => Hash::make('user'),
    		'is_admin' => 0
    		)
    	);
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
