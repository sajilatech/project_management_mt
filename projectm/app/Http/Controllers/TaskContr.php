<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;
class TaskContr extends Controller
{

      protected $perPage = 5;
    protected $title='Tasks';
    protected $userName;
      function index(){
       
        $records=Task::paginate($this->perPage);
      
        $data['title']=$this->title;
        $data['login_name']=$this->userName;
        $projects=Project::get();
         $data['project']=$projects;
        $data['records']=$records;
        return view('task/list', $data);
    }

     function create(){
        $data['title']=$this->title;
        $data['login_name']=$this->userName;
        $projects=Project::get();
         $data['project']=$projects;
        return view('task/create', $data);
    }

    function add(Request $request){
         $data['title']=$this->title;
        $validation_array = [
            'title' => 'required',
            'project'=>'required',
            'desc' => 'required',
           
        ];
    
        $res = $request->validate($validation_array);
      

            $input_fields = [
                'task_project_id'=>$request->input('project'),
                'task_name' => $request->input('title'),
                'task_descritpion' => $request->input('desc'),
              
                ];
               
           Task::create($input_fields);
    
            return redirect()->route('task.list')->with('success', 'Project created successfully.');

    }
     function status($id, $status){
        $model=Task::find($id);
        if($status=='1'){
            $update_status=0;
        }
        else{
            $update_status=1;
        }
        $input_fields=array('status'=>$update_status);
        $model->fill($input_fields);
        $model->save();
            return redirect()->route('task.list')  ->with('success', 'Status Updated successfully.');
    }

    function drop($id){
        $r = Task::find($id);
        $r->delete();
            return redirect()->route('task.list')  ->with('success', 'Status Updated successfully.');
    }

   public function search(Request $request)
{
    try {
        $project_id = $request->input('project');

      
        if (empty($project_id) || !is_numeric($project_id)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid project ID',
            ], 400);
        }

       
        $records = Task::where('task_project_id', $project_id)
            ->get();

       
        $html = view('task.ajax_search', [
            'records' => $records,
        ])->render();

        return response()->json([
            'success' => true,
            'html' => $html,
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}



}
