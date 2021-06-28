<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\apiusuarios;
use Illuminate\Support\Facades\Storage;

class controllerusuario extends Controller
{
    /**
     * Validar que usuario y contraseña estén en la BD
     * @param Request $request recibe los parámetros dentro la petición post.
     */
     public function validar(Request $request) {
         $respuesta="";
        $filtro = apiusuarios::where('usuario','=',$request->usuario, 'and')->where('password', '=', $request->password)->first();
        if($filtro != null) {
           // $respuesta = 'ok';
           $respuesta = response()->json($filtro, 200);
        } else {
            //$respuesta = 'fail';
            $respuesta = 'fail';
        }
        return $respuesta;
     }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $usuarios=apiusuarios::all();
        return response()->json($usuarios,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $usuario = new apiusuarios;
        $usuario->id_rol = $request->input('id_rol');
        $usuario->nombre = $request->input('nombre');
        $usuario->apellido_p = $request->input('apellido_p');
        $usuario->apellido_m = $request->input('apellido_m');
        $usuario->usuario = $request->input('usuario');
        $usuario->password = $request->input('password');


        if($request->hasfile('imagen')) {
            $imagen = $request->file('imagen')->store('img', 'public');
        } else {
            $imagen = "";
        }
        $usuario->imagen = $imagen;
        $usuario->save();
        return response()->json($usuario,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $usuarioModificar = new apiusuarios;
        $usuarioModificar = apiusuarios::find($id);
        $usuarioModificar->id_rol = $request->input('id_rol');
        $usuarioModificar->nombre = $request->input('nombre');
        $usuarioModificar->apellido_p = $request->input('apellido_p');
        $usuarioModificar->apellido_m = $request->input('apellido_m');
        $usuarioModificar->usuario = $request->input('usuario');
        $usuarioModificar->password = $request->input('password');

        if($request->hasfile('imagen')) {
            $imagenAntigua = $usuarioModificar->imagen;
            Storage::delete('public/storage'.$imagenAntigua);
            $imagen =  $request->file('imagen')->store('img', 'public');
            $usuarioModificar->imagen = $imagen;
            $usuarioModificar->update();
            return response()->json("imagen", 200);
        } else {
            $usuarioModificar->update();
            return response()->json("sin imagen", 200);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
