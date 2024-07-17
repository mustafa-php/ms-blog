<?php

namespace App\Http\Controllers;

use App\Http\Requests\KullaniciRequest;
use App\Models\Kullanici;
use App\Services\BlogServis;
use App\Services\KullaniciServis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class OturumController extends Controller
{

    public function giris()
    {
        return Inertia::render("Giris");
    }

    public function girisPost(Request $request)
    {
        $credentials = [
            'eposta' => $request->input('eposta'),
            'password' => $request->input('sifre')
        ];

        $remember = $request->input("remember");

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            return response()->json(["message" => "Giriş Başarılı."], 200);
        } else {
            return response()->json(["message" => "Eposta ve Şifre Uyuşmuyor !"], 400);
        }
    }


    public function kayit()
    {
        return Inertia::render("Kayit");
    }

    public function kayitPost(KullaniciRequest $request)
    {
        $veriler = [
            "isim" => $request->input("isim"),
            "eposta" => $request->input("eposta"),
            "sifre" => Hash::make($request->input("sifre"))
        ];

        try {
            KullaniciServis::ekle($veriler);
            return response()->json(["mesaj" => "Başarıyla Eklendi !"], 201);
        } catch (\Throwable $th) {
            return response()->json(["mesaj" => $th->getMessage()], 400);
        }
    }


    public function cikis(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
