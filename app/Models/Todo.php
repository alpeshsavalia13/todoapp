<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'completed', 'user_id', 'date', 'sort_order'];

    public function getCreatedAtAttribute($value) {
        return date("Y-m-d H:i:s", strtotime($value));
    }

    public function setDateAttribute($value) {
        if (!empty($value)) {
            $this->attributes['date'] = date("Y-m-d", strtotime($value));
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
