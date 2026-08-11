/**
 * Cliente de Supabase y Configuración
 * Permite conexión con el backend de Supabase o provee un Mock (simulación local) si no hay credenciales.
 */

// NOTA: Reemplaza estas variables con las de tu proyecto en Supabase (Settings -> API)
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

let supabaseClient = null;
const isSupabaseConfigured = SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';

if (isSupabaseConfigured && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase Client Initialized");
} else {
    console.warn("Supabase no está configurado o el script de Supabase no cargó. Funcionando en Modo Local (Mock).");
    
    // Mock local de Supabase para desarrollo sin credenciales
    supabaseClient = {
        auth: {
            signUp: async ({email, password, options}) => {
                const user = { id: 'mock-uuid', email, user_metadata: options?.data };
                localStorage.setItem('mock_user', JSON.stringify(user));
                return { data: { user }, error: null };
            },
            signInWithPassword: async ({email, password}) => {
                const user = { id: 'mock-uuid', email, user_metadata: { username: email.split('@')[0] } };
                localStorage.setItem('mock_user', JSON.stringify(user));
                return { data: { user }, error: null };
            },
            signOut: async () => {
                localStorage.removeItem('mock_user');
                return { error: null };
            },
            getSession: async () => {
                const user = JSON.parse(localStorage.getItem('mock_user'));
                return { data: { session: user ? { user } : null }, error: null };
            },
            onAuthStateChange: (callback) => {
                return { data: { subscription: { unsubscribe: () => {} } } };
            }
        },
        from: (table) => {
            return {
                select: async () => {
                    const data = JSON.parse(localStorage.getItem(`mock_${table}`)) || [];
                    return { data, error: null };
                },
                insert: async (payload) => {
                    const data = JSON.parse(localStorage.getItem(`mock_${table}`)) || [];
                    const newData = Array.isArray(payload) ? payload : [payload];
                    const processed = newData.map(item => ({ ...item, id: Math.random().toString(), created_at: new Date().toISOString() }));
                    localStorage.setItem(`mock_${table}`, JSON.stringify([...data, ...processed]));
                    return { data: processed, error: null };
                }
            };
        }
    };
}

window.supabaseClient = supabaseClient;
window.isSupabaseConfigured = isSupabaseConfigured;
