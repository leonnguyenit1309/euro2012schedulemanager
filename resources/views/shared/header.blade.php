<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="UTF-8" />
    <title>@isset($pageTitle){{ $pageTitle  }} &raquo;@endisset{{ __('app.name')  }}</title>

    <!--IE Compatibility modes-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!--Mobile first-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Bootstrap -->
    <link rel="stylesheet" href="{{ asset('/assets/libs/bootstrap-3.3.6/css/bootstrap.min.css')  }}" />
    <link rel="stylesheet" href="{{ asset('/assets/libs/bootstrap-3.3.6/css/bootstrap-theme.min.css')  }}" />
    <link rel="stylesheet" href="{{ asset('/assets/libs/bootstrap-dialog/css/bootstrap-dialog.min.css')  }}" />
    <link rel="stylesheet" href="{{ asset('/assets/libs/animate.css/animate.min.css')  }}">
    <link rel="stylesheet" href="{{ asset('/assets/libs/fullcalendar-2.6.1/fullcalendar.min.css')  }}">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('/assets/libs/font-awesome-4.6.1/css/font-awesome.min.css')  }}">

    <!-- Metis core stylesheet -->
    <link rel="stylesheet" href="{{ asset('/assets/css/loader.css')  }}">
    <link rel="stylesheet" href="{{ asset('/assets/css/main.min.css')  }}">

    <!-- OTHERS CSS LIBS -->
    <!-- metisMenu stylesheet -->
    <link rel="stylesheet" href="{{ asset('/assets/libs/metisMenu-2.4.2/metisMenu.min.css')  }}">

    <link rel="stylesheet" href="{{ asset('/assets/libs/DataTables-1.10.11/css/dataTables.bootstrap.min.css')  }}">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->

    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->

    <!--[if lt IE 9]>
    <script src="{{ asset('/assets/libs/html5shiv/html5shiv.js')  }}"></script>
    <script src="{{ asset('/assets/libs/respond/respond.min.js')  }}"></script>
    <![endif]-->


    <link rel="stylesheet" href="{{ asset('/assets/css/theme.css')  }}">

    <!--Modernizr-->
    <script src="{{ asset('/assets/libs/modernizr/modernizr.min.js')  }}"></script>

    <script type="text/javascript">
        var baseurl = "${pageContext.request.contextPath}";
        var pageTitle = "@isset($pageTitle){{ $pageTitle  }}@endisset";
        var pageIconCss = "@isset($pageIconClass){{ $pageIconClass  }}@endisset";
    </script>

    <!-- == JQUERY == -->
    <script src="{{ asset('/assets/libs/jquery/jquery.min.js')  }}"></script>

    <!-- CKEditor -->
    <script src="{{ asset('/assets/libs/ckeditor-4.5.8/ckeditor.js')  }}"></script>
</head>
<body>
