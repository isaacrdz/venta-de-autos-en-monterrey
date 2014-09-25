<section class="contenedor-principal">


<section id="contenido-item" > 
	<? include 'slider.php' ?>
	<article class="contenedor-autos">

	<ul>
	<?
		$sql = mysql_query("SELECT * FROM nuevos WHERE marca = 'Jeep'  ");
		while ($row = mysql_fetch_array($sql)){
	?>

			<li class="">
			<figure >
				<a href="#"><img src="<? echo $row['logo']; ?>" alt="wrangler unlimited 2014" width="100px"></a>
				<figcaption class="margin-bottom"><? echo $row['marca']." ".$row['modelo']." ".$row['anio']; ?></figcaption>
				<div class="margin-bottom"><a href="<? echo $row['slug'] ?>" class="conoce-mas">Ver modelo</a></div>

			</figure>	
			</li>
		
	<?
		}
	?>

		</ul>
	</article>
</section>