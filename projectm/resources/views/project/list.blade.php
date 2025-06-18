@include('layout.header')
@include('layout.sidebar')

<main class="col-10 ">
          <div class="page-body">
  
              <div class="page-head">
        <h2 class="float-start">{{$title}}</h2>
                  <div class="float-end"><a class="btns" href="{{ route('project.create')}}"><i class="lni lni-plus"></i>Add New</a></div>
       
              </div>
              <form action="{{route('project.search')}}" method="post" enctype="multipart/form-data">@csrf
              <div class="top-filter">
              <div class="row">
                  <div class="col">
                      <label>Filter by Title</label>
						<input type="text" name='title' class="form-control" >
                        @error('title')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror 
				</div>
                <div class="col">
                    <a href="{{route('project.list')}}"  class="btn btn-default">
                        <i style="font-size:20px" class="fa">&#xf021;</i> Refresh</a>
                </div>
                <div class="col"> <button type="submit" class="btn btn-primary btn-block btn-flat">Search</button></div>
               
                   
                  </div>
              </div>
</form>
              
              <div class="page-content">
              <table  class="table table-striped table-bordered" >
    <thead>
      <tr>
      <th>#</th>
        <th>Title</th>
        <th>Description</th>
          <th>Status</th>
       <th>Action</th>
      </tr>
    </thead>
    <tbody>
    @php $i = 1; @endphp
    @forelse($records as $record)
        <tr>
            <td>{{ $i }}</td>
            <td>{{ $record->project_name }}</td>
            <td>{{ $record->project_descritpion }}
           </td>
            <!-- Status Column -->
            @if($record->status == '1') 
                <td><a href="#" class="btn btn-pending">Active</a></td>
            @elseif($record->status == '0')
                <td><a href="#" class="btn btn-pending">Inactive</a></td>
            @endif

            <!-- Actions Dropdown -->
            <td>
                <div class="dropdown">
                    <button class="btn btn-green dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <!-- Status Change -->
                        @if($record->status == '1')
                            <li>
                                <a class="dropdown-item text-success" href="{{ route('project.status', ['id' => $record->project_id, 'status' => 1]) }}">
                                    Deactivate
                                </a>
                            </li>
                        @elseif($record->status == '0')
                            <li>
                                <a class="dropdown-item text-danger" href="{{ route('project.status', ['id' => $record->project_id, 'status' => 0]) }}">
                                    Activate
                                </a>
                            </li>
                        @endif
                        
                        <!-- Edit -->
                        <li>
                            <a class="dropdown-item" href="{{ route('project.edit', ['id' => $record->project_id]) }}">Edit</a>
                        </li>

                        <!-- Drop/Delete -->
                        <li>
                            <a class="dropdown-item" href="{{ route('project.drop', ['id' => $record->project_id]) }}">Drop</a>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
        @php $i++; @endphp
    @empty
        <tr>
            <td colspan="4" class="text-center">There is no data found</td>
        </tr>
    @endforelse
</tbody>

<!-- Pagination Links -->
@if($records->hasPages())
    <tfoot>
        <tr>
            <td colspan="4">
               {{ $records->links('vendor.pagination.default') }}
            </td>
        </tr>
    </tfoot>
@endif


    </tbody>
  </table>

              </div>
              </div>
      </main>
    </div>@include('layout.footer')