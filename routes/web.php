<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Route;

Route::get('/', [IndexController::class, "index"]);


Route::middleware(['auth', 'blog'])->prefix("/blog")->name("blog.")->group(function () {
    Route::get('/ekle', [BlogController::class, "create"])->name("create");
    Route::post('/ekle', [BlogController::class, "store"])->name("store");
    Route::get('/goster/{blog:slug}', [BlogController::class, "show"])->name("show");
    Route::get('/duzenle/{blog:slug}', [BlogController::class, "edit"])->name("edit");
    Route::post('/duzenle/{blog:slug}', [BlogController::class, "update"])->name("update");
    Route::post('/sil/{blog:slug}', [BlogController::class, "destroy"])->name("destroy");
});


require __DIR__ . "/auth.php";
