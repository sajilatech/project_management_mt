<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
     protected $primaryKey = 'task_id';
     protected $fillable=[
        'task_name',
        'task_descritpion',
        'task_project_id',
        'status',
        'done_by',
        'created_at',
        'updated_at',
    ];
    public function project()
{
    return $this->belongsTo(Project::class, 'task_project_id', 'project_id');
}
}
