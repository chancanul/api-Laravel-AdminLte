<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class routeViews extends Controller
{
    //
    public function usuarios() {
        return view('rol.admin.usuarios.contenido_index');
    }
}
