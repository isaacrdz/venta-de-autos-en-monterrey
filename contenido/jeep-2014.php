<section class="contenedor-principal">


<section id="contenido-item" > 
<section id="slider-nivo">

<article>
	
	
	<div class=" theme-default">
            <div id="slider" class="nivoSlider">
                <img src="img/corvette.jpg" data-thumb="img/corvette.jpg" alt="" />
                <a href="#"><img src="img/corvette2.jpg" data-thumb="img/corvette2.jpg" alt="" title="This is an example of a caption" /></a>
                <img src="img/corvette.jpg" data-thumb="img/corvette.jpg" alt="" data-transition="slideInLeft" />
                <img src="img/corvette.jpg" data-thumb="img/corvette.jpg" alt="" title="#htmlcaption" />
            </div>
            
        </div>
</article>

</section>







<article class="contenedor-autos">

<ul>
<?
$sql = mysql_query("SELECT * FROM nuevos WHERE marca = 'Jeep'  ");
while ($row = mysql_fetch_array($sql)){


?>

		<li class="">
		<figure >
			<a href="#"><img src="<? echo $row['logo']; ?>" alt="wrangler unlimited 2014" width="100px"></a>
			<figcaption><? echo $row['marca']." ".$row['modelo']." ".$row['anio']; ?></figcaption>
			<a href="<? echo $row['slug'] ?>">ver modelo</a>
		</figure>	
		</li>
	
<?
}
?>

	</ul>
</article>




</section>