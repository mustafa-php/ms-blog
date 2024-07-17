<?php

namespace App\Http\Controllers;

use App\Services\CacheServis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bloglar = CacheServis::bloglarGet($request);
        return Inertia::render("Index", ["bloglar" => $bloglar]);
    }
}
