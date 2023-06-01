@extends('app')
@section('content')
    <!--<x-aside></x-aside>-->
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <x-nav></x-nav>
        <div class="container-fluid mt-3">
            @yield('content-child')
        </div>
    </main>
@endsection
