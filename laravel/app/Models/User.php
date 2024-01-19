<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'photo',
        'file_path',
        'alive',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        // 'remember_token',
    ];
    protected $casts = [
        'created_at' => 'datetime:M-d-Y H:i',
        'updated_at' => 'datetime:M-d-Y H:i',

    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    public function scopeActive($query)
    {
        return $query->where('alive', 1);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}
