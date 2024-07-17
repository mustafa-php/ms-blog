<?php

namespace App\Repos;

use App\Models\Kullanici;

class KullaniciRepo
{

    public static function ekle($veri)
    {
        $kullanici = Kullanici::create($veri);
        return $kullanici;
    }

}
