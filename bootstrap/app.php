<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Session\Middleware\StartSession;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Append global middleware
        //$middleware->append(\App\Http\Middleware\Authenticate::class);

        // Alias route-specific middleware
        /*$middleware->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,
        ]);*/

        $middleware->alias([
            'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
            'sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // Define groups like 'web'
        $middleware->group('api', [
             \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            StartSession::class, // <- critical for Auth::user()
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            //'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        $middleware->statefulApi();
        $middleware->throttleApi();
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
