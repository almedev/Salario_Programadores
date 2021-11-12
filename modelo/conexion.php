<?php

class Conexion{
    public static function conectar(){
        $nombreServidor = "localhost";
        $baseDatos = "adsi";
        $usuario = "root";
        $password = "";

        try {
            $objConexion = new PDO('mysql:host='.$nombreServidor.';dbname='.$baseDatos.';',$usuario,$password);
            $objConexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $objConexion;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}