<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // or your Blade file that mounts React
})->where('any', '.*');