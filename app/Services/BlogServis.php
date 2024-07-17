<?php

namespace App\Services;

use App\Models\Blog;
use App\Repos\BlogRepo;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class BlogServis
{
    public static function veriAlma($blogId = 0)
    {
        $builder = BlogRepo::veriİsleme();
        if ($blogId > 0) {
            return $builder->where("b.id", $blogId)->first();
        }

        return $builder->get();
    }

    public static function ekle($veri)
    {
        try {
            return DB::transaction(function () use ($veri) {

                $blog = self::veriAlma(BlogRepo::ekle($veri)->id);
                CacheServis::blogSet($blog);
            });
        } catch (\Throwable $th) {
            throw new \Exception('Blog kayıt edilemedi : ' . $th->getMessage());
        }
    }

    public static function duzenle(Blog $blog, $veri)
    {
        try {
            return DB::transaction(function () use ($blog, $veri) {
                BlogRepo::duzenle($blog, $veri);
                $upblog = self::veriAlma($blog->id);
                CacheServis::blogUpdate($upblog);
            });
        } catch (\Throwable $th) {
            throw new \Exception('Blog düzenlenemedi : ' . $th->getMessage());
        }
    }

    public static function sil(Blog $blog)
    {
        try {
            return DB::transaction(function () use ($blog) {
                CacheServis::blogDelete($blog->slug);
                BlogRepo::sil($blog);
            });
        } catch (\Throwable $th) {
            throw new \Exception('Blog silinemedi : ' . $th->getMessage());
        }
    }
}
