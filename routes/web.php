<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Home Routes
Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/index', 'HomeController@index')->name('index');
Route::get('/schedule', 'HomeController@index')->name('schedule');

// Auth Routes
Auth::routes();


// Dashboard Route Group
Route::group(['prefix' => '/dashboard'], function(){

	// Default dashboard route
	Route::get('/', 'Dashboard\DashboardController@index')->name('dashboard');

	Route::group(['prefix' => 'teams'], function() {
		Route::get('/', 'Dashboard\TeamController@index')->name('dashboard.teams');
	});

	Route::group(['prefix' => 'schedules'], function() {
		Route::get('/', 'Dashboard\ScheduleController@index')->name('dashboard.schedules');
		Route::get('/groups', 'Dashboard\ScheduleController@groups')->name('dashboard.schedules.groups');
		Route::get('/stages', 'Dashboard\ScheduleController@stages')->name('dashboard.schedules.stages');
	});

	Route::group(['prefix' => 'standings'], function() {
		Route::get('/', 'Dashboard\StandingController@index')->name('dashboard.standings');
		Route::get('/groups', 'Dashboard\StandingController@groups')->name('dashboard.standings.groups');
		Route::get('/stages', 'Dashboard\StandingController@stages')->name('dashboard.standings.stages');

	});

	Route::group(['prefix' => 'champion'], function() {
		Route::get('/', 'Dashboard\ChampionController@index')->name('dashboard.champion');
	});

	Route::group(['prefix' => 'statistics'], function() {
		Route::get('/', 'Dashboard\StatisticController@index')->name('dashboard.statistics');
		Route::get('/goals', 'Dashboard\StatisticController@goals')->name('dashboard.statistics.goals');
		Route::get('/versus', 'Dashboard\StatisticController@versus')->name('dashboard.statistics.versus');
	});

	Route::group(['prefix' => 'nations'], function() {
		Route::get('/', 'Dashboard\NationController@index')->name('dashboard.nations');
	});

	Route::group(['prefix' => 'players'], function() {
		Route::get('/', 'Dashboard\PlayerController@index')->name('dashboard.players');
	});

	Route::group(['prefix' => 'stadiums'], function() {
		Route::get('/', 'Dashboard\StadiumController@index')->name('dashboard.stadiums');
	});

	Route::group(['prefix' => 'referees'], function() {
		Route::get('/', 'Dashboard\RefereeController@index')->name('dashboard.referees');
	});

	Route::group(['prefix' => 'groups'], function() {
		Route::get('/', 'Dashboard\GroupController@index')->name('dashboard.groups');
	});

	Route::group(['prefix' => 'stages'], function() {
		Route::get('/', 'Dashboard\StageController@index')->name('dashboard.stages');
	});

	Route::group(['prefix' => 'standingtypes'], function() {
		Route::get('/', 'Dashboard\StandingTypeController@index')->name('dashboard.standingtypes');
	});

	Route::group(['prefix' => 'users'], function() {
		Route::get('/', 'Dashboard\UserController@index')->name('dashboard.users');
	});

	Route::group(['prefix' => 'configs'], function() {
		Route::get('/', 'Dashboard\ConfigController@index')->name('dashboard.configs');
	});


});

// API Route
Route::group(['prefix' => '/api'], function(){


	Route::group(['prefix' => '/v1'], function(){

		Route::resource('/config', 'Rests\ConfigRestController');

	});

});