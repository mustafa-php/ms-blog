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

    protected $fillable = ['id', 'kullanici_id', 'baslik', 'icerik', 'slug', 'created_at', 'updated_at'];

    public static function getBySlug($slug)
    {
        return self::where('slug', $slug)->first();
    }

    // Tüm blog yazılarını önbelleğe al
    public static function allCached()
    {
        return Cache::remember('posts.all', 3600, function () {
            return self::all();
        });
    }

    // Belirli bir blog yazısını slug ile önbelleğe al
    public static function findBySlugCached($slug)
    {
        return Cache::remember("post.{$slug}", 3600, function () use ($slug) {
            return self::where('slug', $slug)->first();
        });
    }

    // Cache'i temizlemek için kullanılabilir (örneğin, bir blog yazısı oluşturulduğunda veya güncellendiğinde)
    public static function clearCache()
    {
        Cache::forget('posts.all');
        // Belirli slug'ları unutmak için logic ekleyebilirsiniz
    }
}
