<!DOCTYPE html>
<html lang="es">
<?
$id=quitar($_GET['n']);
$sql = mysql_query("SELECT * FROM nuevos WHERE slug='$id'");
$numero= mysql_num_rows($sql);
if ($numero==0){
    echo "No se ha encontrado el post";
}else{


$row = mysql_fetch_array($sql);



?>
<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" 
		  content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta name="description" content="Venta de Jeep 2014 en Monterrey, Financiamiento Jeep 2014 en Monterrey,conoce los nuevos modelos Jeep 2014 en Monterrey, Llámanos: (044)8112122412">
<link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/responsive.css">
<!--links nivo-->
<link rel="stylesheet" href="js/slider-nivo/themes/default/default.css" type="text/css" media="screen" />

 <link rel="stylesheet" href="js/slider-nivo/themes/bar/bar.css" type="text/css" media="screen" />
 <link rel="stylesheet" href="js/slider-nivo/css/nivo-slider.css" type="text/css" media="screen" />


<!--terminan links nivo -->
<title>Venta de Jeep 2014 en Monterrey</title>


<? include "comunes/header.php" ?>
<? include "contenido/jeep-2014.php" ?>
<aside>	
	<? include "contenido/aside-alone.php" ?>
</aside>

<? include "comunes/footer.php" ?>
<?
	 }
?>