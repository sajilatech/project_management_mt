<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
     protected $fillable=[
      
        'phone',
        'email',
        'login_name',
        'password',
       
        'status',
        'done_by',
        'created_at',
        'updated_at',
    ];
}
