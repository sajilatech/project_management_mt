<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LoginContr extends Controller
{
     protected $title = 'Login';

     function index(){
        $data['title']=$this->title;
        return view('login/login', $data);
    }

    function authenticate(Request $request){
        $validation_array = [
            'username' => 'required',
            'password' => 'required'
           
        ];
    
        $res = $request->validate($validation_array);
       
        $record = Admin::where('status', 1)
        ->where('login_name', $request->username)
        ->first();
        if ($record && Hash::check($request->password, $record->password)) {
            if ($record) {
                session([
                    'username' => $record->admin_name,
                    'email' => $record->email,
                    'admin_type'=>$record->usertype,
                    'admin_id' => $record->admin_id,
                ]);
               return redirect()->route('dashboard')->with('success_msg', 'Logged successfully.');
                return response()->json(['message' => 'Login successful', 'user' => $record]);
            } else {
                return redirect()->back()->with('error_msg', 'Invalid credentials');
        
            }
   
         
         } else {
            
             return redirect()->back()->with('error_msg', 'Invalid User.');
         }
    }

  

   

    function dashboard(){
        $data['title']='Admin: Dashboard';
        $userName = session('username');
        $admin_type = session('admin_type');
        $data['login_name']=$userName;
        $data['admin_type']=$admin_type;
        return view('dashboard/dashboard', $data);
    }

    function logout(Request $request){
        $request->session()->invalidate();
        return redirect()->route('login')->with('success_msg', 'Logged Out successfully.');
    }
}
