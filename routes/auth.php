<?php

use App\Http\Controllers\OturumController;
use Illuminate\Support\Facades\Route;

Route::middleware("guest")->group(function () {
    Route::get("/giris", [OturumController::class, "giris"]);
    Route::post("/giris", [OturumController::class, "girisPost"]);
    Route::get("/kayit", [OturumController::class, "kayit"]);
    Route::post("/kayit", [OturumController::class, "kayitPost"]);
});


Route::get("/cikis", [OturumController::class, "cikis"])->middleware("auth");
