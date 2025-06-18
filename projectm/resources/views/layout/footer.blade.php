 

  <!-------------------------------- Bootstrap Bundle with Popper------------------------------ -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
  <!-- DataTables JS -->
<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var sidebarMenu = document.getElementById("sidebarMenu");
    var navbarToggler = document.querySelector(".navbar-toggler");

    navbarToggler.addEventListener("click", function() {
      sidebarMenu.classList.toggle("active");
    });
  });

$(document).ready(function() {
  $('.selectbox').select2();
});

    $(document).ready(function() {
  $('#data-tables').DataTable();
});

$(document).ready(function() {
    $('.datepicker').datepicker({
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      autoclose: true
    });
    $('.datepicker1').datepicker({
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      autoclose: true
    });
  });
   
</script>
</body>
</html>
