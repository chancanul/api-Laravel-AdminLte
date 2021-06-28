<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Se debe llamar al controllador
use App\Http\Controllers\controllerusuario;
use App\Http\Controllers\controllerroles;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/actUser', controllerusuario::class);
Route::post('/validar', [controllerusuario::class, 'validar']);
Route::apiResource('/actRoles', controllerroles::class);