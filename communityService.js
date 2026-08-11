/**
 * Servicio de Comunidad
 * Gestiona estadísticas (promedios), anotaciones/experiencias y el sistema de reportes.
 */

class CommunityService {
    constructor() {
        this.supabase = window.supabaseClient;
    }

    /**
     * Sanitiza un string para prevenir ataques XSS.
     * Reemplaza caracteres HTML especiales.
     */
    sanitizeHTML(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // ============================================
    // ESTADÍSTICAS Y PROMEDIOS
    // ============================================

    /**
     * Guarda el resultado de un examen en la comunidad.
     */
    async saveExamResult(userId, area, score, totalQuestions, timeUsedSeconds) {
        if (!userId) return; // Solo invitados no guardan
        const percentage = (score / totalQuestions) * 100;
        
        const { error } = await this.supabase
            .from('exam_results')
            .insert([{
                user_id: userId,
                area,
                score,
                total_questions: totalQuestions,
                percentage,
                time_used_seconds: timeUsedSeconds
            }]);

        if (error) {
            console.error("Error guardando resultado:", error);
        }
    }

    /**
     * Obtiene el promedio comunitario para una materia específica.
     */
    async getCommunityAverage(area) {
        const { data, error } = await this.supabase
            .from('exam_results')
            .select('percentage')
            .eq('area', area);

        if (error) {
            console.error("Error obteniendo promedio:", error);
            return 0;
        }

        if (!data || data.length === 0) return 0;
        
        const sum = data.reduce((acc, curr) => acc + parseFloat(curr.percentage), 0);
        return (sum / data.length).toFixed(1);
    }

    // ============================================
    // ANOTACIONES Y EXPERIENCIAS
    // ============================================

    /**
     * Obtiene las notas de la comunidad para un tema específico.
     */
    async getNotesForTopic(topicId) {
        const { data, error } = await this.supabase
            .from('community_notes')
            .select('*')
            .eq('topic_id', topicId)
            .order('likes_count', { ascending: false })
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error obteniendo notas:", error);
            return [];
        }
        return data || [];
    }

    /**
     * Publica una nueva nota.
     */
    async addNote(userId, authorName, topicId, area, noteType, content) {
        if (!userId) throw new Error("Debes iniciar sesión para publicar");

        const sanitizedContent = this.sanitizeHTML(content);

        const { data, error } = await this.supabase
            .from('community_notes')
            .insert([{
                user_id: userId,
                author_name: authorName,
                topic_id: topicId,
                area,
                note_type: noteType,
                content: sanitizedContent
            }])
            .select();

        if (error) throw error;
        return data[0];
    }

    /**
     * Incrementa el contador "Me sirvió" de una nota.
     */
    async likeNote(noteId, currentLikes) {
        const { data, error } = await this.supabase
            .from('community_notes')
            .update({ likes_count: currentLikes + 1 })
            .eq('id', noteId)
            .select();

        if (error) {
            console.error("Error dando like:", error);
            throw error;
        }
        return data[0];
    }

    // ============================================
    // SISTEMA DE REPORTES (EJERCICIOS DEFECTUOSOS)
    // ============================================

    /**
     * Reporta un ejercicio con errores o irresoluble.
     */
    async reportQuestion(userId, questionId, reason, details) {
        const sanitizedDetails = this.sanitizeHTML(details);

        const { data, error } = await this.supabase
            .from('question_reports')
            .insert([{
                user_id: userId, // Puede ser null si permitimos reportes anónimos, pero preferible con user
                question_id: questionId,
                reason,
                details: sanitizedDetails
            }]);

        if (error) {
            console.error("Error reportando pregunta:", error);
            throw error;
        }
        return true;
    }
}

window.communityService = new CommunityService();
