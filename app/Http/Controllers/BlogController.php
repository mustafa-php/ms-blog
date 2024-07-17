<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogRequest;
use App\Models\Blog;
use App\Services\BlogServis;
use App\Services\CacheServis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Blog/Ekle");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogRequest $request)
    {

        try {
            $veriler = [
                "kullanici_id" => Auth::id(),
                "baslik" => $request->input("baslik"),
                "icerik" => $request->input("icerik")
            ];

            BlogServis::ekle($veriler);

            return response()->json(["mesaj" => "Başarıyla Eklendi !"], 200);
        } catch (\Throwable $th) {
            return response()->json(["mesaj" => $th->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        $blogServis = CacheServis::blogGet($blog->slug);
        return Inertia::render("Blog/Goster", ["blog" => $blogServis]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render("Blog/Duzenle", ["blog" => $blog]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogRequest $request, Blog $blog)
    {
        try {
            $veriler = [
                "baslik" => $request->input("baslik"),
                "icerik" => $request->input("icerik")
            ];

            BlogServis::duzenle($blog, $veriler);

            return response()->json(["mesaj" => "Başarıyla Güncellendi !"], 200);
        } catch (\Throwable $th) {
            return response()->json(["mesaj" => $th->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        try {
            BlogServis::sil($blog);
            return response()->json(["mesaj" => "Başarıyla Silindi !"], 200);
        } catch (\Throwable $th) {
            return response()->json(["mesaj" => $th->getMessage()], 400);
        }
    }
}
