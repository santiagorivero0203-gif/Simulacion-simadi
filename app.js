// ============================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ============================================

/**
 * Objeto centralizado que almacena el estado completo de la aplicación.
 * Contiene la configuración del examen, las preguntas, las respuestas del usuario
 * y los temporizadores activos.
 */
const state = {
    allQuestions: [],      // Banco completo de preguntas cargadas desde JSON
    examQuestions: [],     // Preguntas seleccionadas para el examen actual
    userAnswers: [],       // Array que almacena las respuestas del usuario por índice
    currentQuestionIndex: 0,
    config: {
        area: '',
        numQuestions: 5,
        timeLimit: 10
    },
    timerInterval: null,
    timeRemaining: 0,      // Tiempo restante en segundos
    timeUsed: 0,           // Tiempo transcurrido en segundos
    guidesData: null       // Datos interactivos de las guías
};

// ============================================
// REFERENCIAS DEL DOM
// ============================================

/**
 * Objeto que centraliza todas las referencias a elementos del DOM.
 * Facilita el acceso a elementos sin repetir `document.getElementById` por todo el código.
 */
const DOM = {
    screens: {
        setup: document.getElementById('setup-screen'),
        exam: document.getElementById('exam-screen'),
        report: document.getElementById('report-screen'),
        guides: document.getElementById('guides-screen'),
        guideDetail: document.getElementById('guide-detail-screen')
    },
    nav: {
        simulador: document.getElementById('nav-simulador'),
        guias: document.getElementById('nav-guias'),
        tabBtns: document.querySelectorAll('.tab-btn'),
        guidesContent: document.getElementById('guides-content')
    },
    guideDetail: {
        title: document.getElementById('guide-detail-title'),
        content: document.getElementById('guide-detail-content'),
        backBtn: document.getElementById('back-to-guides-btn')
    },
    setup: {
        form: document.getElementById('setup-form'),
        area: document.getElementById('area'),
        topicsContainer: document.getElementById('topics-container'),
        topicsGrid: document.getElementById('topics-grid'),
        numQuestions: document.getElementById('num-questions'),
        timeLimit: document.getElementById('time-limit'),
        hint: document.getElementById('available-questions-hint')
    },
    exam: {
        areaBadge: document.getElementById('current-area-badge'),
        counter: document.getElementById('question-counter'),
        timer: document.getElementById('timer'),
        timerContainer: document.querySelector('.timer-container'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        submitBtn: document.getElementById('submit-btn')
    },
    report: {
        scoreText: document.getElementById('score-text'),
        scorePercentage: document.getElementById('score-percentage'),
        timeUsed: document.getElementById('time-used'),
        feedbackList: document.getElementById('feedback-list'),
        restartBtn: document.getElementById('restart-btn'),
        proctoringSection: document.getElementById('proctoring-report-section'),
        proctoringList: document.getElementById('proctoring-list')
    }
};

// ============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ============================================

/**
 * Evento principal que se ejecuta cuando el DOM está completamente cargado.
 * Carga el banco de preguntas desde preguntas.json y configura los event listeners iniciales.
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar el banco de preguntas desde el archivo JSON
        const response = await fetch('preguntas.json');
        if (!response.ok) throw new Error('No se pudo cargar la base de datos de preguntas.');
        state.allQuestions = await response.json();
        
        // Cargar guías interactivas
        try {
            const guidesRes = await fetch('guides.json');
            if (guidesRes.ok) {
                state.guidesData = await guidesRes.json();
            }
        } catch(e) {
            console.error("Error cargando guías:", e);
        }
        
        // Configurar listener para cambio de área y actualizar temas disponibles
        DOM.setup.area.addEventListener('change', () => {
            renderTopics();
            updateAvailableQuestionsHint();
        });

        // Configurar listener para el formulario de inicio del examen
        DOM.setup.form.addEventListener('submit', startSimulation);

        // Iniciar preview de cámara si está disponible
        if (typeof ProctoringSystem !== 'undefined') {
            ProctoringSystem.initPreview();
        }

        // Configurar navegación principal
        DOM.nav.simulador.addEventListener('click', () => {
            switchScreen('setup');
            DOM.nav.simulador.classList.add('active');
            DOM.nav.guias.classList.remove('active');
        });

        DOM.nav.guias.addEventListener('click', () => {
            switchScreen('guides');
            DOM.nav.guias.classList.add('active');
            DOM.nav.simulador.classList.remove('active');
            // Cargar contenido de la pestaña activa por defecto
            const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
            renderGuideContent(activeTab);
        });

        // Configurar navegación de pestañas de guías
        DOM.nav.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                DOM.nav.tabBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderGuideContent(e.target.dataset.tab);
            });
        });

        // Configurar botón de volver de detalles de guía
        DOM.guideDetail.backBtn.addEventListener('click', () => {
            switchScreen('guides');
        });

    } catch (error) {
        console.error("Error inicializando la aplicación:", error);
        alert("Error cargando el banco de preguntas. Asegúrate de ejecutar esto desde un servidor local o permitir CORS.");
    }
});

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Cambia la pantalla activa de la aplicación.
 * Remueve la clase 'active' de todas las pantallas y la agrega a la seleccionada.
 * @param {string} screenName - Nombre de la pantalla ('setup', 'exam', 'report')
 */
function switchScreen(screenName) {
    Object.values(DOM.screens).forEach(screen => screen.classList.remove('active'));
    DOM.screens[screenName].classList.add('active');
}

/**
 * Mezcla un array utilizando el algoritmo de Fisher-Yates.
 * Crea una copia para no mutar el array original.
 * @param {Array} array - Array a mezclar
 * @returns {Array} Nuevo array con los elementos en orden aleatorio
 */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Formatea una cantidad de segundos a formato MM:SS.
 * @param {number} seconds - Cantidad de segundos
 * @returns {string} Tiempo formateado (ej: "05:30")
 */
function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// ============================================
// GUÍAS DE ESTUDIO
// ============================================

function renderGuideContent(tabId) {
    if (!DOM.nav.guidesContent) return;
    const data = state.guidesData ? (state.guidesData[tabId] || []) : [];
    
    DOM.nav.guidesContent.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'guide-topic-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        `;
        
        card.addEventListener('click', () => {
            openGuideDetail(item);
        });
        
        DOM.nav.guidesContent.appendChild(card);
    });
}

/**
 * Abre la vista detallada de una guía de estudio.
 * Renderiza la teoría, exámenes pasados, práctica interactiva y referencias.
 * - Usa clases CSS en vez de estilos en línea.
 * - Reemplaza alert() por feedback visual integrado en el DOM.
 * - Añade animaciones fade-in a las pestañas.
 * - Muestra "empty states" amigables cuando no hay contenido.
 * @param {object} item - Objeto de guía con title, theory, pastExams, practiceTopics, etc.
 */
function openGuideDetail(item) {
    DOM.guideDetail.title.textContent = item.title;

    // 1. YouTube Video
    const videoContainer = document.getElementById('guide-video-container');
    if (item.youtubeId) {
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${item.youtubeId}" allowfullscreen></iframe>`;
        videoContainer.classList.remove('hidden');
    } else {
        videoContainer.innerHTML = '';
        videoContainer.classList.add('hidden');
    }

    // 2. Theory Tab (Inject Graphics + Theory)
    const theoryContent = document.getElementById('guide-theory');
    let theoryHtml = item.theory || '';
    if (item.graphics) {
        theoryHtml = `<div class="graphic-box">${item.graphics}</div>` + theoryHtml;
    }
    theoryContent.innerHTML = theoryHtml || `
        <div class="empty-state">
            <div class="icon">📚</div>
            <p>La teoría de este tema está siendo preparada. Pronto estará disponible.</p>
        </div>`;

    // 3. Past Exams Tab — with cleaner card design
    const examsContent = document.getElementById('guide-exams');
    examsContent.innerHTML = '';
    if (item.pastExams && item.pastExams.length > 0) {
        item.pastExams.forEach((exam, idx) => {
            const card = document.createElement('div');
            card.className = 'guide-example-box';
            // Build options list
            let optionsHtml = '';
            if (exam.opciones && exam.opciones.length > 0) {
                optionsHtml = `<ul style="margin:0.5rem 0 0.5rem 1.2rem;">
                    ${exam.opciones.map((o, i) => `<li><strong>${String.fromCharCode(65+i)})</strong> ${o}</li>`).join('')}
                </ul>`;
            }
            card.innerHTML = `
                <div class="example-title">Examen Pasado #${idx + 1}</div>
                <p><strong>Pregunta:</strong> ${exam.pregunta}</p>
                ${optionsHtml}
                <p style="margin-top: 0.5rem;"><strong>✅ Respuesta Correcta:</strong> ${exam.correcta}</p>
                <p><strong>📖 Resolución:</strong> ${exam.resolucion}</p>
            `;
            examsContent.appendChild(card);
        });
    } else {
        examsContent.innerHTML = `
            <div class="empty-state">
                <div class="icon">🏛️</div>
                <p>Aún no hemos cargado preguntas de exámenes pasados para este tema. ¡Pronto!</p>
            </div>`;
    }

    // 4. References
    const refContainer = document.getElementById('guide-references');
    const refList = document.getElementById('guide-references-list');
    if (item.references && item.references.length > 0) {
        refList.innerHTML = '';
        item.references.forEach(ref => {
            refList.innerHTML += `<li><span>📄 ${ref.guideName}</span><span>${ref.pages}</span></li>`;
        });
        refContainer.classList.remove('hidden');
    } else {
        refContainer.classList.add('hidden');
    }

    // 5. Setup Internal Tabs — reclone nodes to remove stale listeners
    const tabs = document.querySelectorAll('.g-tab-btn');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            newTab.addEventListener('click', (e) => {
                document.querySelectorAll('.g-tab-btn').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.g-tab-content').forEach(c => c.classList.add('hidden'));
                e.target.classList.add('active');
                const target = document.getElementById(e.target.dataset.target);
                if (target) {
                    target.classList.remove('hidden');
                    // Re-trigger animation by forcing reflow
                    target.style.animation = 'none';
                    void target.offsetHeight;
                    target.style.animation = '';
                }
            });
        });

        // Reset to Theory tab
        document.querySelectorAll('.g-tab-btn')[0].click();
    }

    if (window.MathJax) {
        MathJax.typesetPromise();
    }

    // 6. Setup Practice logic — with integrated DOM feedback (no alert())
    const startPracticeBtn = document.getElementById('start-guide-practice-btn');
    const practiceArea = document.getElementById('guide-practice-area');

    if (startPracticeBtn && practiceArea) {
        const newPracticeBtn = startPracticeBtn.cloneNode(true);
        startPracticeBtn.parentNode.replaceChild(newPracticeBtn, startPracticeBtn);
        practiceArea.classList.add('hidden');
        practiceArea.innerHTML = '';

    newPracticeBtn.addEventListener('click', () => {
        const topics = item.practiceTopics || [];
        const relatedQuestions = state.allQuestions.filter(q => topics.includes(q.tema));

        if (relatedQuestions.length === 0) {
            practiceArea.innerHTML = `
                <div class="empty-state">
                    <div class="icon">🔍</div>
                    <p>No hay preguntas cargadas para este tema en el banco actual.</p>
                </div>`;
            practiceArea.classList.remove('hidden');
            return;
        }

        // Pick a random question
        const q = relatedQuestions[Math.floor(Math.random() * relatedQuestions.length)];

        // Build the question card using CSS classes (no inline styles)
        const card = document.createElement('div');
        card.className = 'practice-question-card';

        if (q.contexto) {
            const ctx = document.createElement('div');
            ctx.className = 'practice-context';
            ctx.textContent = q.contexto;
            card.appendChild(ctx);
        }

        const questionTitle = document.createElement('h4');
        questionTitle.style.marginTop = '0';
        questionTitle.textContent = q.pregunta;
        card.appendChild(questionTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'practice-options';

        // Feedback panel (initially hidden)
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'practice-feedback';

        let answered = false;
        q.opciones.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-secondary';
            btn.textContent = opt;
            btn.onclick = () => {
                if (answered) return; // Prevent re-answering
                answered = true;

                // Visual mark on the clicked button
                if (opt === q.correcta) {
                    btn.style.background = '#10B981';
                    btn.style.color = '#fff';
                    btn.style.borderColor = '#10B981';
                    feedbackDiv.className = 'practice-feedback success';
                    feedbackDiv.innerHTML = `
                        <h4>✅ ¡Correcto!</h4>
                        <p>${q.justificacion || 'Excelente respuesta.'}</p>
                        <button class="btn-secondary" id="next-practice-btn" style="margin-top:0.5rem;">Siguiente pregunta →</button>
                    `;
                } else {
                    btn.style.background = '#EF4444';
                    btn.style.color = '#fff';
                    btn.style.borderColor = '#EF4444';
                    // Highlight the correct answer
                    optionsDiv.querySelectorAll('button').forEach(b => {
                        if (b.textContent === q.correcta) {
                            b.style.background = '#10B981';
                            b.style.color = '#fff';
                            b.style.borderColor = '#10B981';
                        }
                    });
                    feedbackDiv.className = 'practice-feedback error';
                    feedbackDiv.innerHTML = `
                        <h4>❌ Incorrecto</h4>
                        <p><strong>Respuesta correcta:</strong> ${q.correcta}</p>
                        <p>${q.justificacion || ''}</p>
                        <button class="btn-secondary" id="next-practice-btn" style="margin-top:0.5rem;">Intentar con otra pregunta →</button>
                    `;
                }

                card.appendChild(feedbackDiv);
                
                if (window.MathJax) {
                    MathJax.typesetPromise();
                }

                // "Next question" button reloads a new question
                document.getElementById('next-practice-btn').onclick = () => {
                    newPracticeBtn.click();
                };
            };
            optionsDiv.appendChild(btn);
        });

        card.appendChild(optionsDiv);
        practiceArea.innerHTML = '';
        practiceArea.appendChild(card);
        practiceArea.classList.remove('hidden');
        
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    });
    }

    switchScreen('guideDetail');
}


// ============================================
// CONFIGURACIÓN Y TEMAS DEL EXAMEN
// ============================================

/**
 * Renderiza los checkboxes de temas disponibles según el área seleccionada.
 * Filtra el banco de preguntas y muestra únicamente los temas relevantes.
 */
function renderTopics() {
    const selectedArea = DOM.setup.area.value;
    if (!selectedArea) return;

    // Filtrar preguntas por área y obtener temas únicos
    const filtered = state.allQuestions.filter(q => q.area === selectedArea);
    const uniqueTopics = [...new Set(filtered.map(q => q.tema || "General"))];

    DOM.setup.topicsGrid.innerHTML = '';
    
    if (uniqueTopics.length > 0) {
        DOM.setup.topicsContainer.classList.remove('hidden');
        uniqueTopics.forEach(topic => {
            const label = document.createElement('label');
            label.className = 'topic-label';
            
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.value = topic;
            cb.checked = true; // Tema activo por defecto
            cb.onchange = updateAvailableQuestionsHint;

            label.appendChild(cb);
            label.appendChild(document.createTextNode(topic));
            DOM.setup.topicsGrid.appendChild(label);
        });
    } else {
        DOM.setup.topicsContainer.classList.add('hidden');
    }
}

/**
 * Actualiza la pista informativa sobre cuántas preguntas están disponibles
 * en el banco según los temas seleccionados actualmente.
 */
function updateAvailableQuestionsHint() {
    const selectedArea = DOM.setup.area.value;
    if (!selectedArea) return;

    // Obtener temas marcados en los checkboxes
    const checkboxes = Array.from(DOM.setup.topicsGrid.querySelectorAll('input[type="checkbox"]:checked'));
    const selectedTopics = checkboxes.map(cb => cb.value);

    // Contar preguntas disponibles que coincidan con área y temas seleccionados
    const available = state.allQuestions.filter(q => {
        const matchArea = q.area === selectedArea;
        const matchTopic = selectedTopics.includes(q.tema || "General");
        return matchArea && matchTopic;
    }).length;

    DOM.setup.hint.textContent = `Disponibles en banco: ${available}`;
    DOM.setup.numQuestions.max = available;
    
    // Ajustar automáticamente la cantidad si excede el disponible
    if (available === 0) {
        DOM.setup.numQuestions.value = 0;
    } else if (parseInt(DOM.setup.numQuestions.value) > available || parseInt(DOM.setup.numQuestions.value) === 0) {
        DOM.setup.numQuestions.value = available;
    }
}

// ============================================
// MOTOR DEL EXAMEN
// ============================================

/**
 * Inicia la simulación del examen con la configuración seleccionada.
 * Filtra preguntas, las mezcla con round-robin por tema, y configura la interfaz.
 * @param {Event} e - Evento del formulario
 */
function startSimulation(e) {
    e.preventDefault();

    // Guardar configuración del examen
    state.config.area = DOM.setup.area.value;
    state.config.numQuestions = parseInt(DOM.setup.numQuestions.value);
    state.config.timeLimit = parseInt(DOM.setup.timeLimit.value);

    // Obtener temas seleccionados
    const checkboxes = Array.from(DOM.setup.topicsGrid.querySelectorAll('input[type="checkbox"]:checked'));
    const selectedTopics = checkboxes.map(cb => cb.value);

    // Filtrar preguntas por área y temas
    let filteredQuestions = state.allQuestions.filter(q => {
        return q.area === state.config.area && selectedTopics.includes(q.tema || "General");
    });
    
    if (filteredQuestions.length === 0) {
        alert("Por favor selecciona al menos un tema para evaluar.");
        return;
    }
    
    // Agrupar preguntas por tema y mezclar dentro de cada grupo
    const grouped = {};
    filteredQuestions.forEach(q => {
        const tema = q.tema || "General";
        if (!grouped[tema]) grouped[tema] = [];
        grouped[tema].push(q);
    });

    // Mezclar cada grupo internamente con Fisher-Yates
    Object.keys(grouped).forEach(tema => {
        grouped[tema] = shuffleArray(grouped[tema]);
    });

    // Mezclar también el orden de los temas para que el round-robin
    // no siga siempre la misma secuencia predecible
    const temasDisponibles = shuffleArray(Object.keys(grouped));

    // Seleccionar round-robin desde temas ya mezclados
    const finalSelection = [];
    let currentTemaIdx = 0;
    while (finalSelection.length < state.config.numQuestions && temasDisponibles.length > 0) {
        const temaIndex = currentTemaIdx % temasDisponibles.length;
        const tema = temasDisponibles[temaIndex];

        if (grouped[tema].length > 0) {
            finalSelection.push(grouped[tema].shift());
            currentTemaIdx++;
        } else {
            temasDisponibles.splice(temaIndex, 1);
        }
    }

    // Paso de "deaglomeración": evitar que dos preguntas consecutivas
    // sean del mismo tema intercambiándolas con otra posición aleatoria
    for (let i = 1; i < finalSelection.length; i++) {
        const prevTema = finalSelection[i - 1].tema || "General";
        const currTema = finalSelection[i].tema || "General";
        if (prevTema === currTema) {
            // Buscar una posición diferente para intercambiar
            const candidates = [];
            for (let j = i + 1; j < finalSelection.length; j++) {
                const jTema = finalSelection[j].tema || "General";
                if (jTema !== currTema) candidates.push(j);
            }
            if (candidates.length > 0) {
                const swapIdx = candidates[Math.floor(Math.random() * candidates.length)];
                [finalSelection[i], finalSelection[swapIdx]] = [finalSelection[swapIdx], finalSelection[i]];
            }
        }
    }

    // Shuffle final robusto para eliminar cualquier patrón residual
    filteredQuestions = shuffleArray(finalSelection);

    // Preparar preguntas con opciones mezcladas para cada una
    state.examQuestions = filteredQuestions.map(q => {
        return {
            ...q,
            opcionesMezcladas: shuffleArray(q.opciones)
        };
    });

    // Resetear estado del examen
    state.userAnswers = new Array(state.config.numQuestions).fill(null);
    state.currentQuestionIndex = 0;
    state.timeRemaining = state.config.timeLimit * 60;
    state.timeUsed = 0;

    // Configurar UI
    DOM.exam.areaBadge.textContent = state.config.area;
    
    // Cambiar a pantalla del examen
    switchScreen('exam');
    renderQuestion();
    startTimer();

    // Asignar eventos de navegación
    DOM.exam.prevBtn.onclick = () => navigateQuestion(-1);
    DOM.exam.nextBtn.onclick = () => navigateQuestion(1);
    DOM.exam.submitBtn.onclick = finishExam;

    // =============================================
    // INICIAR SISTEMA DE MONITOREO ANTI-TRAMPAS
    // =============================================
    initProctoring();
}

/**
 * Renderiza la pregunta actual en la interfaz.
 * Actualiza el contador, los botones de navegación, el contexto y las opciones.
 */
function renderQuestion() {
    const index = state.currentQuestionIndex;
    const question = state.examQuestions[index];

    // Actualizar contador de pregunta
    DOM.exam.counter.textContent = `Pregunta ${index + 1} de ${state.config.numQuestions}`;

    // Actualizar visibilidad de botones de navegación
    DOM.exam.prevBtn.disabled = index === 0;
    
    if (index === state.config.numQuestions - 1) {
        DOM.exam.nextBtn.classList.add('hidden');
        DOM.exam.submitBtn.classList.remove('hidden');
    } else {
        DOM.exam.nextBtn.classList.remove('hidden');
        DOM.exam.submitBtn.classList.add('hidden');
    }

    // Renderizar contexto de la pregunta (si existe)
    let contextContainer = document.getElementById('context-container');
    if (!contextContainer) {
        contextContainer = document.createElement('div');
        contextContainer.id = 'context-container';
        contextContainer.className = 'context-text';
        DOM.exam.questionText.parentNode.insertBefore(contextContainer, DOM.exam.questionText);
    }
    
    if (question.contexto) {
        contextContainer.textContent = question.contexto;
        contextContainer.classList.remove('hidden');
    } else {
        contextContainer.classList.add('hidden');
    }

    // Renderizar texto de la pregunta
    DOM.exam.questionText.textContent = `${index + 1}. ${question.pregunta}`;

    // Renderizar opciones de respuesta
    DOM.exam.optionsContainer.innerHTML = '';
    
    // Detectar si es una pregunta de comparación ortográfica
    const isOrtografia = question.tipo === 'comparacion_ortografica';
    if (isOrtografia) {
        DOM.exam.optionsContainer.classList.add('ortografia-options');
        // Añadir badge instructivo
        const badge = document.createElement('p');
        badge.className = 'ortografia-badge';
        badge.textContent = '📝 Compara las versiones y selecciona la correctamente escrita:';
        DOM.exam.optionsContainer.appendChild(badge);
    } else {
        DOM.exam.optionsContainer.classList.remove('ortografia-options');
    }

    const alphabet = ['A', 'B', 'C', 'D', 'E'];
    question.opcionesMezcladas.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = isOrtografia ? 'option-btn option-ortografica' : 'option-btn';
        
        if (isOrtografia) {
            // Mostrar letra + texto en dos spans para mejor legibilidad comparativa
            btn.innerHTML = `<span class="opt-letter">${alphabet[i]}</span><span class="opt-text">${opt}</span>`;
        } else {
            btn.textContent = opt;
        }
        
        // Mantener selección previa si el usuario ya eligió esta opción
        if (state.userAnswers[index] === opt) {
            btn.classList.add('selected');
        }

        btn.onclick = () => selectOption(opt);
        DOM.exam.optionsContainer.appendChild(btn);
    });

    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

/**
 * Registra la opción seleccionada por el usuario y actualiza la interfaz.
 * @param {string} selectedOpt - Texto de la opción seleccionada
 */
function selectOption(selectedOpt) {
    state.userAnswers[state.currentQuestionIndex] = selectedOpt;
    renderQuestion();
}

/**
 * Navega entre preguntas del examen.
 * @param {number} direction - Dirección del movimiento (-1 = anterior, +1 = siguiente)
 */
function navigateQuestion(direction) {
    state.currentQuestionIndex += direction;
    renderQuestion();
}

// ============================================
// TEMPORIZADOR DEL EXAMEN
// ============================================

/**
 * Inicia el temporizador del examen.
 * Actualiza la interfaz cada segundo y activa alerta visual cuando quedan 60 segundos.
 */
function startTimer() {
    DOM.exam.timer.textContent = formatTime(state.timeRemaining);
    DOM.exam.timerContainer.classList.remove('timer-warning');

    // Limpiar intervalo previo si existe
    clearInterval(state.timerInterval);
    
    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        state.timeUsed++;
        
        DOM.exam.timer.textContent = formatTime(state.timeRemaining);

        // Alerta visual de tiempo bajo (menos de 1 minuto)
        if (state.timeRemaining <= 60) {
            DOM.exam.timerContainer.classList.add('timer-warning');
        }

        // Tiempo agotado: entregar examen automáticamente
        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            alert("¡Se acabó el tiempo! Entregando examen automáticamente.");
            finishExam();
        }
    }, 1000);
}

// ============================================
// REPORTE Y FEEDBACK FINAL
// ============================================

/**
 * Finaliza el examen: calcula el puntaje, genera el reporte visual y muestra la pantalla de resultados.
 * También detiene el monitoreo de cámara si está activo.
 */
function finishExam() {
    clearInterval(state.timerInterval);
    
    // Detener el sistema de monitoreo al finalizar el examen
    if (window.proctoring) {
        window.proctoring.stop();
        
        // Renderizar reporte de proctoring
        const report = window.proctoring.getReport();
        if (report.infractions && report.infractions.length > 0) {
            DOM.report.proctoringSection.classList.remove('hidden');
            const infractionsHTML = report.infractions.map((inf, i) => `
                <div class="feedback-item incorrect">
                    <div class="feedback-question">Infracción #${i + 1}: ${inf.reason}</div>
                    <div class="feedback-answers">
                        <div class="user-ans">Tiempo detectado: ${formatTime(inf.time)}</div>
                    </div>
                    ${inf.image ? `<img src="${inf.image}" style="max-width: 100%; border-radius: 8px; margin-top: 10px;" alt="Evidencia de infracción">` : ''}
                </div>
            `).join('');
            DOM.report.proctoringList.innerHTML = infractionsHTML;
        }
    }
    
    // Calcular puntaje
    let correctCount = 0;
    const feedbackHTML = state.examQuestions.map((q, i) => {
        const userAns = state.userAnswers[i];
        const isCorrect = userAns === q.correcta;
        if (isCorrect) correctCount++;

        return `
            <div class="feedback-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-question">${i + 1}. ${q.pregunta}</div>
                <div class="feedback-answers">
                    <div class="user-ans">Tu respuesta: ${userAns ? userAns : '<span style="color:var(--text-muted)">Sin responder</span>'}</div>
                    ${!isCorrect ? `<div class="correct-ans">Respuesta correcta: ${q.correcta}</div>` : ''}
                </div>
                ${!isCorrect ? `
                    <div class="feedback-logic">
                        <strong>Justificación Lógica:</strong><br>
                        ${q.justificacion}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');

    // Actualizar UI del reporte
    const percentage = Math.round((correctCount / state.config.numQuestions) * 100);
    
    DOM.report.scoreText.textContent = `${correctCount}/${state.config.numQuestions}`;
    DOM.report.scorePercentage.textContent = `${percentage}%`;
    DOM.report.timeUsed.textContent = formatTime(state.timeUsed);
    DOM.report.feedbackList.innerHTML = feedbackHTML;

    // Colorear círculo de puntaje según rendimiento
    const circle = document.querySelector('.score-circle');
    if (percentage >= 80) circle.style.backgroundColor = 'var(--success)';
    else if (percentage >= 50) circle.style.backgroundColor = 'var(--warning)';
    else circle.style.backgroundColor = 'var(--error)';

    switchScreen('report');
    
    if (window.MathJax) {
        MathJax.typesetPromise();
    }

    // Botón para reiniciar (recarga completa de la página)
    DOM.report.restartBtn.onclick = () => {
        if (window.proctoring && window.proctoring.clearData) {
            window.proctoring.clearData(); // Liberar memoria de las fotos
        }
        window.location.reload();
    };
}

// ============================================
// ============================================
// SISTEMA DE MONITOREO ANTI-TRAMPAS (PROCTORING)
// ============================================
// ============================================

/**
 * Módulo principal de vigilancia anti-trampas.
 * Utiliza MediaPipe Face Mesh para detectar la orientación de la cabeza
 * en tiempo real y generar alertas cuando se detectan comportamientos sospechosos.
 *
 * Funcionalidades:
 * - Acceso y gestión de la cámara web
 * - Inicialización de MediaPipe Face Mesh (468 landmarks faciales)
 * - Cálculo de ángulos de orientación (Pitch, Yaw, Roll)
 * - Detección de "mirar hacia abajo" (pitch negativo prolongado)
 * - Detección de desaparición del rostro de la cámara
 * - Captura de evidencia fotográfica en canvas
 * - Alertas visuales modales al estudiante
 */
const ProctoringSystem = (() => {

    // ==========================================
    // CONFIGURACIÓN DE UMBRALES
    // ==========================================

    /**
     * Configuración de parámetros de detección.
     * Estos valores determinan la sensibilidad del sistema de vigilancia.
     */
    const CONFIG = {
        // Ángulo pitch (mirar hacia abajo) en grados que se considera sospechoso.
        // Valores negativos indican que el estudiante está mirando hacia abajo.
        PITCH_THRESHOLD: -15,

        // Tiempo mínimo en milisegundos que la cabeza debe estar inclinada
        // hacia abajo para clasificarlo como infracción.
        LOOK_DOWN_DURATION_MS: 2000,

        // Tiempo máximo permitido sin detectar ningún rostro en la cámara
        // antes de clasificarlo como infracción (en milisegundos).
        FACE_MISSING_DURATION_MS: 2000,

        // Intervalo de procesamiento de frames en milisegundos.
        // Controla la frecuencia con la que se analizan los frames de video.
        PROCESS_INTERVAL_MS: 200,

        // Número máximo de infracciones antes de una alerta especial.
        MAX_VIOLATIONS_BEFORE_WARNING: 3
    };

    // ==========================================
    // VARIABLES DE ESTADO DEL MÓDULO
    // ==========================================

    /** @type {MediaStream|null} Stream de la cámara */
    let cameraStream = null;

    /** @type {Camera|null} Instancia de Camera de MediaPipe */
    let mpCamera = null;

    /** @type {FaceMesh|null} Instancia de Face Mesh de MediaPipe */
    let faceMesh = null;

    /** @type {boolean} Indica si el sistema está activo y procesando frames */
    let isActive = false;

    /** @type {number} Contador total de infracciones detectadas */
    let violationCount = 0;

    /** @type {number|null} Timestamp de cuándo comenzó la行为 sospechosa actual (mirar hacia abajo) */
    let lookDownStartTime = null;

    /** @type {number|null} Timestamp de cuándo se perdió el último rostro detectado */
    let faceLostStartTime = null;

    /** @type {boolean} Bandera para evitar mostrar múltiples modales simultáneamente */
    let isModalShowing = false;

    /** @type {Array} Almacena las infracciones detectadas para mostrarlas al final */
    let infractions = [];

    // ==========================================
    // REFERENCIAS A ELEMENTOS DEL DOM
    // ==========================================

    /** Elementos del widget de proctoring en la interfaz */
    const elements = {
        widget: document.getElementById('proctor-widget'),
        video: document.getElementById('proctor-video'),
        canvas: document.getElementById('proctor-canvas'),
        statusDot: document.getElementById('status-dot'),
        statusText: document.getElementById('status-text'),
        violationCount: document.getElementById('violation-count'),
        cheatModal: document.getElementById('cheat-alert-modal'),
        modalReason: document.getElementById('modal-reason'),
        modalDismissBtn: document.getElementById('modal-dismiss-btn'),
        cameraErrorModal: document.getElementById('camera-error-modal'),
        cameraErrorMessage: document.getElementById('camera-error-message'),
        cameraErrorBtn: document.getElementById('camera-error-btn'),
        setupPreview: document.getElementById('setup-camera-preview'),
        setupStatus: document.getElementById('setup-camera-status')
    };

    // ==========================================
    // CÁLCULO DE ORIENTACIÓN DE LA CABEZA
    // ==========================================

    /**
     * Calcula los ángulos de orientación de la cabeza (Pitch, Yaw, Roll)
     * a partir de los landmarks faciales de MediaPipe Face Mesh.
     *
     * Utiliza un método simplificado basado en trigonometría vectorial
     * con puntos clave de la malla facial:
     * - Punto 1 (nariz): Punta de la nariz
     * - Punto 33: Esquina externa del ojo izquierdo
     * - Punto 263: Esquina externa del ojo derecho
     * - Punto 10: Frente (centro superior)
     * - Punto 152: Barbilla
     *
     * @param {Array} landmarks - Array de 468 objetos {x, y, z} normalizados de MediaPipe
     * @returns {Object} Objeto con los ángulos {pitch, yaw, roll} en grados
     */
    function calculateHeadOrientation(landmarks) {
        // Extraer puntos clave de la malla facial
        const noseTip = landmarks[1];        // Punta de la nariz
        const leftEyeOuter = landmarks[33];  // Esquina externa ojo izquierdo
        const rightEyeOuter = landmarks[263]; // Esquina externa ojo derecho
        const forehead = landmarks[10];      // Centro de la frente
        const chin = landmarks[152];         // Centro de la barbilla

        // ========================================
        // CÁLCULO DEL PITCH (inclinación vertical)
        // ========================================
        // Mide cuánto inclina el estudiante la cabeza hacia arriba o hacia abajo.
        // Se calcula comparando la distancia vertical entre nariz y frente
        // versus la distancia vertical entre nariz y barbilla.
        // Un valor negativo indica que la cabeza está inclinada hacia abajo.

        const pitch = Math.atan2(
            noseTip.y - forehead.y,   // Diferencia vertical nariz-frente
            noseTip.z - forehead.z    // Profundidad para mejorar precisión
        ) * (180 / Math.PI);          // Convertir de radianes a grados

        // ========================================
        // CÁLCULO DEL YAW (rotación horizontal)
        // ========================================
        // Mide la rotación de la cabeza hacia la izquierda o derecha.
        // Se calcula usando la diferencia horizontal entre los ojos
        // en relación con la nariz.

        const yaw = Math.atan2(
            noseTip.x - leftEyeOuter.x,  // Diferencia horizontal nariz-ojo izquierdo
            noseTip.z - leftEyeOuter.z   // Profundidad
        ) * (180 / Math.PI);

        // ========================================
        // CÁLCULO DEL ROLL (inclinación lateral)
        // ========================================
        // Mide la inclinación de la cabeza hacia los hombros (como decir "no").
        // Se calcula con el ángulo entre los dos ojos en el plano horizontal.

        const roll = Math.atan2(
            rightEyeOuter.y - leftEyeOuter.y,   // Diferencia vertical entre ojos
            rightEyeOuter.x - leftEyeOuter.x    // Diferencia horizontal entre ojos
        ) * (180 / Math.PI);

        return { pitch, yaw, roll };
    }

    // ==========================================
    // CAPTURA DE EVIDENCIA
    // ==========================================

    /**
     * Captura una imagen del frame actual del video y la guarda en el canvas oculto.
     * Esta imagen sirve como evidencia fotográfica de la infracción detectada.
     *
     * La imagen se genera en formato JPEG con calidad 0.8 y se convierte
     * a una URL de datos (data URL) para facilitar su almacenamiento o envío.
     *
     * @returns {string|null} Data URL de la imagen capturada, o null si hay error
     */
    function captureEvidence() {
        const video = elements.video;
        const canvas = elements.canvas;
        const ctx = canvas.getContext('2d');

        if (!video || !canvas || !ctx) {
            console.error('[Proctoring] No se pueden obtener elementos para captura de evidencia');
            return null;
        }

        try {
            // Establecer dimensiones del canvas iguales al video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Dibujar el frame actual del video en el canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Obtener la imagen como data URL en formato JPEG
            const evidenceDataURL = canvas.toDataURL('image/jpeg', 0.8);

            console.log(`[Proctoring] Evidencia capturada - Infracción #${violationCount}`);
            return evidenceDataURL;
        } catch (error) {
            console.error('[Proctoring] Error al capturar evidencia:', error);
            return null;
        }
    }

    // ==========================================
    // GESTIÓN DE ALERTAS MODALES
    // ==========================================

    /**
     * Registra una infracción en lugar de mostrar un modal de inmediato.
     *
     * @param {string} reason - Descripción del motivo de la alerta
     * @param {string} evidenceUrl - Data URL con la captura
     */
    function recordInfraction(reason, evidenceUrl) {
        infractions.push({
            time: state.timeUsed,
            reason: reason,
            image: evidenceUrl
        });
    }

    /**
     * Muestra el modal de error cuando la cámara no está disponible.
     * Informa al usuario que el monitoreo es obligatorio.
     *
     * @param {string} message - Mensaje descriptivo del error
     */
    function showCameraError(message) {
        elements.cameraErrorMessage.textContent = message;
        elements.cameraErrorModal.classList.remove('hidden');

        elements.cameraErrorBtn.onclick = () => {
            elements.cameraErrorModal.classList.add('hidden');
        };
    }

    // ==========================================
    // ACTUALIZACIÓN DEL ESTADO VISUAL
    // ==========================================

    /**
     * Actualiza el indicador de estado del widget de proctoring.
     * Cambia el color del punto y el texto según la severidad.
     *
     * @param {string} level - Nivel de severidad: 'normal', 'warning', 'danger'
     * @param {string} text - Texto descriptivo del estado
     */
    function updateStatus(level, text) {
        elements.statusDot.className = 'status-dot';
        if (level === 'warning') {
            elements.statusDot.classList.add('warning');
        } else if (level === 'danger') {
            elements.statusDot.classList.add('danger');
        }
        elements.statusText.textContent = text;
    }

    /**
     * Actualiza el contador de infracciones visible en el widget.
     */
    function updateViolationCount() {
        elements.violationCount.textContent = violationCount;
    }

    // ==========================================
    // CALLBACK PRINCIPAL DE DETECCIÓN FACIAL
    // ==========================================

    /**
     * Función callback que se ejecuta cada vez que MediaPipe Face Mesh
     * procesa un frame de video y produce resultados.
     *
     * Evalúa los landmarks faciales para detectar:
     * 1. Cabeza inclinada hacia abajo (pitch bajo prolongado)
     * 2. Rostro desaparecido de la cámara
     *
     * @param {Object} results - Objeto de resultados de MediaPipe Face Mesh
     * @param {Array} results.multiFaceLandmarks - Array de caras detectadas (cada una con 468 landmarks)
     */
    function onFaceMeshResults(results) {
        // Solo procesar si el sistema sigue activo
        if (!isActive) return;

        const currentTime = Date.now();

        // ========================================
        // CASO 1: No se detectó ningún rostro
        // ========================================
        if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
            // Si no habíamos empezado a contar, iniciar el contador
            if (faceLostStartTime === null) {
                faceLostStartTime = currentTime;
                updateStatus('warning', 'Buscando rostro...');
            }

            // Verificar si el tiempo sin rostro excede el umbral
            const faceLostDuration = currentTime - faceLostStartTime;
            if (faceLostDuration >= CONFIG.FACE_MISSING_DURATION_MS) {
                // ¡INFRACCIÓN! Rostro desaparecido por demasiado tiempo
                violationCount++;
                updateViolationCount();
                const evidence = captureEvidence();
                recordInfraction('Rostro no detectado en la cámara', evidence);
                updateStatus('danger', 'Rostro perdido');

                // Resetear el contador de tiempo perdido para evitar alertas repetidas
                faceLostStartTime = currentTime + 5000; // Esperar 5s antes de nueva alerta
            }

            // Resetear el contador de mirar hacia abajo (ya no aplica)
            lookDownStartTime = null;
            return;
        }

        // ========================================
        // CASO 2: Se detectó al menos un rostro
        // ========================================

        // El rostro volvió a detectarse: resetear el contador de ausencia
        if (faceLostStartTime !== null) {
            faceLostStartTime = null;
            updateStatus('normal', 'Monitoreando');
        }

        // Tomar la primera cara detectada (la más cercana a la cámara)
        const landmarks = results.multiFaceLandmarks[0];

        // Calcular orientación de la cabeza
        const orientation = calculateHeadOrientation(landmarks);

        // ========================================
        // DETECCIÓN: Mirando hacia abajo (Pitch bajo)
        // ========================================
        if (orientation.pitch < CONFIG.PITCH_THRESHOLD) {
            // La cabeza está inclinada hacia abajo

            if (lookDownStartTime === null) {
                // Iniciar conteo del tiempo que lleva mirando hacia abajo
                lookDownStartTime = currentTime;
                updateStatus('warning', 'Cabeza inclinada...');
            }

            const lookDownDuration = currentTime - lookDownStartTime;
            if (lookDownDuration >= CONFIG.LOOK_DOWN_DURATION_MS) {
                // ¡INFRACCIÓN! Mirando hacia abajo por más de 2 segundos
                violationCount++;
                updateViolationCount();
                const evidence = captureEvidence();
                recordInfraction('Cabeza inclinada hacia abajo por tiempo prolongado', evidence);
                updateStatus('danger', 'Infracción detectada');

                // Resetear para evitar alertas repetidas
                lookDownStartTime = currentTime + 5000; // Esperar 5s antes de nueva alerta
            }
        } else {
            // La cabeza está en una posición normal: resetear el contador
            if (lookDownStartTime !== null) {
                lookDownStartTime = null;
                updateStatus('normal', 'Monitoreando');
            }
        }
    }

    // ==========================================
    // INICIALIZACIÓN DE MEDIAPIPE FACE MESH
    // ==========================================

    /**
     * Inicializa el modelo Face Mesh de MediaPipe con la configuración necesaria.
     * Configura los parámetros de detección y establece el callback de resultados.
     *
     * @returns {Promise<FaceMesh>} Instancia de Face Mesh inicializada
     */
    async function initFaceMesh() {
        console.log('[Proctoring] Inicializando MediaPipe Face Mesh...');

        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                // Cargar los archivos del modelo desde el CDN de MediaPipe
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });

        // Configurar parámetros del modelo
        faceMesh.setOptions({
            maxNumFaces: 1,              // Detectar solo 1 cara (más eficiente)
            refineLandmarks: true,       // Activar refinamiento de landmarks para mayor precisión
            minDetectionConfidence: 0.5, // Confianza mínima para considerar una detección válida
            minTrackingConfidence: 0.5   // Confianza mínima para mantener el tracking entre frames
        });

        // Establecer la función callback que procesará cada frame
        faceMesh.onResults(onFaceMeshResults);

        console.log('[Proctoring] Face Mesh inicializado correctamente');
        return faceMesh;
    }

    // ==========================================
    // ACCESO A LA CÁMARA
    // ==========================================

    /**
     * Solicita acceso a la cámara web del dispositivo.
     * Maneja errores comunes como permiso denegado o cámara no disponible.
     *
     * @returns {Promise<MediaStream>} Stream de la cámara
     * @throws {Error} Si no se puede acceder a la cámara
     */
    async function requestCameraAccess() {
        console.log('[Proctoring] Solicitando acceso a la cámara...');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 320 },   // Resolución baja para mejor rendimiento
                    height: { ideal: 240 },
                    facingMode: 'user'        // Cámara frontal preferida
                },
                audio: false  // No necesitamos audio para detección facial
            });

            console.log('[Proctoring] Acceso a cámara concedido');
            return stream;

        } catch (error) {
            // Manejar diferentes tipos de errores de cámara
            let message = '';

            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                message = 'Permiso de cámara denegado. Para continuar con el examen, debes permitir el acceso a la cámara en la configuración de tu navegador.';
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                message = 'No se encontró ninguna cámara en este dispositivo. El examen requiere una cámara web para el monitoreo.';
            } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                message = 'La cámara está siendo usada por otra aplicación. Cierra otros programas que puedan estar usando la cámara.';
            } else {
                message = `Error inesperado al acceder a la cámara: ${error.message}`;
            }

            console.error('[Proctoring] Error de cámara:', error);
            throw new Error(message);
        }
    }

    // ==========================================
    // FUNCIONES PÚBLICAS (INTERFAZ DEL MÓDULO)
    // ==========================================

    /**
     * Inicia el preview de la cámara en la pantalla de setup
     */
    async function initPreview() {
        try {
            if (!cameraStream) {
                cameraStream = await requestCameraAccess();
            }
            if (elements.setupPreview) {
                elements.setupPreview.srcObject = cameraStream;
                if (elements.setupStatus) {
                    elements.setupStatus.textContent = "Cámara lista. Preparado para el examen.";
                    elements.setupStatus.style.color = "var(--success)";
                }
            }
        } catch (error) {
            if (elements.setupStatus) {
                elements.setupStatus.textContent = "Error: " + error.message;
                elements.setupStatus.style.color = "var(--error)";
            }
        }
    }

    /**
     * Inicializa y arranca todo el sistema de monitoreo anti-trampas.
     * Este es el punto de entrada principal que coordina:
     * 1. Acceso a la cámara
     * 2. Inicialización de MediaPipe Face Mesh
     * 3. Inicio del procesamiento de frames en tiempo real
     *
     * Se ejecuta automáticamente cuando el examen comienza.
     */
    async function start() {
        try {
            console.log('[Proctoring] Iniciando sistema de monitoreo...');

            // Paso 1: Solicitar acceso a la cámara si no lo tenemos aún
            if (!cameraStream) {
                cameraStream = await requestCameraAccess();
            }

            // Paso 2: Asignar el stream al elemento de video
            elements.video.srcObject = cameraStream;
            await elements.video.play();

            // Paso 3: Inicializar MediaPipe Face Mesh
            faceMesh = await initFaceMesh();

            // Paso 4: Mostrar el widget de la cámara flotante en la esquina superior derecha
            if (elements.widget) {
                elements.widget.classList.remove('hidden');
            }

            // Paso 5: Configurar el intervalo de procesamiento de frames
            // Usamos Camera de MediaPipe para sincronizar el procesamiento
            mpCamera = new Camera(elements.video, {
                onFrame: async () => {
                    if (isActive && faceMesh) {
                        try {
                            await faceMesh.send({ image: elements.video });
                        } catch (err) {
                            // Silenciar errores de procesamiento individuales
                            // para no interrumpir el flujo continuo
                        }
                    }
                },
                width: 320,
                height: 240
            });

            // Paso 6: Activar el sistema
            isActive = true;
            await mpCamera.start();

            console.log('[Proctoring] Sistema de monitoreo activo y procesando frames');
            updateStatus('normal', 'Monitoreando');

        } catch (error) {
            console.error('[Proctoring] Error al iniciar monitoreo:', error);
            // Mostrar error al usuario y permitir continuar (o no, según política)
            showCameraError(error.message || 'No se pudo iniciar el sistema de monitoreo.');
        }
    }

    /**
     * Detiene el sistema de monitoreo y libera los recursos de la cámara.
     * Se ejecuta al finalizar el examen o cuando se necesita desactivar la vigilancia.
     */
    function stop() {
        console.log('[Proctoring] Deteniendo sistema de monitoreo...');
        isActive = false;

        // Detener la cámara de MediaPipe
        if (mpCamera) {
            mpCamera.stop();
            mpCamera = null;
        }

        // Cerrar Face Mesh
        if (faceMesh) {
            faceMesh.close();
            faceMesh = null;
        }

        // Detener todos los tracks del stream de la cámara
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }

        // Ocultar el widget de proctoring
        elements.widget.classList.add('hidden');

        console.log('[Proctoring] Sistema detenido. Total de infracciones:', violationCount);
    }

    /**
     * Obtiene el reporte completo de monitoreo para enviar al servidor.
     * Incluye el conteo de infracciones y los timestamps de cada evento.
     *
     * @returns {Object} Objeto con el reporte de proctoring
     */
    function getReport() {
        return {
            totalViolations: violationCount,
            infractions: infractions,
            isActive: isActive,
            duration: state.timeUsed,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Limpia explícitamente los datos almacenados en memoria (como las capturas Base64)
     * para evitar sobrecargar la RAM del navegador.
     */
    function clearData() {
        infractions = [];
        violationCount = 0;
        console.log('[Proctoring] Datos de memoria liberados.');
    }

    // Exponer la interfaz pública del módulo
    return {
        initPreview,
        start,
        stop,
        getReport,
        clearData
    };
})();

// Hacer accesible el módulo de proctoring globalmente
// para que pueda ser detenido desde finishExam()

// ============================================
// INTEGRACIÓN CON SUPABASE (AUTH & COMUNIDAD)
// ============================================

// Referencias extra para el DOM
Object.assign(DOM.nav, {
    comunidad: document.getElementById('nav-comunidad'),
    authLoginBtn: document.getElementById('auth-login-btn'),
    authUserInfo: document.getElementById('auth-user-info'),
    authUserAvatar: document.getElementById('auth-user-avatar'),
    authUserName: document.getElementById('auth-user-name'),
    authLogoutBtn: document.getElementById('auth-logout-btn')
});

Object.assign(DOM.screens, {
    community: document.getElementById('community-screen')
});

const ExtraDOM = {
    authModal: {
        container: document.getElementById('auth-modal'),
        closeBtn: document.getElementById('auth-modal-close'),
        form: document.getElementById('auth-form'),
        tabLogin: document.getElementById('tab-login'),
        tabRegister: document.getElementById('tab-register'),
        groupUsername: document.getElementById('group-username'),
        username: document.getElementById('auth-username'),
        email: document.getElementById('auth-email'),
        password: document.getElementById('auth-password'),
        errorMsg: document.getElementById('auth-error-msg'),
        submitBtn: document.getElementById('auth-submit-btn')
    },
    reportModal: {
        container: document.getElementById('report-modal'),
        closeBtn: document.getElementById('report-modal-close'),
        form: document.getElementById('report-form'),
        reason: document.getElementById('report-reason'),
        details: document.getElementById('report-details'),
        openBtn: document.getElementById('report-question-btn')
    },
    community: {
        averagesContainer: document.getElementById('global-averages-container'),
        feedContainer: document.getElementById('global-community-feed'),
        guideFeed: document.getElementById('guide-community-feed'),
        btnNewNote: document.getElementById('btn-new-note')
    }
};

let currentAuthMode = 'login'; // 'login' | 'register'

document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar Auth Service
    if (window.authService) {
        await authService.init();
        authService.onAuthChange(updateAuthUI);
        updateAuthUI(authService.currentUser);
    }

    // Configurar Navegación a Comunidad
    if (DOM.nav.comunidad) {
        DOM.nav.comunidad.addEventListener('click', () => {
            switchScreen('community');
            DOM.nav.simulador.classList.remove('active');
            DOM.nav.guias.classList.remove('active');
            DOM.nav.comunidad.classList.add('active');
            loadCommunityStats();
        });
    }

    // Al hacer click en otras tabs, desactivar la de comunidad
    DOM.nav.simulador.addEventListener('click', () => DOM.nav.comunidad?.classList.remove('active'));
    DOM.nav.guias.addEventListener('click', () => DOM.nav.comunidad?.classList.remove('active'));

    // Configurar Modal Auth
    DOM.nav.authLoginBtn?.addEventListener('click', () => {
        ExtraDOM.authModal.container.classList.remove('hidden');
    });

    ExtraDOM.authModal.closeBtn?.addEventListener('click', () => {
        ExtraDOM.authModal.container.classList.add('hidden');
    });

    DOM.nav.authLogoutBtn?.addEventListener('click', async () => {
        try {
            await authService.signOut();
        } catch (e) {
            console.error("Error al salir", e);
        }
    });

    ExtraDOM.authModal.tabLogin?.addEventListener('click', () => setAuthMode('login'));
    ExtraDOM.authModal.tabRegister?.addEventListener('click', () => setAuthMode('register'));

    ExtraDOM.authModal.form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        ExtraDOM.authModal.errorMsg.classList.add('hidden');
        ExtraDOM.authModal.submitBtn.disabled = true;
        ExtraDOM.authModal.submitBtn.textContent = 'Procesando...';

        const email = ExtraDOM.authModal.email.value;
        const password = ExtraDOM.authModal.password.value;
        const username = ExtraDOM.authModal.username.value;

        try {
            if (currentAuthMode === 'login') {
                await authService.signIn(email, password);
            } else {
                await authService.signUp(email, password, username);
            }
            ExtraDOM.authModal.container.classList.add('hidden');
            ExtraDOM.authModal.form.reset();
        } catch (err) {
            ExtraDOM.authModal.errorMsg.textContent = err.message || "Error al autenticar";
            ExtraDOM.authModal.errorMsg.classList.remove('hidden');
        } finally {
            ExtraDOM.authModal.submitBtn.disabled = false;
            ExtraDOM.authModal.submitBtn.textContent = 'Ingresar';
        }
    });

    // Configurar Modal Reporte
    ExtraDOM.reportModal.openBtn?.addEventListener('click', () => {
        ExtraDOM.reportModal.container.classList.remove('hidden');
    });

    ExtraDOM.reportModal.closeBtn?.addEventListener('click', () => {
        ExtraDOM.reportModal.container.classList.add('hidden');
    });

    ExtraDOM.reportModal.form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const reason = ExtraDOM.reportModal.reason.value;
        const details = ExtraDOM.reportModal.details.value;
        const qIndex = state.currentQuestionIndex;
        const qId = state.examQuestions[qIndex]?.id || 'unknown';

        try {
            await communityService.reportQuestion(
                authService.currentUser?.id || null, 
                qId, 
                reason, 
                details
            );
            alert("¡Gracias por tu reporte! Hemos registrado el problema.");
            ExtraDOM.reportModal.container.classList.add('hidden');
            ExtraDOM.reportModal.form.reset();
        } catch (err) {
            alert("Error al enviar el reporte. Intenta de nuevo.");
        }
    });

    // Listener para la carga de contenido en Guías (Interceptar la tab de Comunidad)
    DOM.nav.tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Si el tab clickeado no es de la vista interna de guías, sino la principal
            // No hacemos nada extra.
        });
    });

    // Delegación de eventos para las pestañas internas de la guía
    document.querySelector('.guide-internal-tabs')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('g-tab-btn')) {
            const targetId = e.target.dataset.target;
            if (targetId === 'guide-community') {
                loadCommunityNotesForGuide();
            }
        }
    });

    // Hook a finishExam original para guardar datos
    const originalFinishExam = window.finishExam || finishExam;
    window.finishExam = async function() {
        originalFinishExam(); // Ejecutar lógica original
        
        // Guardar resultado en Supabase si está logueado
        if (authService.isLoggedIn()) {
            const area = state.config.area;
            const totalQuestions = state.config.numQuestions;
            let correctCount = 0;
            state.examQuestions.forEach((q, i) => {
                if (state.userAnswers[i] === q.correcta) correctCount++;
            });
            
            try {
                await communityService.saveExamResult(
                    authService.currentUser.id,
                    area,
                    correctCount,
                    totalQuestions,
                    state.timeUsed
                );
                
                // Mostrar alerta sutil (opcional)
                console.log("Resultado guardado en la comunidad.");
            } catch (err) {
                console.error("No se pudo guardar el resultado", err);
            }
        }
    };

    // Botón crear nota
    ExtraDOM.community.btnNewNote?.addEventListener('click', async () => {
        if (!authService.isLoggedIn()) {
            alert("Inicia sesión para compartir una nota o experiencia.");
            ExtraDOM.authModal.container.classList.remove('hidden');
            return;
        }

        const type = prompt("Tipo de nota (truco/experiencia/explicacion):", "truco");
        if (!type) return;
        const content = prompt("Escribe tu anotación (apoya a la comunidad!):");
        if (!content) return;

        const currentTopic = document.getElementById('guide-detail-title').textContent;
        const user = authService.getUserData();

        try {
            await communityService.addNote(user.id, user.username, currentTopic, 'Guía', type, content);
            alert("¡Nota publicada exitosamente!");
            loadCommunityNotesForGuide();
        } catch (e) {
            alert("Error al publicar nota.");
        }
    });
});

function setAuthMode(mode) {
    currentAuthMode = mode;
    if (mode === 'login') {
        ExtraDOM.authModal.tabLogin.classList.add('active');
        ExtraDOM.authModal.tabRegister.classList.remove('active');
        ExtraDOM.authModal.groupUsername.classList.add('hidden');
        ExtraDOM.authModal.username.removeAttribute('required');
    } else {
        ExtraDOM.authModal.tabRegister.classList.add('active');
        ExtraDOM.authModal.tabLogin.classList.remove('active');
        ExtraDOM.authModal.groupUsername.classList.remove('hidden');
        ExtraDOM.authModal.username.setAttribute('required', 'true');
    }
}

function updateAuthUI(user) {
    if (user) {
        DOM.nav.authLoginBtn.classList.add('hidden');
        DOM.nav.authUserInfo.classList.remove('hidden');
        const userData = authService.getUserData();
        DOM.nav.authUserName.textContent = userData.username;
        if (user.user_metadata?.avatar_url) {
            DOM.nav.authUserAvatar.src = user.user_metadata.avatar_url;
        } else {
            DOM.nav.authUserAvatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
        }
    } else {
        DOM.nav.authLoginBtn.classList.remove('hidden');
        DOM.nav.authUserInfo.classList.add('hidden');
    }
}

async function loadCommunityStats() {
    if (!authService.isLoggedIn()) {
        ExtraDOM.community.averagesContainer.innerHTML = '<p class="empty-state">Inicia sesión para ver las estadísticas globales.</p>';
        return;
    }
    
    ExtraDOM.community.averagesContainer.innerHTML = '<p>Cargando promedios...</p>';
    
    const areas = ["Razonamiento Lógico Numérico", "Razonamiento Verbal", "Ciencia y Tecnología", "Cultura General"];
    let html = '';
    
    for (const area of areas) {
        const avg = await communityService.getCommunityAverage(area);
        html += `
            <div class="average-card">
                <h4>${area}</h4>
                <div class="average-score">${avg}%</div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${avg}%"></div>
                </div>
            </div>
        `;
    }
    
    ExtraDOM.community.averagesContainer.innerHTML = html;
}

async function loadCommunityNotesForGuide() {
    const topicTitle = document.getElementById('guide-detail-title').textContent;
    ExtraDOM.community.guideFeed.innerHTML = '<p>Cargando anotaciones de la comunidad...</p>';
    
    try {
        const notes = await communityService.getNotesForTopic(topicTitle);
        
        if (notes.length === 0) {
            ExtraDOM.community.guideFeed.innerHTML = '<p class="empty-state">No hay notas para este tema aún. ¡Sé el primero en compartir!</p>';
            return;
        }

        const html = notes.map(note => `
            <div class="note-card">
                <div class="note-header">
                    <span class="note-author">${note.author_name}</span>
                    <span class="note-type ${note.note_type}">${note.note_type}</span>
                </div>
                <div class="note-content">${note.content}</div>
                <div class="note-footer">
                    <button class="btn-like" onclick="likeNote('${note.id}', ${note.likes_count})">
                        👍 Me sirvió (${note.likes_count})
                    </button>
                </div>
            </div>
        `).join('');
        
        ExtraDOM.community.guideFeed.innerHTML = html;
    } catch (e) {
        ExtraDOM.community.guideFeed.innerHTML = '<p class="error-message">Error al cargar notas.</p>';
    }
}

window.likeNote = async function(noteId, currentLikes) {
    if (!authService.isLoggedIn()) {
        alert("Debes iniciar sesión para valorar notas.");
        return;
    }
    try {
        await communityService.likeNote(noteId, currentLikes);
        loadCommunityNotesForGuide(); // Refrescar lista
    } catch (e) {
        alert("Error al dar me gusta.");
    }
};window.proctoring = ProctoringSystem;

/**
 * Función de inicialización del proctoring.
 * Se llama al inicio del examen desde startSimulation().
 * Verifica que las librerías de MediaPipe estén disponibles antes de iniciar.
 */
function initProctoring() {
    // Verificar que MediaPipe esté cargado correctamente
    if (typeof FaceMesh === 'undefined' || typeof Camera === 'undefined') {
        console.warn('[Proctoring] MediaPipe no está cargado. Intentando recargar...');
        
        // Mostrar advertencia al usuario
        const errorMsg = 'Las librerías de reconocimiento facial no se pudieron cargar. ' +
            'El examen continuará sin monitoreo. Verifica tu conexión a internet.';
        
        // Dar un segundo intento antes de rendirse
        setTimeout(() => {
            if (typeof FaceMesh === 'undefined') {
                alert(errorMsg);
                console.error('[Proctoring] MediaPipe Face Mesh no disponible');
            } else {
                ProctoringSystem.start();
            }
        }, 2000);
        return;
    }

    // Iniciar el sistema de monitoreo
    ProctoringSystem.start();
}
