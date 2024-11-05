document.addEventListener("DOMContentLoaded", () => {
    const parallaxImages = document.querySelectorAll('.photo');
    const body = document.querySelector('body');

    // Efecto Parallax para las imágenes al hacer scroll
    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const speed = img.getAttribute('data-speed');
            img.style.transform = `translateY(${window.scrollY / speed}px)`;
        });
    });

    // Corazones que siguen el mouse
    document.addEventListener('mousemove', (e) => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    });

    // Mostrar tiempo de noviazgo
    function updateRelationshipTime() {
        const startDate = new Date('2019-07-06T00:00:00');
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        // Ajuste si los meses o días están en negativo
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            // Calcular días en el mes anterior
            const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += previousMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        document.getElementById('relationship-time').innerText = 
            `${years} años, ${months} meses, ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    }

    // Llamar a la función para actualizar el tiempo de noviazgo
    updateRelationshipTime();


    function updateCountdown() {
        const today = new Date();
        const nextAnniversary = new Date(today.getFullYear() + 1, 6, 6); // Próximo 6 de Julio
    
        if (today.getMonth() > 6 || (today.getMonth() === 6 && today.getDate() > 6)) {
            nextAnniversary.setFullYear(today.getFullYear() + 1);
        }
    
        const diff = nextAnniversary - today;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
        document.getElementById("anniversary-countdown").innerText = 
            `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    }
    
    setInterval(updateCountdown, 1000);
    

    setInterval(updateRelationshipTime, 1000);

    // Funcionalidad del Modal de Imagen
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    // Evento al hacer clic en una imagen de la galería
    parallaxImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImage.src = img.src;
        });
    });

    // Cerrar el modal al hacer clic en el botón de cierre
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const messages = [
        "Eres mi sol en un día nublado ☀️",
        "Cada momento contigo es eterno ❤️",
        "Tu sonrisa ilumina mi mundo 💫",
        "A tu lado, soy la mejor versión de mí 💕",
        "Contigo, el tiempo se detiene ⏳",
        "Tu risa es la melodía que alegra mi día 🎶",
        "No importa dónde esté, mi corazón siempre está contigo 💖",
        "Desde que te conocí, mis días tienen más sentido ✨",
        "En tus brazos, encuentro mi hogar 🏡",
        "Cada beso tuyo es una chispa en mi vida 🔥",
        "Eres el sueño que nunca quiero dejar de soñar 🌙",
        "Si tuviera que elegir otra vida, te elegiría a ti cada vez 🥰",
        "Eres la razón de mis sonrisas sin motivo 😊",
        "Contigo, cada día es una nueva aventura 🌍",
        "Tu amor es mi mayor fortuna 💎",
        "Eres la paz en mi tormenta 🌧️",
        "Te amo más de lo que las palabras pueden expresar 💬",
        "Eres mi refugio, mi calma, mi amor 🛡️",
        "Tenerte es el regalo más hermoso de todos 🎁",
        "A tu lado, soy quien siempre quise ser 🥂",
        "Eres mi historia de amor favorita 📖",
        "Cuando estoy contigo, el mundo desaparece 🌌",
        "Tu voz es la canción que quiero escuchar toda mi vida 🎵",
        "Eres mi estrella en la noche más oscura ⭐",
        "Te amo hoy más que ayer, y menos que mañana 💫",
        "Eres el primer pensamiento en mis mañanas y el último en mis noches 🌅",
        "Cada segundo contigo vale más que todo el tiempo del mundo ⏰",
        "Eres la poesía que mi corazón siempre quiso escribir 🖋️",
        "A tu lado, todos mis miedos desaparecen 🦋",
        "Eres el latido que da ritmo a mi vida 💓",
        "Tu amor es la fuerza que me hace invencible 💪",
        "Eres la magia que le da color a mis días 🖌️",
        "Contigo, todo es posible 🌈",
        "Eres mi luz en medio de la oscuridad 💡",
        "Mi amor por ti es infinito ♾️",
        "Eres el susurro que calma mi mente en los momentos difíciles 🌬️",
        "Cada recuerdo contigo es un tesoro que guardo en mi alma 🌺",
        "Tu sonrisa es el amanecer de mi vida 🌄",
        "Tu amor es el refugio donde siempre quiero estar 🏞️",
        "Eres la mitad de mi alma, el complemento perfecto 💞",
        "Amo cada segundo que paso a tu lado ⏳",
        "Eres la razón por la que creo en el amor verdadero 💍",
        "Mi corazón te pertenece, siempre 💖",
        "Eres la chispa que enciende mi felicidad ✨",
        "Desde que llegaste, mis días son más brillantes 🌟",
        "En tu abrazo encuentro la paz que siempre busqué 🌹",
        "Tu amor es el mejor regalo que la vida me dio 🎁",
        "Cada día contigo es un nuevo capítulo en nuestra historia 📜",
        "Eres la melodía que da ritmo a mi vida 🎼",
        "Eres el faro que ilumina mi camino en los días oscuros 🕯️",
        "Contigo aprendí que el amor verdadero existe 💗",
        "Mis días son mejores cuando te tengo cerca 💞",
        "Eres mi puerto seguro en cada tormenta ⚓",
        "El brillo de tus ojos ilumina mi alma ✨",
        "Eres el final feliz de todos mis cuentos de amor 💕",
        "A tu lado, no hay imposibles 🚀",
        "Tenerte es saber que tengo todo lo que necesito 💖",
        "Eres el latido de mi corazón y el suspiro de mi alma 🌬️",
        "Cada día contigo es un regalo inesperado 🎁",
        "Eres mi amanecer y mi atardecer 🌄",
        "Tus abrazos son mi refugio y mi paz 🥰",
        "Eres la respuesta a todas mis preguntas ❤️",
        "Tu amor es la chispa que ilumina mis días 💡",
        "Mis días son más felices desde que te tengo 💘",
        "Eres mi principio y mi fin en el amor 💫",
        "Quiero envejecer contigo y recordar cada momento 💍",
        "Eres mi inspiración y mi alegría diaria 🌞",
        "Cada vez que te miro, confirmo lo afortunado que soy 🍀",
        "Eres el cuento que siempre quiero contar 📖",
        "A tu lado, cada sueño es alcanzable ✨",
        "Mi corazón late con más fuerza solo por ti 💓",
        "Eres la luna que guía mis noches 🌙",
        "Tu amor me hace sentir como si volara 🕊️",
        "Eres el arcoíris después de cada tormenta 🌈",
        "Desde que estás a mi lado, soy una mejor persona 🌻",
        "Amo cada momento que pasamos juntos 💑",
        "Eres mi razón para seguir soñando 🌌",
        "Contigo, los días nublados se llenan de color 🎨",
        "Tu amor es mi mayor inspiración 💞",
        "Eres el sol en mi cielo personal ☀️",
        "Cada día contigo es un día de amor 💘",
        "A tu lado, el tiempo es infinito ⏳",
        "Eres mi amor, mi amigo y mi confidente ❤️",
        "Tu sonrisa es el mejor regalo que puedo recibir 🎁",
        "Cada caricia tuya es un abrazo al alma 💫",
        "Eres la persona que siempre soñé encontrar 💍",
        "Eres la razón de mis suspiros profundos 💕",
        "A tu lado, me siento completo 🌍",
        "Eres mi mundo, mi amor y mi todo 🌎",
        "Tu amor es la melodía que quiero escuchar siempre 🎶",
        "Eres la luz que me guía en cada paso 💫",
        "Mi felicidad se resume en una sola palabra: tú ❤️",
        "Eres el refugio donde mis preocupaciones desaparecen 🛡️",
        "Cada beso tuyo es una promesa de eternidad 💋",
        "Eres el sueño que nunca quiero despertar 🌠",
        "Mi amor por ti crece cada día como un amanecer 🌅",
        "Tu amor es la brújula que da dirección a mi vida 🧭",
        "Eres el capítulo más hermoso de mi historia 📖",
        "Eres el latido que da vida a mis días 💓",
        "A tu lado, no hay distancia que no pueda cruzar 🌐",
        "Eres la chispa que enciende cada rincón de mi corazón 🔥",
        "Te amo como las flores aman al sol 🌷",
        "Eres el refugio donde quiero pasar toda mi vida 🏠",
        "Mi amor por ti es más profundo que el océano 🌊",
        "Cada momento contigo es un tesoro guardado en mi alma 💎",
        "A tu lado, las estrellas brillan más 💫",
        "Eres el amor que no sabía que necesitaba 🌹",
        "Mi felicidad se multiplica cuando te veo sonreír 😊",
        "Eres el paraíso que siempre quise encontrar 🌴"
    ];    
    
    
    function showRandomMessage() {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById("random-message").innerText = randomMessage;
    }
    
    showRandomMessage();
    setInterval(showRandomMessage, 5000); // Cambia el mensaje cada 5 segundos

    function createFallingStar() {
        const star = document.createElement('div');
        star.classList.add('falling-star');
        star.style.left = Math.random() * 100 + 'vw';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 2000);
    }
    setInterval(createFallingStar, 3000); // Una estrella fugaz cada 3 segundos
    
    const wishes = [
        "Abrazarte para siempre 💑",
        "Viajar juntos a París 🗼",
        "Ver cada amanecer contigo 🌅",
        "Construir juntos nuestros sueños 🏠",
        "Escribir un libro de nuestro amor 📖",
        "Cocinar nuestra cena favorita juntos 🍲",
        "Tomarnos una foto en cada rincón del mundo 🌎",
        "Hacer una noche de películas solo para nosotros 🎬",
        "Pasar cada Navidad a tu lado 🎄",
        "Contemplar las estrellas contigo 🌌",
        "Recorrer el mundo en busca de aventuras juntos ✈️",
        "Hacer una cápsula del tiempo de nuestro amor ⏳",
        "Adoptar una mascota juntos 🐶",
        "Pasear en una playa al atardecer contigo 🌅",
        "Escuchar nuestras canciones favoritas en un viaje largo 🚗",
        "Leer un libro juntos 📚",
        "Ver una lluvia de meteoritos a tu lado 🌠",
        "Escribir cartas de amor para abrirlas en el futuro 💌",
        "Compartir un helado en un día soleado 🍦",
        "Tomarnos de la mano hasta en la vejez 👵👴",
        "Cuidarnos mutuamente en la salud y la enfermedad 💊",
        "Tener una noche de juegos juntos 🎲",
        "Bailar bajo la lluvia 💃🕺",
        "Reír juntos hasta que nos duela el estómago 😂",
        "Tener un jardín juntos para ver crecer la vida 🌸",
        "Explorar una ciudad desconocida de la mano 🗺️",
        "Escribir nuestras promesas en un diario 📔",
        "Hacer un picnic en el campo 🌳",
        "Ver los fuegos artificiales juntos 🎆",
        "Viajar en un globo aerostático juntos 🎈",
        "Hacer una lista de cosas por hacer en la vida 📝",
        "Aprender un idioma juntos 🗣️",
        "Escalar una montaña contigo 🏔️",
        "Vernos reflejados en nuestros hijos algún día 👶",
        "Tener un baile solo para nosotros 🥂",
        "Viajar en tren a algún lugar mágico 🚂",
        "Escribir juntos nuestra historia de amor 📖",
        "Tomar chocolate caliente en invierno contigo ☕",
        "Tener aventuras en cada estación del año 🍂❄️🌸☀️",
        "Crear nuestras propias tradiciones 🎉",
        "Adoptar una costumbre romántica de cada país que visitemos 🌍",
        "Mirar una película de terror juntos 👻",
        "Ver un amanecer en lo alto de una montaña 🏞️",
        "Pasar un fin de semana en una cabaña ⛺",
        "Contar hasta mil motivos por los que te amo 💘",
        "Hacer una lista de nuestros sueños cumplidos 🎯",
        "Tener un rincón especial solo para nosotros 🛋️",
        "Dejar huellas de amor en todo lugar donde estemos 💞",
        "Ver la nieve caer abrazados ❄️",
        "Darte un abrazo por cada día del año 🤗",
        "Construir un fuerte de almohadas en casa 🛏️",
        "Ver una lluvia de estrellas en la playa 🌊",
        "Soplar las velas juntos en cada cumpleaños 🎂",
        "Aprender a cocinar una receta nueva juntos 🍝",
        "Celebrar cada aniversario con una aventura nueva 🎊",
        "Viajar a un lugar sin planificar 🚗",
        "Ver una obra de teatro juntos 🎭",
        "Dejar notas de amor en lugares inesperados 💌",
        "Regalarnos flores en cualquier día 🌹",
        "Saltar en paracaídas juntos si somos valientes 🪂",
        "Ir a un concierto de nuestra banda favorita 🎸",
        "Pintar o dibujar algo juntos 🎨",
        "Dejarnos mensajes de voz cuando nos extrañemos 📱",
        "Pasar una noche en un observatorio astronómico 🔭",
        "Jugar a imaginar cómo será nuestro futuro juntos 🌠",
        "Escribir una carta para abrir en 10 años ✉️",
        "Planear una sorpresa para cada aniversario 🎁",
        "Tomarnos un día para recordar nuestro primer encuentro ❤️",
        "Construir juntos un álbum de fotos 📷",
        "Tener una cita romántica en cada país que visitemos 🗺️",
        "Ser cómplices de nuestras locuras y sueños 💥",
        "Llenar una caja con nuestros mejores recuerdos 🎁",
        "Tomar un café en cada ciudad que visitemos ☕",
        "Decirnos ‘te amo’ cada vez que estemos juntos 💞",
        "Hacer juntos una lista de agradecimientos cada año 🙏",
        "Mirar juntos nuestra serie favorita 📺",
        "Compartir nuestras metas y ayudarnos a cumplirlas 🚀",
        "Ver juntos un amanecer en el desierto 🏜️",
        "Tomarnos un día para solo descansar y estar juntos 🛋️",
        "Hacer una actividad divertida cada fin de semana 🎢",
        "Contarnos un secreto cada mes 🤫",
        "Decorar nuestro hogar de manera especial 🎨",
        "Tomarnos un café en una terraza viendo la ciudad ☕",
        "Bailar juntos nuestra canción en cualquier momento 🎶",
        "Construir un sueño a la vez, juntos 🚀",
        "Subirnos a una montaña rusa y gritar juntos 🎢",
        "Contar juntos cada momento hermoso que hemos vivido ✨",
        "Celebrar el año nuevo juntos en una ciudad diferente 🎆",
        "Tomarnos una foto en un campo de girasoles 🌻",
        "Perdernos en la naturaleza juntos 🌳",
        "Tomarnos de la mano en cada viaje de nuestras vidas ✋",
        "Escribir poemas juntos 📝",
        "Cantar nuestras canciones favoritas en el auto 🎤",
        "Aprender algo nuevo y divertido juntos 📚",
        "Hacer una fogata y contar historias 🔥",
        "Tener un día de descanso absoluto y solo dormir 💤",
        "Contar estrellas en una noche despejada 🌠",
        "Pintar juntos un mural que hable de nuestro amor 🎨",
        "Revivir nuestro primer beso 💋",
        "Hacer una lista de nuestros recuerdos favoritos 💭",
        "Volar una cometa en un parque abierto 🪁",
        "Dejarnos mensajes secretos escondidos 📩",
        "Vivir cada día como si fuera el primero 💑",
        "Prometernos que seremos felices juntos, siempre 🥂",
        "Pasear en bicicleta por la ciudad juntos 🚴‍♂️🚴‍♀️",
        "Escaparnos un fin de semana sin decirle a nadie 🚗",
        "Dormir bajo las estrellas en una noche despejada 🌌",
        "Escuchar juntos el sonido de la lluvia desde la cama 🌧️",
        "Cantar juntos en un karaoke 🎤",
        "Ver juntos nuestra primera película otra vez 🎥",
        "Vivir en una casa junto al mar algún día 🏖️",
        "Hacer una fogata en la playa solo para nosotros 🔥",
        "Comer pizza en pijama mientras vemos una serie 🍕",
        "Recorrer un bosque y tomar fotos de todo 🌲",
        "Hacer una lista de sueños locos que queremos cumplir 🎉",
        "Probar comida exótica juntos 🍣",
        "Conseguir globos y soltarlos con deseos escritos 🎈",
        "Viajar en un crucero por el mundo juntos 🚢",
        "Hacer un álbum de fotos de todos nuestros viajes 📸",
        "Plantar un árbol juntos para verlo crecer 🌳",
        "Hacer paracaidismo si algún día somos valientes 🪂",
        "Tomar una clase de baile juntos 💃",
        "Aprender a tocar un instrumento juntos 🎸",
        "Escribir una canción que sea solo nuestra 🎶",
        "Viajar en autocaravana por lugares increíbles 🚐",
        "Tener una noche de camping en el jardín 🏕️",
        "Ver una aurora boreal contigo 🌌",
        "Asistir a un festival de música y bailar toda la noche 🎉",
        "Contar historias de miedo en una noche oscura 👻",
        "Probar algo totalmente nuevo cada año juntos ✨",
        "Comprar un globo terráqueo y elegir un destino al azar 🌍",
        "Despertarte con desayuno en la cama 🍳",
        "Hacer juntos un álbum de recortes de nuestra vida 📒",
        "Pasar juntos la noche de San Valentín en un lugar especial 💖",
        "Aprender a patinar sobre hielo juntos ⛸️",
        "Desafiarte a una batalla de videojuegos 🎮",
        "Ver juntos el amanecer en cada ciudad que visitemos 🌅",
        "Tener un aniversario en un lugar donde nunca hemos estado 🗺️",
        "Tomarnos una foto anual en el mismo lugar 📷",
        "Escribir una carta de amor para leerla en 20 años ✉️",
        "Hacer un mural de nuestras fotos y recuerdos 🎨",
        "Construir juntos algo, como una pequeña cabaña 🏠",
        "Hacer un tour gastronómico en una ciudad nueva 🍜",
        "Ver juntos una película en autocine 🚗",
        "Recibir el año nuevo en la cima de una montaña 🎆",
        "Diseñar nuestra casa de ensueño y soñar con vivir en ella 🏡",
        "Hacer una lista de 50 cosas que nos hacen felices juntos 😊",
        "Escribir un libro de nuestras aventuras 📚",
        "Hacer juntos nuestra canción favorita con nuestro estilo 🎶",
        "Despertarnos en una nueva ciudad sin planificar 🧭",
        "Visitar un museo de arte y hablar sobre cada obra 🎨",
        "Dormir en una casa en un árbol 🏕️",
        "Ir a un parque de diversiones y subir a todas las atracciones 🎢",
        "Construir una biblioteca en casa para leer juntos 📖",
        "Decorar nuestro hogar con nuestras fotos favoritas 🖼️",
        "Ver la puesta de sol desde un rascacielos 🌇",
        "Pasar juntos una noche en una casa encantada 👻",
        "Tener una cena con velas bajo las estrellas 🕯️",
        "Conocer juntos cada rincón de nuestra ciudad 🏙️",
        "Contar nuestra historia a futuras generaciones 👶",
        "Hacer una colección de postales de cada lugar que visitemos 🏞️",
        "Correr bajo la lluvia y terminar con un beso ☔",
        "Construir un rompecabezas gigante en casa 🧩",
        "Ver el amanecer desde un barco ⛵",
        "Bailar bajo una lluvia de fuegos artificiales 🎇",
        "Pasar juntos una noche en una casa en el bosque 🌲",
        "Escuchar el sonido del mar en la madrugada 🏝️",
        "Volar juntos en parapente 🪂",
        "Nadar en un lago al amanecer 🏞️",
        "Comer helado en invierno solo por diversión 🍨",
        "Hacer un regalo sorpresa cada aniversario 🎁",
        "Ir a la playa y hacer castillos de arena 🏖️",
        "Recibir el Año Nuevo en una playa con fuegos artificiales 🎆",
        "Pintar juntos en un lienzo gigante 🎨",
        "Hacer un picnic sorpresa con todas tus comidas favoritas 🧺",
        "Cocinar juntos nuestra versión de un plato gourmet 👩‍🍳👨‍🍳",
        "Contemplar juntos una tormenta eléctrica ⚡",
        "Tomarnos una siesta bajo un árbol grande y frondoso 🌳",
        "Hacer una lista de películas y verlas todas 📽️",
        "Tomarnos una foto en cada estación del año 📅",
        "Escribir una cápsula del tiempo con nuestros sueños 📜",
        "Ver juntos una lluvia de estrellas 🌠",
        "Recibir la Navidad en un lugar nevado 🎄❄️",
        "Contar juntos cada anécdota que nos hizo reír 😂",
        "Pasar una noche en un faro junto al mar 🌊",
        "Ver el amanecer desde un globo aerostático 🎈",
        "Escribir un cuento de amor con nosotros como protagonistas 📝",
        "Pasear en barca en un lago tranquilo 🛶",
        "Viajar en moto por la carretera abierta 🛣️",
        "Tener una cena elegante solo para nosotros 🍽️",
        "Asistir a una función de ballet o de ópera 🎭",
        "Hacer juntos una manualidad para decorar nuestra casa 🏠",
        "Caminar por un campo de lavanda 🌸",
        "Vivir una Navidad en un lugar exótico 🎄",
        "Darnos un beso en lo alto de una torre 🗼",
        "Correr juntos en una maratón 🏃‍♂️🏃‍♀️",
        "Tomarnos una foto al atardecer en la playa 📸",
        "Recorrer un mercado local y probar cosas nuevas 🍲",
        "Asistir juntos a una cata de vinos 🍷",
        "Pasear por un campo de tulipanes 🌷",
        "Construir juntos una fogata y hacer malvaviscos 🔥",
        "Contemplar juntos la ciudad desde un mirador 🏙️",
        "Ver el amanecer en la cima de una colina ⛰️",
        "Disfrutar de un spa en pareja 💆‍♂️💆‍♀️"
    ];
    
    
    document.getElementById("wish-btn").addEventListener("click", () => {
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        document.getElementById("wish-display").innerText = randomWish;
    });
    
    
});
