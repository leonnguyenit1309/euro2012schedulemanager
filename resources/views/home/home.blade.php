@extends('layouts.home')
@section('content')
    <div class="home">
        <h2>Tiểu Luận Tốt Nghiệp</h2>
        <h4>{{ __('app.name')  }}</h4>
        <div>
            <table class="home-table">
                <tr>
                    <td>Sinh Viên Thực Hiện:</td>
                    <td>NGUYỄN THÀNH LUÂN</td>
                </tr>
                <tr>
                    <td>MSSV:</td>
                    <td>DC14V7K011</td>
                </tr>
                <tr>
                    <td>Cán Bộ Hướng Dẫn:</td>
                    <td>PHẠM THẾ PHI</td>
                </tr>
                <tr>
                    <td>MSCB:</td>
                    <td>1229</td>
                </tr>
            </table>
            <a href="{{ route('dashboard')  }}" class="btn btn-lg btn-primary">{{ __('app.dashboard')  }}</a>
            <a href="{{ route('schedule')  }}" class="btn btn-lg btn-primary">{{ __('app.schedules')  }}</a>
        </div>
    </div>
@endsection