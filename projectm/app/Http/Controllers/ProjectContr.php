<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectContr extends Controller
{

     protected $perPage = 2;
    protected $title='Projects';
    protected $userName;
   

     public function __construct()
    {
        $this->userName = session('username');
       
     
    }
     function index(){
       
        $records=Project::paginate($this->perPage);
      
        $data['title']=$this->title;
        $data['login_name']=$this->userName;
       
        $data['records']=$records;
        return view('project/list', $data);
    }

     function create(){
        $data['title']=$this->title;
        $data['login_name']=$this->userName;
      
        return view('project/create', $data);
    }

    function add(Request $request){
         $data['title']=$this->title;
        $validation_array = [
            'title' => 'required',
            'desc' => 'required',
           
        ];
    
        $res = $request->validate($validation_array);
      

            $input_fields = [
                'project_name' => $request->input('title'),
                'project_descritpion' => $request->input('desc'),
              
                ];
               
           Project::create($input_fields);
    
            return redirect()->route('project.list')->with('success', 'Project created successfully.');

    }

     function edit($id){
         $data['title']=$this->title;
           $data['login_name']=$this->userName;
        $row=Project::find($id);
        $data['row']=$row;
        return view('project/edit', $data);
    }

     function update(Request $request){
        $id=$request->input('project_id');
        $validation_array = [
            'title' => 'required',
            'desc' => 'required',
           
        ];
    
        $res = $request->validate($validation_array);
               $input_fields = [
                    'project_name' => $request->input('title'),
                    'project_descritpion' => $request->input('desc'),
                   
                ];
                $model=Project::find($id);
                if ($model) {
                    try {
                        $model->fill($input_fields);
                        $model->save();
                        return redirect()->route('project.list')
                            ->with('success', 'Updated successfully.');
                    } catch (\Exception $e) {
                        return redirect()->route('project.edit', ['id' => $id])
                            ->with('error', 'Failed to update record. Please try again.');
                    }
                } else {
                    return redirect()->route('project.edit', ['id' => $id])
                        ->with('error', 'Problem finding record.');
                }
              
    }
    function status($id, $status){
        $model=Project::find($id);
        if($status=='1'){
            $update_status=0;
        }
        else{
            $update_status=1;
        }
        $input_fields=array('status'=>$update_status);
        $model->fill($input_fields);
        $model->save();
            return redirect()->route('project.list')  ->with('success', 'Status Updated successfully.');
    }

    function drop($id){
        $r = Project::find($id);
        $r->delete();
            return redirect()->route('project.list')  ->with('success', 'Status Updated successfully.');
    }
}
