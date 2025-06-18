@include('layout.header')
@include('layout.sidebar')
 <main class="col-10 ">
          <div class="page-body">
  
              <div class="page-head">
                  <h2 class="float-start">{{$title}}/ Edit</h2>
                  <div class="float-end"><a class="btns back-btn" href="{{ route('project.list')}}"><i class="lni lni-arrow-left"></i>Back</a></div>
       
              </div>
              
              
                        <div class="page-content">
                        <form action="{{route('updateProject')}}" method="post" enctype="multipart/form-data">@csrf
                            <div class="form-box">
                              <div class="row">
                                <div class="col-6">
                                  <div class="mb-3">
                                    <label for="name" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="title" placeholder="Enter Title" name="title"  value="{{ old('title') ? old('title') : $row->project_name }}">
                                  </div>
                                  @error('title')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror 
                     <div class="mb-3">
                                        <label for="name" class="form-label">Description</label>
                                        <textarea class="form-control" id="desc"  name="desc">
                                          {{ old('desc') ? old('desc') : $row->project_descritpion }}
                                        </textarea>
                                        @error('desc')
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror 
                                      </div>
                                
                                    <input type="text" name="id" value="{{$row->project_id }}">
                                  <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>

                                 
                               
      
                            </div>
                      
                      

              </div>
</form>
              </div></div>
      </main>
    </div>@include('layout.footer')