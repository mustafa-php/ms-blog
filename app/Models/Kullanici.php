<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Carbon\Carbon;

class Kullanici extends Authenticatable
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'kullanici';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    protected $fillable = ['id', 'isim', 'eposta', 'sifre', 'remember_token', 'created_at', 'updated_at'];

    protected  $hidden = [
        "sifre", "remember_token"
    ];

    public function getAuthPassword()
    {
        return $this->sifre;
    }

    public function gunlukBloglar()
    {
        return $this->belongsTo(Blog::class, 'id', 'kullanici_id')->whereDate('created_at', Carbon::today())
            ->count();
    }
}
