<section class="contenedor-principal">


<section id="contenido-item" > 

<? include 'slider.php' ?>

<section>
	

<article>
<?
$id=quitar($_GET['n']);
$sql = mysql_query("SELECT * FROM nuevos WHERE slug='$id'");
$numero= mysql_num_rows($sql);
if ($numero==0){
    echo "No se ha encontrado el post";
}else{


$row = mysql_fetch_array($sql);



?>

<h2 class="textleft width-size" ><? echo $row['marca']." ".$row['modelo']." ".$row['anio']; ?></h2>
<figure class="fleft">
	<img class="auto-img" src="<? echo $row['imagen1']; ?>" alt="">
</figure>
<p><? echo $row['contenido1'];?></p>

<p><? echo $row['contenido2'];?></p>


<figure class="fleft">
	<img class="auto-img" src="<? echo $row['imagen2']; ?>" alt="">
</figure>

<p><? echo $row['contenido3'];?></p>


<hr>



<?
}
?>

</article>

</section>


	


</section>