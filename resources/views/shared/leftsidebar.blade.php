<!-- ====================== -->
<div id="left">
    <div class="media user-media bg-dark dker">
        <div class="user-media-toggleHover">
            <span class="fa fa-user"></span>
        </div>
        <div class="user-wrapper bg-dark">
            <a class="user-link" href="">
                <img class="media-object img-thumbnail user-img" alt="{{ __('app.avatar')  }}" src="{{ asset('/assets/images/user.gif')  }}">
                <!-- http://lorempixel.com/64/64/technics/ -->
            </a>
            <div class="media-body">

                <h5 class="media-heading">#Fullname#</h5>
                <ul class="list-unstyled user-info">
                    <li> <a href="${pageContext.request.contextPath}/dashboard/user/"${user.username}>#username#</a>  </li>
                    <li> <a href="${pageContext.request.contextPath}/login.html?logout">{{ __('app.logout')  }}</a>  </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- #menu -->
    <ul id="menu" class="bg-blue dker">
        <li class="nav-header">Actions</li>
        <li class="nav-divider"></li>
        <li class="active">
            <a href="{{ route('dashboard')  }}">
                <i class="fa fa-dashboard"></i><span class="link-title">&nbsp;{{ __('app.dashboard')  }} </span>
            </a>
        </li>
        <li>
            <a href="{{ route('dashboard.teams')  }}">
                <i class="fa fa-flag"></i><span class="link-title">&nbsp;{{ __('app.teams')  }} </span>
            </a>
        </li>
        <li>
            <a href="{{ route('dashboard.schedules')  }}">
                <i class="fa fa-calendar"></i><span class="link-title">&nbsp;{{ __('app.schedules')  }} <span class="fa arrow"></span></span>
            </a>
            <ul>
                <li>
                    <a href="{{ route('dashboard.schedules.groups')  }}">&nbsp; {{ __('app.schedules_groups')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.schedules.stages')  }}">&nbsp; {{ __('app.schedules_stages')  }}</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="{{ route('dashboard.standings')  }}">
                <i class="fa fa-sitemap"></i><span class="link-title">&nbsp; {{ __('app.standings')  }} <span class="fa arrow"></span></span>
            </a>

            <ul>
                <li>
                    <a href="{{ route('dashboard.standings.groups')  }}">&nbsp; {{ __('app.standings_groups')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.standings.stages')  }}">&nbsp; {{ __('app.standings_stages')  }}</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="{{ route('dashboard.champion')  }}">
                <i class="fa fa-trophy"></i><span class="link-title"> &nbsp; {{ __('app.champion')  }}</span>
            </a>
        </li>
        <li class="nav-divider"></li>
        <li>
            <a href="{{ route('dashboard.users')  }}">
                <i class="fa fa-users"></i><span class="link-title">&nbsp; {{ __('app.users')  }} </span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fa fa-database"></i><span class="link-title">&nbsp; {{ __('app.category')  }} <span class="fa arrow"></span></span>
            </a>
            <ul>
                <li>
                    <a href="{{ route('dashboard.nations') }}">&nbsp; {{ __('app.nations')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.players') }}">&nbsp; {{ __('app.players')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.stadiums') }}">&nbsp; {{ __('app.stadiums')  }} </a>
                </li>
                <li>
                    <a href="{{ route('dashboard.referees') }}">&nbsp; {{ __('app.referees')  }} </a>
                </li>
                <li>
                    <a href="{{ route('dashboard.groups') }}">&nbsp; {{ __('app.groups')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.stages') }}">&nbsp; {{ __('app.stages')  }}</a>
                </li>
                <li>
                    <a href="{{ route('dashboard.standingtypes') }}">&nbsp; {{ __('app.standings_types')  }}</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="{{ route('dashboard.statistics')  }}"> <i class="fa fa-line-chart"></i><span class="link-title"> &nbsp; {{ __('app.statistics')  }} <span class="fa arrow"></span></span> </a>
            <ul>
                <li> <a href="{{ route('dashboard.statistics.goals')  }}">{{ __('app.statistics_goals')  }}</a>  </li>
                <li> <a href="{{ route('dashboard.statistics.versus')  }}">{{ __('app.statistics_versus')  }}</a>  </li>
            </ul>

        </li>
        <li>
            <a href="{{ route('dashboard.configs')  }}">
                <i class="fa fa-gears"></i><span class="link-title"> &nbsp; {{ __('app.configs')  }}</span>
            </a>
        </li>
    </ul><!-- /#menu -->

</div><!-- /#left -->