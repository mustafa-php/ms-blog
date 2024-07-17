<?php

namespace App\Repos;

use App\Models\Blog;

class BlogRepo
{
    public static function veriİsleme()
    {
        return Blog::from("blog as b")
            ->select("b.*", "k.isim as yazar")
            ->leftJoin("kullanici as k", "b.kullanici_id", "=", "k.id");
    }

    public static function ekle($veri)
    {
        $blog = Blog::create($veri);
        return $blog;
    }


    public static function duzenle(Blog $blog, $veri)
    {
        $guncelBlog = $blog->update($veri);
        return $guncelBlog;
    }

    public static function sil(Blog $blog)
    {
        return $blog->delete();
    }
}
