<?php

namespace App\Http\Middleware;

use App\Models\Blog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlogMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $kullanici = $request->user();
        $gunlukBloglar = $kullanici->gunlukBloglar();
        $slug = ($request->route('blog') ? $request->route('blog')->slug : "-");
        $routes1 = ['blog.create', 'blog.store'];
        $routes2 = ['blog.edit', 'blog.update', 'blog.destroy'];

        if (in_array($request->route()->getName(), $routes1)  and ($gunlukBloglar >= 3)) {
            return response()->json(["message" => "Günlük Limitinizi Bitirdiniz !"], 401);
        }

        if (in_array($request->route()->getName(), $routes2) and (Blog::getBySlug($slug)->kullanici_id !== $kullanici->id)) {
            abort(401);
        }

        return $next($request);
    }
}
