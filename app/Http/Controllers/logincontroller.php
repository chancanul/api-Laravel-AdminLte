<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;
Use Session;
Use Cache;


class logincontroller extends Controller
{

    public function index(Request $request)

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    {
        //
        $url = $request->root() . "/api/validar";
        //$url = "http://192.168.1.70/apiLabVirtual/public/api/validar";
        $status = Http::post($url,['usuario' => $request->usuario, 'password' => $request->password])->status();
        if ($status == '200') {
            //Obtiene respuesta de la API
            $responseBody =  Http::post($url,['usuario' => $request->usuario, 'password' => $request->password])->body();
            if($responseBody != "null") {

               $data = json_decode($responseBody, true);
                var_dump($data);
                foreach($data as $user) {
                    $nombre = $user['nombre'];
                    $rol = $user['roles']['nombre'];
                    $imagen = $user['imagen'];
                    
                }
                Session::put('usuario', $nombre);
                Session::put('rol', $rol);
                Session::put('imagen', $imagen);

                if($rol == "admin") {
                    return redirect('usuario');
                } else {
                    return redirect('/');
             }

            } else { //el usuario no esta en la BD
                echo ("El usuario no esta en la BD");
            } //Fin de validar usuario $responseBody
        } else { //Servidor inaccesible

        }//fin de if status


        //$resultado = HTTP::post('http://192.168.1.76/public/api/validar', ['usuario']);
        //if($resultado = "ok"){
          //  return redirect('usuario');
        //} else {
           // return redirect('usuario');

       // }
       /** */
    //    $client = new Client();
    //         $url = "http://192.168.1.75/apiLabVirtual/public/api/validar";
    //         $response = $client->request('POST', $url, ['usuario' => $request->usuario, 'password' => $request->password]);
    //         var_dump($response);
    //         $estado=$response->getStatusCode();
    //         if($estado == 200){
    //             $responseBody = json_decode($response->getBody()->getContents()); //recibe un json
    //             var_dump($responseBody);
    //             $nombre = $responseBody->nombre;
    //             $rol = $responseBody->roles->nombre;
    //             $imagen = $responseBody->imagen;

    //             Session::put('usuario', $nombre);
    //             Session::put('rol', $rol);
    //             Session::put('imagen', $imagen);

    //             if($rol == "admin") {
    //              return redirect('usuario');

    //             return redirect('/');
    //          } //fin de if $estado
    //         } //fin de if estado;


    }//Fin de index

    public function logout() {
        Session::flush();
        Session::reflash();
        Cache::flush();
        unset($_SESSION);

        return redirect('/');
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
