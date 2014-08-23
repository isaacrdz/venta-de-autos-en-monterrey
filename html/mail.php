<?
// configuración
$mensajeenviado='Enviado correctamente';
$redireccion='http://ventadeautosenmonterrey.com'; // cuando se envie el mail hacia donde me tengo que ir, eso dice el archivo jeje

// enviamos el email
$nombre=$_POST['nombre'];
$mailbox=$_POST['mail'];
$numero=$_POST['numero'];
$comentario=$_POST['comentario'];




// personales 
$mail  = "ventas@ventadeautosenmonterrey.com";
//$mailto = "$emailbox";

//$cuerpomailto ="Gracias por participar";




$asunto ='Información formulario '; // max 30 caracteres Ok 


// cuerpo del mail
$cuerpo = "Formulario de Grupo Rodriguez \n";
$cuerpo .= "\n";
$cuerpo .= "Nombre: $nombre\n";
$cuerpo .= "\n";
$cuerpo .= "Email: $mailbox\n";
$cuerpo .= "\n";
$cuerpo .= "Numero de contacto: $numero\n";
$cuerpo .= "\n";
$cuerpo .= "Comentario: $comentario\n";
$cuerpo .= "\n";


// cabeceras
$cabecera="From: Grupo Rodriguez <ventadeautosenmonterrey.com>";
$cabecerados="From: Grupo Rodriguez <ventadeautosenmonterrey.com>";
// enviamos el email 

  
mail($mail,$asunto,utf8_decode($cuerpo),$cabecera);
//mail($mailto, $asunto, $cuerpomailto,$cabecerados);
echo '<script>alert("'.$mensajeenviado.'");</script>'; //
echo '<script>location.href="'.$redireccion.'";</script>';
 

?>