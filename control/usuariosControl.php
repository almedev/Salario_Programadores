<?php
include_once "../modelo/usuariosModelo.php";

class ControlUsuarios{
    public $idUsuario;
    public $nivel;
    public $tipodocumento;
    public $numerodocumento;
    public $nombres;
    public $apellidos;
    public $salario;
    

    public function ctrInsertarUsuario(){
        $objRespuesta = ModeloUsuarios::mdlInsertarUsuario($this->nivel,$this->tipodocumento,$this->numerodocumento,$this->nombres,$this->apellidos,$this->salario);
        echo json_encode($objRespuesta);
    }

    public function ctrListarUsuarios(){
        $objRespuesta = ModeloUsuarios::mdlListarUsuarios();
        echo json_encode($objRespuesta);
    }

    public function ctrEditarUsuario(){
        $objRespuesta = ModeloUsuarios::mdlEditarUsuario($this->nivel,$this->tipodocumento,$this->numerodocumento,$this->nombres,$this->apellidos,$this->salario,$this->idUsuario);
        echo json_encode($objRespuesta);
    }

    public function ctrEliminarUsuario(){
        $objRespuesta = ModeloUsuarios::mdlEliminarUsuario($this->idUsuario);
        echo json_encode($objRespuesta);
    }

}

if (isset($_POST["nivel"]) && isset($_POST["tipodocumento"]) && isset($_POST["numerodocumento"]) && isset($_POST["nombres"]) && isset($_POST["apellidos"]) && isset($_POST["salario"])){
    $objUsuario = new ControlUsuarios();
    $objUsuario->nivel = $_POST["nivel"];
    $objUsuario->tipodocumento = $_POST["tipodocumento"];
    $objUsuario->numerodocumento = $_POST["numerodocumento"];
    $objUsuario->nombres = $_POST["nombres"];
    $objUsuario->apellidos = $_POST["apellidos"];
    $objUsuario->salario = $_POST["salario"];
    $objUsuario->ctrInsertarUsuario();
}

if (isset($_POST["cargarDatos"])  == "ok"){
    $objListaUsuarios = new ControlUsuarios();
    $objListaUsuarios->ctrListarUsuarios();
}

if (isset($_POST["edit_nivel"]) && isset($_POST["edit_tipodocumento"]) && isset($_POST["edit_numerodocumento"]) && isset($_POST["edit_nombres"]) && isset($_POST["edit_apellidos"]) && isset($_POST["edit_salario"]) && isset($_POST["edit_idUsuario"])){
    $objEditarUsuario = new ControlUsuarios();
    $objEditarUsuario->nivel = $_POST["edit_nivel"];
    $objEditarUsuario->tipodocumento = $_POST["edit_tipodocumento"];
    $objEditarUsuario->numerodocumento = $_POST["edit_numerodocumento"];
    $objEditarUsuario->nombres = $_POST["edit_nombres"];
    $objEditarUsuario->apellidos = $_POST["edit_apellidos"];
    $objEditarUsuario->salario = $_POST["edit_salario"];
    $objEditarUsuario->idUsuario = $_POST["edit_idUsuario"];
    $objEditarUsuario->ctrEditarUsuario();

}

if (isset($_POST["elim_idUsuario"])){
    $objEliminarUsuario = new ControlUsuarios();
    $objEliminarUsuario->idUsuario = $_POST["elim_idUsuario"];
    $objEliminarUsuario->ctrEliminarUsuario();
}