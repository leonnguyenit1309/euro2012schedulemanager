<!-- .navbar -->
<nav class="navbar navbar-inverse navbar-static-top">
    <div class="container-fluid">

        <!-- Brand and toggle get grouped for better mobile display -->
        <header class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="{{ route('home')  }}" class="navbar-brand logo">
                <img src="{{ asset('/assets/images/logo.png')  }}" alt="">
            </a>
        </header>
        <div class="topnav">
            <div class="btn-group">
                <a data-placement="bottom" data-original-title="{{ __('app.fullscreen')  }}" data-toggle="tooltip" class="btn btn-default btn-sm" id="toggleFullScreen">
                    <i class="glyphicon glyphicon-fullscreen"></i>
                </a>
            </div>
            <div class="btn-group">
                <a data-placement="bottom" data-original-title="{{ __('app.home')  }}" data-toggle="tooltip" class="btn btn-default btn-sm">
                    <i class="fa fa-home"></i>
                </a>
                <a data-placement="bottom" data-original-title="{{ __('app.champion')  }}" href="#" data-toggle="tooltip" class="btn btn-default btn-sm">
                    <i class="fa fa-trophy"></i>
                </a>
                <a data-toggle="modal" data-original-title="{{ __('app.help')  }}" data-placement="bottom" class="btn btn-default btn-sm" href="#helpModal">
                    <i class="fa fa-question"></i>
                </a>
            </div>
            <div class="btn-group">
                <a href="{{ route('logout')  }}" data-toggle="tooltip" data-original-title="{{ __('app.logout')  }}" data-placement="bottom" class="btn btn-metis-1 btn-sm">
                    <i class="fa fa-power-off"></i>
                </a>
            </div>
            <div class="btn-group">
                <a data-placement="bottom" data-original-title="{{ __('app.show_hide_menu')  }}" data-toggle="tooltip" class="btn btn-primary btn-sm toggle-left" id="menu-toggle">
                    <i class="fa fa-bars"></i>
                </a>
            </div>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">

            <!-- .nav -->
            <ul class="nav navbar-nav">
                <li>
                    <a href="{{ route('dashboard.teams')  }}">{{ __('app.teams')  }}</a>

                </li>
                <li>
                    <a href="{{ route('dashboard.schedules')  }}">{{ __('app.schedules')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.standings')  }}">{{ __('app.standings')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.champion')  }}">{{  __('app.champion') }}</a>
                </li>
            </ul><!-- /.nav -->
        </div>
    </div><!-- /.container-fluid -->
</nav><!-- /.navbar -->

<!-- =========================== -->

<header class="head">
    <div class="search-bar">
        <form class="main-search" action="">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="{{ __('app.search')  }}...">
                <span class="input-group-btn">
								<button class="btn btn-primary btn-sm text-muted" type="button">
									<i class="fa fa-search"></i>
								</button>
							</span>
            </div>
        </form><!-- /.main-search -->
    </div><!-- /.search-bar -->
    <div class="main-bar">
        </div><!-- /.main-bar -->
</header><!-- /.head -->