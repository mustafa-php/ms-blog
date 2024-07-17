<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class BlogFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'baslik' => 'Deneme başlık',
            'icerik' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente hic deleniti minus fugit, corrupti quo voluptatibus molestiae impedit in expedita unde ad itaque veniam numquam, dolore cum soluta atque tenetur!',
            'kullanici_id' => 1,
        ];
    }
}
