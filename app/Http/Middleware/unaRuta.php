<?php
    namespace App\Http\Middleware;
    use Closure;

    class unaRuta {
        public function handle($request, Closure $next) {
            $response = $next($request);
            if(!$response->headers->has('X-Frame-Options')) {
                $response->headers->set('X-Frame-Options', false);
            }
            return $response;
        }
    }