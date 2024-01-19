<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users/create', [Users::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::post('/users/login', [Users::class, 'login'])
    ->middleware('guest')
    ->name('login');

Route::middleware(['auth:sanctum'])->group(function () {

    Route::controller(Users::class)->group(function () {
        Route::post('/user/{id}', 'show');
        Route::get('/users', 'get');
        Route::post('/user/update/{id}', 'update');
        Route::post('/user/delete/{id}', 'delete');

        Route::post('/users/logout', 'logout');
    });
});
