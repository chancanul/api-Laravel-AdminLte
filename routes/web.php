<?php

use Illuminate\Support\Facades\Route;
//Rererenciar controladores
use App\Http\Controllers\routeViews;
use App\Http\Controllers\logincontroller;


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
Route::get('/', function () {
    return view('welcome');
});

//Ruta principal para el login
Route::get('/', function(){
    return view('login.index');
})->middleware('singleroute');
Route::get('logout', [logincontroller::class, 'logout'])->middleware('singleroute');

Route::get('usuario', [routeViews::class, 'usuarios']);
Route::post('login', [logincontroller::class, 'index']);
//Validar al usuario
 
