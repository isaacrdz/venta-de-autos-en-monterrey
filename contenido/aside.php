
<article>
<h2 class="darkbg">Solicita información</h2>
	

<form action="mail.php" method="post">
		
	<input name="nombre" type="text" placeholder="Ingresa tu nombre" required/>
	<input name="mail" type="email"placeholder="@Ingresa tu Email" required>
	<input name="numero" type="tel" placeholder="Numero de contacto" required>
	<textarea name="comentario" id="" cols="30" rows="10" placeholder="Comentario" required></textarea>
	<button type="submit" onclick="ga('send', 'event', 'mainButton', 'click', 'formButton', 10);"> Enviar</button>

	</form>

	</form>
</article>
