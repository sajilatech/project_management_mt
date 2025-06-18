<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Machine:Test {{$title }}</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome Icons -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
 <!-- DataTables CSS -->
  <link href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" rel="stylesheet">

  <!-- Custom styles -->
  <link href="{{ asset('assets/css/style.css')}}" rel="stylesheet">
  <link href="{{ asset('assets/css/icon.css')}}" rel="stylesheet">
  <link href="{{ asset('assets/css/pagination.css')}}" rel="stylesheet">
     
      <link href="{{ asset('assets/css/admin_style.css')}}" rel="stylesheet">
      <link rel="stylesheet" href="{{asset('plugins/datepicker/datepicker3.css')}}">
     
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
  <style>
    /* Style for the select box */
.selectbox {
    width: 150px;              
    padding: 10px;              
    font-size: 14px;            
    color: #333;                
    background-color: #f8f9fa; 
    border: 1px solid #ccc;     
    border-radius: 4px;        
    appearance: none;           
    cursor: pointer;           
    outline: none;   
    float:left;          
}

.selectbox:hover {
    border-color: #007bff;     
}

.selectbox option {
    padding: 10px;             
    font-size: 14px;           
    color: #333;               
    background-color: #fff;     
}

.selectbox:focus {
    border-color: #007bff;      
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
}

.selectbox option[selected] {
    background-color: #007bff;  
    color: white;               
}

    </style>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="{{asset('assets/img/logo.png')}}" alt="Oryx" height="40px;"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">

        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown my-acc">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fas fa-user"></i> {{ $login_name}}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <!--<li><a class="dropdown-item" href="#">Profile</a></li>-->
              <li><a class="dropdown-item" href="{{ route('change_password')}}">Settings</a></li>
              
              <li><a class="dropdown-item" href="{{ route('logout')}}">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
