<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'title',
        'body_text',
        'photo',
        'file_path',
        'alive',
        'created_at',
        'updated_at',
    ];
    protected $casts = [
        'created_at' => 'datetime:M-d-Y H:i',
        'updated_at' => 'datetime:M-d-Y H:i',

    ];
    public function getPhotoAttribute($value)
    {
        return 'http://localhost:8000/storage/blogs/'.$value;
    }
    public function scopeActive($query)
    {
        return $query->where('alive', 1);
    }
    public function user()
    {
        return $this->belongsTo(User::class)->select(['id','name','email','photo']);

    }
}
