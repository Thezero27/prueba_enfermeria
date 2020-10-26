<?php
// Compruebe si hay campos vacíos
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "¡No se proporcionan argumentos!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Crea el correo electrónico y envía el mensaje
$to = "miguel.fabito@gmail.com"; // Agregue su dirección de correo electrónico entre el "" reemplazando yourname@yourdomain.com - Aquí es donde el formulario enviará un mensaje.
$email_subject = "Formulario de contacto del sitio web:  $name";
$email_body = "Ha recibido un nuevo mensaje del formulario de contacto de su sitio web.\n\n"."Aquí están los detalles:\n\nNombre: $name\n\nCorreo electrónico: $email_address\n\nTeléfono: $phone\n\nMensaje:\n$message";
$headers = "Desde: anonymousperu10@gmail.com\n"; // Esta es la dirección de correo electrónico de la que procederá el mensaje generado. Recomendamos usar algo como noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;         
?>