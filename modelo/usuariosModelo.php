<?php
include_once "conexion.php";

class ModeloUsuarios{

    public static function mdlInsertarUsuario($nivel,$tipodocumento,$numerodocumento,$nombres,$apellidos,$salario){
        $objRespuesta = Conexion::conectar()->prepare("INSERT INTO usuarios(nivel,tipodocumento,numerodocumento,nombres,apellidos,salario)VALUES(:nivel,:tipodocumento,:numerodocumento,:nombres,:apellidos,:salario)");
        $objRespuesta->bindParam(":nivel",$nivel);
        $objRespuesta->bindParam(":tipodocumento",$tipodocumento);
        $objRespuesta->bindParam(":numerodocumento",$numerodocumento);
        $objRespuesta->bindParam(":nombres",$nombres);
        $objRespuesta->bindParam(":apellidos",$apellidos);
        $objRespuesta->bindParam(":salario",$salario);
        
        $mensaje = "";
        if ($objRespuesta->execute()){
            $mensaje = "Datos insertados correctamente";
        }else{
            $mensaje = "error al insertar los datos";
        }

        return $mensaje;

    }

    public static function mdlListarUsuarios(){
        $objRespuesta = Conexion::conectar()->prepare("SELECT * FROM usuarios");
        $objRespuesta->execute();
        $aListaUsuarios = $objRespuesta->fetchAll();
        $objRespuesta = null;
        return $aListaUsuarios;
    }

    public static function mdlEditarUsuario($nivel,$tipodocumento,$numerodocumento,$nombres,$apellidos,$salario,$idUsuario){
        $objRespuesta = Conexion::conectar()->prepare("UPDATE usuarios SET nivel=:nivel,tipodocumento=:tipodocumento,numerodocumento=:numerodocumento,nombres=:nombres,apellidos=:apellidos,salario=:salario WHERE idusuario=:idusuario");
        $objRespuesta->bindParam(":nivel",$nivel);
        $objRespuesta->bindParam(":tipodocumento",$tipodocumento);
        $objRespuesta->bindParam(":numerodocumento",$numerodocumento);
        $objRespuesta->bindParam(":nombres",$nombres);
        $objRespuesta->bindParam(":apellidos",$apellidos);
        $objRespuesta->bindParam(":salario",$salario);
        $objRespuesta->bindParam(":idusuario",$idUsuario);
        $respuesta = "";

        if ($objRespuesta->execute()){
            $respuesta = "datos modificados correctamente";
        }else{
            $respuesta = "error al modificar datos";
        }
        return $respuesta;
    }


    public static function mdlEliminarUsuario($idUsuario){
        try {
            $objRespuesta = Conexion::conectar()->prepare("DELETE FROM usuarios WHERE idusuario=:idusuario");
            $objRespuesta->bindParam(":idusuario",$idUsuario);
            $respuesta = "";
            if ($objRespuesta->execute()){
                $respuesta = "datos eliminados correctamente";
            }else{
                $respuesta = "error al eliminar datos";
            }
        } catch (Exception $e) {
            $respuesta = $e;
        }
        

        return $respuesta;
    }

}