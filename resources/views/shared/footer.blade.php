<div class="modal fade system-modal" id="systemModal" tabindex="-1" role="dialog" aria-labelledby="systemModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="systemModalTitle">Modal title</h4>
            </div>
            <div class="modal-body" id="systemModalContent" ></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-close"></i>{{ __('app.close')  }}</button>
            </div>
        </div>
    </div>
</div>

<footer class="Footer bg-dark dker">
    <p>{{ date('Y')  }} &copy; {{ __('app.name')  }}</p>
</footer>
<!-- /#footer -->
<div class="loading" id="loading" style="display: none;" ><i class="fa fa-cog fa-spin fa-4x fa-fw"></i></div>
<!-- Others JQuery, Javascript Libs -->
<script src="{{ asset('/assets/libs/moment-2.13.0/min/moment.min.js')  }}"></script>
<script src="{{ asset('/assets/libs/screenfull.js-3.0.0/screenfull.min.js')  }}"></script>
<script src="{{ asset('/assets/libs/DataTables-1.10.11/js/jquery.dataTables.min.js')  }}"></script>
<script src="{{ asset('/assets/libs/DataTables-1.10.11/js/dataTables.bootstrap.min.js')  }}"></script>
{{-- <script src="{{ asset('/assets/libs/tablesorter-2.24.6/js/jquery.tablesorter.min.js')  }}"></script> --}}
<script src="{{ asset('/assets/libs/fullcalendar-2.6.1/fullcalendar.min.js')  }}"></script>
<script src="{{ asset('/assets/libs/fullcalendar-2.6.1/lang/vi.js')  }}"></script>

<!--Bootstrap -->
<script src="{{ asset('/assets/libs/bootstrap-3.3.6/js/bootstrap.min.js')  }}"></script>
<script src="{{ asset('/assets/libs/bootstrap-dialog/js/bootstrap-dialog.min.js')  }}"></script>
<script src="{{ asset('/assets/libs/bootstrap-notify-3.1.3/js/bootstrap-notify.min.js')  }}"></script>



<!-- MetisMenu -->
<script src="{{ asset('/assets/libs/metisMenu-2.4.2/metisMenu.min.js')  }}"></script>

<!-- JQuery Validation -->
<script src="{{ asset('/assets/libs/jquery-validation-1.15.0/jquery.validate.min.js')  }}"></script>
<script src="{{ asset('/assets/libs/jquery-validation-1.15.0/additional-methods.min.js')  }}"></script>

<!-- Metis core scripts -->
<script src="{{ asset('/assets/js/core.min.js')  }}"></script>

<!-- Metis demo scripts -->
<script src="{{ asset('/assets/js/app.js')  }}"></script>

<script src="{{ asset('/assets/js/main.js')  }}"></script>
</body>
</html>