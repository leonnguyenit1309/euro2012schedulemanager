@extends('layouts.dashboard')
@section('content')
    <!-- Begin Main Content Block -->



    <div class="row">

        <!-- .col-lg-6 -->
        <div class="col-lg-8">
            <div class="box primary">
                <header>
                    <div class="icons">
                        <i class="fa fa-futbol-o"></i>
                    </div>
                    <h5>{{ __('app.lastest_matches', ['num_match' => 5])  }}</h5>
                    <div class="toolbar"  >

                        <nav style="padding: 8px;">
                            <a href="javascript:;" class="btn btn-default btn-xs collapse-box">
                                <i class="fa fa-minus"></i>
                            </a>
                            <a href="javascript:;" class="btn btn-default btn-xs full-box">
                                <i class="fa fa-expand"></i>
                            </a>
                            <a href="javascript:;" class="btn btn-danger btn-xs close-box">
                                <i class="fa fa-times"></i>
                            </a>
                        </nav>
                    </div>
                </header>
                <div id="top-5-matches-sortableTable" class="body collapse in">
                    <table class="table table-bordered sortableTable responsive-table top-5-matches-sortableTable">
                        <thead>
                        <tr>
                            <th> #
                                <i class="fa sort"></i>
                            </th>
                            <th>{{ __('app.match') }}
                                <i class="fa sort"></i>
                            </th>
                            <th> {{ __('app.time')  }}
                                <i class="fa sort"></i>
                            </th>
                            <th> {{ __('app.stadiums')  }}
                                <i class="fa sort"></i>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td class="top-5-matches-match" ><a href="#">POLAND <img src="{{ asset('/assets/images/flags/18x18/POL.png')  }}"></a><span class="vs" >vs</span><a href="#"><img src="{{ asset('/assets/images/flags/18x18/POR.png')  }}">PORTAQUAY</a></td>
                            <td>20/04/2012 20:30</td>
                            <td>Old Tra FOX</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td class="top-5-matches-match" ><a href="#">POLAND <img src="{{ asset('/assets/images/flags/18x18/POL.png')  }}"></a><span class="vs" >vs</span><a href="#"><img src="{{ asset('/assets/images/flags/18x18/POR.png')  }}">PORTAQUAY</a></td>
                            <td>20/04/2012 20:30</td>
                            <td>Old Tra FOX</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td class="top-5-matches-match" ><a href="#">POLAND <img src="{{ asset('/assets/images/flags/18x18/POL.png')  }}"></a><span class="vs" >vs</span><a href="#"><img src="{{ asset('/assets/images/flags/18x18/POR.png')  }}">PORTAQUAY</a></td>
                            <td>20/04/2012 20:30</td>
                            <td>Old Tra FOX</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td class="top-5-matches-match" ><a href="#">POLAND <img src="{{ asset('/assets/images/flags/18x18/POL.png')  }}"></a><span class="vs" >vs</span><a href="#"><img src="{{ asset('/assets/images/flags/18x18/POR.png')  }}">PORTAQUAY</a></td>
                            <td>20/04/2012 20:30</td>
                            <td>Old Tra FOX</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td class="top-5-matches-match" ><a href="#">POLAND <img src="{{ asset('/assets/images/flags/18x18/POL.png')  }}"></a><span class="vs" >vs</span><a href="#"><img src="{{ asset('/assets/images/flags/18x18/POR.png')  }}">PORTAQUAY</a></td>
                            <td>20/04/2012 20:30</td>
                            <td>Old Tra FOX</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div><!-- /.col-lg-6 -->

        <!-- .col-lg-6 -->
        <div class="col-lg-4">
            <div class="box primary">
                <header>
                    <div class="icons">
                        <i class="fa fa-flag"></i>
                    </div>
                    <h5>Top 5 Đội Bóng</h5>
                    <div class="toolbar"  >

                        <nav style="padding: 8px;">
                            <a href="javascript:;" class="btn btn-default btn-xs collapse-box">
                                <i class="fa fa-minus"></i>
                            </a>
                            <a href="javascript:;" class="btn btn-default btn-xs full-box">
                                <i class="fa fa-expand"></i>
                            </a>
                            <a href="javascript:;" class="btn btn-danger btn-xs close-box">
                                <i class="fa fa-times"></i>
                            </a>
                        </nav>
                    </div>
                </header>
                <div id="top-5-goals-sortableTable" class="body collapse in">
                    <table class="table table-bordered sortableTable responsive-table top-5-goals-sortableTable">
                        <thead>
                        <tr>
                            <th>#
                                <i class="fa sort"></i>
                            </th>
                            <th>Tên Đội Bóng
                                <i class="fa sort"></i>
                            </th>
                            <th>Số Bàn Thắng
                                <i class="fa sort"></i>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td><a href="">Polland <img src="{{ asset('/assets/images/flags/18x18/POL.png')  }}" /></a> </td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><a href="">ALB <img src="{{ asset('/assets/images/flags/18x18/ALB.png')  }}" /></a> </td>
                            <td>55</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><a href="">Belarut <img src="{{ asset('/assets/images/flags/18x18/BEL.png')  }}" /></a> </td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><a href="">Armani <img src="{{ asset('/assets/images/flags/18x18/ALB.png')  }}" /></a> </td>
                            <td>70</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><a href="">CRO <img src="{{ asset('/assets/images/flags/18x18/CRO.png')  }}" /></a> </td>
                            <td>80</td>
                        </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div><!-- /.col-lg-6 -->

    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="box primary">
                <header>
                    <div class="icons">
                        <i class="fa fa-flag"></i>
                    </div>
                    <h5>{{ __('app.schedules')  }}</h5>
                    <div class="toolbar">
                        <nav style="padding: 8px;">
                            <a href="#" class="btn btn-info btn-xs btn-grad btn-rect">
                                <i class="fa fa-plus"></i>&nbsp;{{ __('app.add')  }} {{ __('app.schedules')  }}
                            </a>
                            <a href="javascript:;" class="btn btn-default btn-xs collapse-box">
                                <i class="fa fa-minus"></i>
                            </a>
                            <a href="javascript:;" class="btn btn-default btn-xs full-box">
                                <i class="fa fa-expand"></i>
                            </a>
                            <a href="javascript:;" class="btn btn-danger btn-xs close-box">
                                <i class="fa fa-times"></i>
                            </a>
                        </nav>
                    </div><!-- /.toolbar -->
                </header>
                <div id="calendar_content" class="body">
                    <div id="calendar-dashboard"></div>
                </div>
            </div>
        </div>
    </div>


    <!-- .\End Main Content Block -->
@endsection