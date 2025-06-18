@include('layout.header')
@include('layout.sidebar')

<style>
  .d-flex {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.selectbox {
  min-width: 200px; /* Set appropriate width to avoid collapse */
}
</style>
 <main class="col-10 ">
          <div class="page-body">
  
              <div class="page-head">
                  <h2 class="float-start"> {{$title}} Add</h2>
                  <div class="float-end"><a class="btns back-btn" href="{{ route('project.list')}}"><i class="lni lni-arrow-left"></i>Back</a></div>
       
              </div>
              
                        <div class="page-content">
                        <form action="{{route('insertProject')}}" method="post" enctype="multipart/form-data">@csrf
                            <div class="form-box">
                              <div class="row">
                                <div class="col-6">


                                <div class="mb-3">
                                  <label for="title1" class="form-label">Title </label>
                                 
                                      <input type="text" class="form-control" id="title" placeholder="Enter English" name="title" value="{{ old('title') }}">
                                                  @error('title')
                                                      <span class="text-danger">{{ $message }}</span>
                                                  @enderror 
                                   
                                
                              </div>
                                   
                                      <div class="mb-3">
                                        <label for="name" class="form-label">Description</label>
                                        <textarea class="form-control" id="desc"  name="desc"></textarea>
                                        @error('desc')
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror 
                                      </div>
                                     
                                     
                          
                            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>           
</form>  
              </div></div>
      </main>
    </div>
    @include('layout.footer')
   