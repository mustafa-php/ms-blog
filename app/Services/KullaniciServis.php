<?php

namespace App\Services;

use App\Models\Kullanici;
use App\Repos\KullaniciRepo;
use Illuminate\Support\Facades\DB;

class KullaniciServis
{
    public static function ekle($veri)
    {
        try {
            return DB::transaction(function () use ($veri) {
                KullaniciRepo::ekle($veri);
            });
        } catch (\Throwable $th) {
            throw new \Exception('Kullanici kayıt edilemedi : ' . $th->getMessage());
        }
    }
}
