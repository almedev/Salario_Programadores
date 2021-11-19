<?php

class subirImagenes
{
    public $imagen;

    public function subirImagenServidor()
    {
        $ruta = "../archivos/";
        $nombreImagen = $this->imagen['name'];
        $extension = substr($nombreImagen, -4);
        $rutaFinal = $ruta . $nombreImagen;
        $mensaje = "";

        if ($extension == ".jpg" || $extension == ".JPG" || $extension == ".png" || $extension == ".PNG") {
            if (move_uploaded_file($this->imagen['tmp_name'], $rutaFinal)) {
                $mensaje = "El archivo se subio correctamente";
            } else {
                $mensaje = "error al subir archivo";
            }
        } else {
            $mensaje = "Archivo no compatible";
        }
        echo json_encode($mensaje);
    }
}

if (isset($_FILES["imagen"])) {
    $objImagen = new subirImagenes();
    $objImagen->imagen = $_FILES["imagen"];
    $objImagen->subirImagenServidor();
}

