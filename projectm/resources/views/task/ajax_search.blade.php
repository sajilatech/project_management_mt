  <table  class="table table-striped table-bordered" >
    <thead>
      <tr>
      <th>#</th>
        <th>Title</th>
       <th>Project</th>
          <th>Status</th>
       <th>Action</th>
      </tr>
    </thead>
    <tbody>
    @php $i = 1; @endphp
    @forelse($records as $record)
        <tr>
            <td>{{ $i }}</td>
            <td>{{ $record->task_name }}</td>
           <td>{{$record->project->project_name }}</td>
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
                                <a class="dropdown-item" href="{{ route('task.status', ['id' => $record->task_id, 'status' => 1]) }}">
                                    Deactivate
                                </a>
                            </li>
                        @elseif($record->status == '0')
                            <li>
                                <a class="dropdown-item" href="{{ route('task.status', ['id' => $record->task_id, 'status' => 0]) }}">
                                    Activate
                                </a>
                            </li>
                        @endif
                        
                        <!-- Edit -->
                        <li>
                            <a class="dropdown-item" href="{{ route('task.edit', ['id' => $record->task_id]) }}">Edit</a>
                        </li>

                        <!-- Drop/Delete -->
                        <li>
                            <a class="dropdown-item" href="{{ route('task.drop', ['id' => $record->task_id]) }}">Drop</a>
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