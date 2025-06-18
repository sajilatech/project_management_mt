<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginContr;
use App\Http\Controllers\ProjectContr;
use App\Http\Controllers\TaskContr;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('login/login');
});

Route::get('/login', [LoginContr::class, 'index'])->name('login');
Route::post('/authenticate', [LoginContr::class, 'authenticate'])->name('authenticate');
Route::post('/forgot_password', [LoginContr::class, 'forgot_password'])->name('forgot_password');
Route::get('/logout', [LoginContr::class, 'logout'])->name('logout');
Route::get('/dashboard', [LoginContr::class, 'dashboard'])->name('dashboard');
Route::get('/change_password', [LoginContr::class, 'change_password'])->name('change_password');

Route::get('/projectcreate', [ProjectContr::class, 'create'])->name('project.create');
 Route::Post('/insertProject', [ProjectContr::class, 'add'])->name('insertProject');
 Route::get('/projectedit/{id}', [ProjectContr::class, 'edit'])->name('project.edit');
  Route::Post('/updateProject', [ProjectContr::class, 'update'])->name('updateProject');
 Route::get('/projectlist', [ProjectContr::class, 'index'])->name('project.list');
 Route::get('/projectstatus/{id}/{status}', [ProjectContr::class, 'status'])->name('project.status');
 Route::get('/projectdrop/{id}', [ProjectContr::class, 'drop'])->name('project.drop');
 Route::post('/projectsearch', [ProjectContr::class, 'search'])->name('project.search');

 Route::get('/taskcreate', [TaskContr::class, 'create'])->name('task.create');
 Route::Post('/insertTask', [TaskContr::class, 'add'])->name('insertTask');
 Route::get('/taskedit/{id}', [TaskContr::class, 'edit'])->name('task.edit');
  Route::Post('/updateTask', [TaskContr::class, 'update'])->name('updateTask');
 Route::get('/tasklist', [TaskContr::class, 'index'])->name('task.list');
 Route::get('/taskstatus/{id}/{status}', [TaskContr::class, 'status'])->name('task.status');
 Route::get('/taskdrop/{id}', [TaskContr::class, 'drop'])->name('task.drop');
 //Route::post('/tasksearch/{id}', [TaskContr::class, 'search'])->name('task.search');
Route::post('/tasksearch', [TaskContr::class, 'search'])->name('task.search');
 