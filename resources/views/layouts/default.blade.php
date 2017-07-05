@include('shared.header')
<div class="bg-dark dk" id="wrap">
    <div id="top">
        @include('shared.top')
    </div>
    <!-- /#top -->

    @include('shared.leftsidebar')

    <div id="content">
        <div class="outer">
            <div class="inner bg-light lter" id="groups-content" >

                <!-- Toolbar Icons -->
                @include('shared.toolbars-icons')
                <!-- End Toolbar Icons -->

                @yield('content')

            </div>
        </div>
    </div>

</div>
<!-- /#wrap -->

@include('shared.footer')