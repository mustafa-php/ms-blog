<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;


class Blog extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'blog';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    protected $fillable = ['id', 'kullanici_id', 'baslik', 'icerik', 'kategori', 'slug', 'created_at', 'updated_at'];

    public static function getBySlug($slug)
    {
        return self::where('slug', $slug)->first();
    }

    public static function allCached()
    {
        return Cache::remember('posts.all', 3600, function () {
            return self::all();
        });
    }

    public static function findBySlugCached($slug)
    {
        return Cache::remember("post.{$slug}", 3600, function () use ($slug) {
            return self::where('slug', $slug)->first();
        });
    }

    public static function clearCache()
    {
        Cache::forget('posts.all');
    }
}
