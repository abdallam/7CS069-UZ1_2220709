<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'blog_id',
        'comment',
        'alive',
        'created_at',
        'updated_at',
    ];
    protected $casts = [
        'created_at' => 'datetime:M-d-Y H:i',
        'updated_at' => 'datetime:M-d-Y H:i',

    ];
    public function scopeActive($query)
    {
        return $query->where('alive', 1);
    }
    public function blog()
    {
        return $this->belongsTo(Blog::class)->select(['id','title']);

    }
    public function user()
    {
        return $this->belongsTo(User::class)->select(['id','name','email']);

    }
}
