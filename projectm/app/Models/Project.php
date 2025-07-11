<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
     protected $primaryKey = 'project_id';
     protected $fillable=[
        'project_name',
        'project_descritpion',
        'status',
        'done_by',
        'created_at',
        'updated_at',
    ];
}
