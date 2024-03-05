<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            //return route('login');

            die(json_encode([
                'error' => 1,
                'code' => 401,
                'message' => "Unauthorized access",
                'data' => null
            ], 200));
        }
    }

}
