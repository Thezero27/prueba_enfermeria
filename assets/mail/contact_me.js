$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // mensajes de error o eventos adicionales
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // evitar el comportamiento de envío predeterminado
            // obtener valores de FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // Para mensaje de éxito / fracaso
            // Compruebe si hay espacios en blanco en el nombre para el mensaje de éxito / fracaso
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Desactive el botón enviar hasta que se complete la llamada AJAX para evitar mensajes duplicados
            $.ajax({
                url: "/assets/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                },
                cache: false,
                success: function () {
                    // Mensaje de éxito
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong>Tu mensaje ha sido enviado. </strong>"
                    );
                    $("#success > .alert-success").append("</div>");
                    //borrar todos los campos
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    // Mensaje de error
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text(
                            "Lo siento " +
                                firstName +
                                ", parece que mi servidor de correo no responde. ¡Por favor, inténtelo de nuevo más tarde!"
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
                    //borrar todos los campos
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Vuelva a habilitar el botón de envío cuando se complete la llamada AJAX
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*Al hacer clic en las casillas de Ocultar completa falla / éxito */
$("#name").focus(function () {
    $("#success").html("");
});
