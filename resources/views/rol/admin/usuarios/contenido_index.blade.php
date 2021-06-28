@extends('layout.index')
@section('panel')
  @include('rol.admin.usuarios.panel')
@endsection
@section('contenido')
    @include('rol.admin.usuarios.contenido')
@endsection