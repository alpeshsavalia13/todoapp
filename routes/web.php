<?php

use Illuminate\Support\Facades\Route;

Route::get('/artisan2', function() {
   \Artisan::call('optimize:clear');
   \Artisan::call('config:cache');
   \Artisan::call('cache:clear');
   \Artisan::call('view:clear');
   \Artisan::call('route:clear');
   \Artisan::call('migrate');
});


Route::get('/{any}', function () {
    return view('app'); // or your Blade file that mounts React
})->where('any', '.*');