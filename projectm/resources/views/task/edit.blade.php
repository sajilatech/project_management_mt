@include('layout.header')
@include('layout.sidebar')
 <main class="col-10 ">
          <div class="page-body">
  
              <div class="page-head">
                  <h2 class="float-start">{{$title}}/ Add</h2>
                  <div class="float-end"><a class="btns back-btn" href="{{ route('task.list')}}"><i class="lni lni-arrow-left"></i>Back</a></div>
       
              </div>
              
              
                        <div class="page-content">
                        <form action="{{route('updateTask')}}" method="post" enctype="multipart/form-data">@csrf
                            <div class="form-box">
                              <div class="row">
                                <div class="col-6">
                                  <div class="mb-3">
                                    <label for="name" class="form-label">Titlte</label>
                                    <input type="text" class="form-control" id="title" placeholder="Enter Title" name="title"  value="{{ old('title') ? old('title') : $row->task_name }}">
                                  </div>
                                  @error('title')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror 
                    
                                
                                    <input type="hidden" name="id" value="{{$row->id}}">
                                  <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>

                                 
                               
      
                            </div>
                      
                      

              </div>
</form>
              </div></div>
      </main>
    </div>@include('layout.footer')