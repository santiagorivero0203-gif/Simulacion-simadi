/**
 * Servicio de Autenticación
 * Maneja el registro, inicio de sesión y estado del usuario usando Supabase Auth.
 */

class AuthService {
    constructor() {
        this.supabase = window.supabaseClient;
        this.currentUser = null;
        this.authListeners = [];
    }

    async init() {
        // Obtener la sesión actual al cargar
        const { data: { session }, error } = await this.supabase.auth.getSession();
        
        if (error) {
            console.error("Error obteniendo sesión:", error.message);
        } else if (session) {
            this.currentUser = session.user;
        }

        // Escuchar cambios de sesión (login, logout)
        this.supabase.auth.onAuthStateChange((event, session) => {
            this.currentUser = session ? session.user : null;
            this.notifyListeners();
        });
        
        return this.currentUser;
    }

    async signUp(email, password, username) {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username
                }
            }
        });

        if (error) throw error;
        return data;
    }

    async signIn(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return data;
    }

    async signOut() {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw error;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    getUserData() {
        if (!this.currentUser) return null;
        return {
            id: this.currentUser.id,
            email: this.currentUser.email,
            username: this.currentUser.user_metadata?.username || this.currentUser.email.split('@')[0]
        };
    }

    onAuthChange(callback) {
        this.authListeners.push(callback);
    }

    notifyListeners() {
        this.authListeners.forEach(cb => cb(this.currentUser));
    }
}

window.authService = new AuthService();
