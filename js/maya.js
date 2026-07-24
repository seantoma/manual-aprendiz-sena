/**
 * MAYA ? asistente unificado del Portal del Aprendiz SENA
 * Persona: Border Collie guardiana de la Etapa Productiva
 */
(function () {
  const BOOKINGS =
    'https://outlook.office.com/book/ReservasEtapaProductivaCSF@sena.edu.co/';

  const INTENTS = [
    {
      keys: ['hola', 'buenos', 'quien eres', 'maya', 'saludo', 'bienvenido'],
      response:
        "?Guau! ?? Soy <b>MAYA</b>, tu Border Collie guardiana de la Etapa Productiva SENA.<br><br><b>Puedo ayudarte con:</b><br>1. Normativa (Guía 040 / Acuerdo 009)<br>2. Formatos GFPI<br>3. Fechas y visitas<br>4. Agendamiento y recursos del portal<br><br>?En qué te oriento?"
    },
    {
      keys: ['bitacora', 'f-147', 'bitácora', 'formato 147', 'reporte', 'f147'],
      response:
        "<b>?? Bitácora GFPI-F-147:</b><br>Registro <b>mensual</b> obligatorio, firmado por tu jefe.<br><br>?? Descárgala en <a href='recursos_etapa_productiva.html#descargas'>Recursos y Formatos</a>."
    },
    {
      keys: ['f023', 'f-023', 'planeación', 'planeacion', 'seguimiento', 'visita', 'visitas'],
      response:
        "<b>?? GFPI-F-023:</b> Concertación, parcial y final.<br><br>?? Proyecta fechas en la <a href='calculadora_fechas.html'>Calculadora</a>.<br>?? Descarga en <a href='recursos_etapa_productiva.html#descargas'>Recursos</a>.<br>?? Agenda tu visita en <a href='" +
        BOOKINGS +
        "' target='_blank' rel='noopener'>MS Bookings</a>."
    },
    {
      keys: ['f165', 'f-165', 'alternativa', 'alternativas', 'contrato', 'pasantia', 'pasantía', 'vinculacion', 'monitoria', 'monitoría'],
      response:
        "<b>?? Alternativas de EP:</b> Contrato, Pasantía, Vínculo laboral, Proyecto y Monitoría.<br>Se formalizan con <b>F-165 V4</b>.<br><br>?? Detalle en el <a href='manual_aprendiz.html#alternativas'>Manual</a>.<br>?? Descarga en <a href='recursos_etapa_productiva.html#descargas'>Recursos</a>."
    },
    {
      keys: ['agendar', 'cita', 'bookings', 'reserva', 'calendario instructor'],
      response:
        "?? Agenda visitas con tu instructor aquí:<br><a href='" +
        BOOKINGS +
        "' target='_blank' rel='noopener'><b>MS Bookings ? Etapa Productiva</b></a>"
    },
    {
      keys: ['fecha', 'termino', 'término', 'cuando', 'cuanto', 'cronograma', 'calculadora'],
      response:
        "?? Usa la <a href='calculadora_fechas.html'><b>Calculadora de Etapa Productiva</b></a> para proyectar bitácoras, visitas y cierre."
    },
    {
      keys: ['formato', 'formatos', 'gfpi', 'descarga', 'documento', 'acta'],
      response:
        "<b>?? Formatos:</b> F-023, F-147, F-165, carta de intención y acta GOR-F-084.<br><br>?? Todo en el <a href='recursos_etapa_productiva.html#descargas'><b>Centro de Descargas</b></a>."
    },
    {
      keys: ['derecho', 'deber', 'reglamento', 'acuerdo', '009'],
      response:
        "?? Consulta <a href='manual_aprendiz.html#derechos'>Derechos y Deberes</a> en el Manual (Acuerdo 009)."
    },
    {
      keys: ['checklist', 'lista', 'certificar', 'certificacion', 'certificación'],
      response:
        "? Usa <a href='manual_aprendiz.html#checklist'>Mi Checklist</a> del Manual para verificar que tienes todo antes de certificar."
    },
    {
      keys: ['sofia', 'plus', 'plataforma'],
      response:
        "<a href='https://oferta.senasofiaplus.edu.co/' target='_blank' rel='noopener'>SofiaPlus</a> para estado académico y certificados."
    },
    {
      keys: ['ayuda', 'soporte', 'zendesk', 'problema'],
      response:
        "Soporte técnico: <a href='https://sena.zendesk.com' target='_blank' rel='noopener'>Zendesk SENA</a>"
    },
    {
      keys: ['momento', 'momentos', 'guia 040', 'guía 040'],
      response:
        "<b>?? 6 Momentos (Guía 040):</b><br>1. Inicio ? 2-4. Seguimientos ? 5. Evaluación final ? 6. Certificación.<br>Debes llevar bitácoras al día en cada momento."
    },
    {
      keys: ['manual', 'guia', 'guía'],
      response:
        "?? Abre el <a href='manual_aprendiz.html'><b>Manual del Aprendiz</b></a> para el recorrido completo."
    }
  ];

  function ensureMarkup() {
    if (!document.getElementById('ai-fab')) {
      const fab = document.createElement('button');
      fab.id = 'ai-fab';
      fab.type = 'button';
      fab.setAttribute('aria-label', 'Abrir asistente MAYA');
      fab.setAttribute('aria-expanded', 'false');
      fab.setAttribute('aria-controls', 'chat-window');
      document.body.appendChild(fab);
    }
    if (!document.getElementById('chat-window')) {
      const win = document.createElement('div');
      win.id = 'chat-window';
      win.className = 'chat-window hidden';
      win.setAttribute('role', 'dialog');
      win.setAttribute('aria-label', 'Chat de MAYA');
      win.innerHTML =
        '<div class="chat-header"><span><b>MAYA</b> Assistant AI</span><button type="button" id="close-chat" class="close-chat" aria-label="Cerrar chat"><i class="fas fa-times"></i></button></div>' +
        '<div id="chat-body" class="chat-body"><div class="msg bot">?Guau! ?? Soy <b>MAYA</b>, tu Border Collie guardiana. ?En qué proceso te ayudo hoy?</div></div>' +
        '<div class="chat-input-area"><input type="text" id="chat-input" class="chat-input" placeholder="Pregunta a Maya..." aria-label="Mensaje para MAYA"><button type="button" id="send-btn" class="send-btn" aria-label="Enviar"><i class="fas fa-paper-plane"></i></button></div>';
      document.body.appendChild(win);
    }
  }

  function addMsg(text, sender) {
    const body = document.getElementById('chat-body');
    const m = document.createElement('div');
    m.className = 'msg ' + sender;
    if (sender === 'user') m.textContent = text;
    else m.innerHTML = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }

  function respond(q) {
    const query = q.toLowerCase();
    const body = document.getElementById('chat-body');
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<i class="fas fa-paw fa-bounce"></i> Maya está rastreando...';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    setTimeout(function () {
      const indicator = document.getElementById('typing-indicator');
      if (indicator) indicator.remove();

      let best = null;
      let max = 0;
      INTENTS.forEach(function (intent) {
        let score = 0;
        intent.keys.forEach(function (key) {
          if (query.includes(key)) score++;
        });
        if (score > max) {
          max = score;
          best = intent.response;
        }
      });

      const fallback =
        "No localicé ese rastro. Prueba con: <b>bitácora</b>, <b>visitas</b>, <b>formatos</b>, <b>agendar</b> o <b>fechas</b>.<br><br><a href='https://www.google.com/search?q=SENA+etapa+productiva+" +
        encodeURIComponent(query) +
        "' target='_blank' rel='noopener'>Rastrear en Google</a>";

      addMsg(best || fallback, 'bot');
    }, 900);
  }

  function init() {
    ensureMarkup();
    const fab = document.getElementById('ai-fab');
    const chat = document.getElementById('chat-window');
    const closeBtn = document.getElementById('close-chat');
    const input = document.getElementById('chat-input');
    const send = document.getElementById('send-btn');

    fab.innerHTML =
      '<img src="https://img.icons8.com/?size=96&id=rEkHtgGbERQY&format=png" alt="" style="width:70%;filter:brightness(1.2)">';

    function setOpen(open) {
      chat.classList.toggle('hidden', !open);
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) input.focus();
    }

    fab.addEventListener('click', function () {
      setOpen(chat.classList.contains('hidden'));
    });
    closeBtn.addEventListener('click', function () {
      setOpen(false);
    });

    function sendMsg() {
      const text = input.value.trim();
      if (!text) return;
      addMsg(text, 'user');
      respond(text);
      input.value = '';
    }

    send.addEventListener('click', sendMsg);
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') sendMsg();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
