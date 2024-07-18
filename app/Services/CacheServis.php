<?php

namespace App\Services;

use App\Models\Blog;
use App\Repos\BlogRepo;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CacheServis
{


    public static function bloglarGet($request)
    {
        try {
            $blogKeys = Cache::get('blog_keys', []);
            $blogs = [];

            foreach ($blogKeys as $key) {
                $blogs[] = Cache::get($key);
            }
            $perPage = $request->input('perPage', 20);
            $currentPage = $request->input('page', 1);

            $paginator = new LengthAwarePaginator(
                array_slice($blogs, ($currentPage - 1) * $perPage, $perPage),
                count($blogs),
                $perPage,
                $currentPage,
                ['path' => $request->url(), 'query' => $request->query()]
            );

            return $paginator;
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage());
        }
    }

    public static function blogGet($slug)
    {
        try {
            return Cache::get("blog_" . $slug);
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage());
        }
    }

    public static function blogSet($blog)
    {
        $blogKeys = Cache::get('blog_keys', []);
        $blogKeys[] = 'blog_' . $blog->slug;
        Cache::put('blog_keys', $blogKeys);
        $cacheVeri = [
            "id" => $blog->id,
            "baslik" => $blog->baslik,
            "icerik" => $blog->icerik,
            "kategori" => $blog->kategori,
            "yazar" => $blog->yazar,
            "yazar_id" => $blog->kullanici_id,
            "slug" => $blog->slug,
            "olusturma_tarig" => $blog->create_at,
        ];
        Cache::put('blog_' . $blog->slug, $cacheVeri);
    }

    public static function blogUpdate($blog)
    {
        $cacheVeri = [
            "id" => $blog->id,
            "baslik" => $blog->baslik,
            "icerik" => $blog->icerik,
            "kategori" => $blog->kategori,
            "yazar" => $blog->yazar,
            "yazar_id" => $blog->kullanici_id,
            "slug" => $blog->slug,
            "olusturma_tarih" => $blog->create_at,
        ];
        Cache::put('blog_' . $blog->slug, $cacheVeri);
    }

    public static function blogDelete($slug)
    {
        $blogKey = "blog_" . $slug;
        Cache::forget($blogKey);

        $blogKeys = Cache::get('blog_keys', []);
        if (($key = array_search($blogKey, $blogKeys)) !== false) {
            unset($blogKeys[$key]);
        }

        Cache::put('blog_keys', $blogKeys);
    }
}
