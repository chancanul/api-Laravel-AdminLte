@extends('layout.index')
@section('panel')
  @include('rol.admin.usuarios.panel')
@endsection
@section('contenido')
    @include('rol.admin.usuarios.form_Usuario_Nuevo')
@endsection