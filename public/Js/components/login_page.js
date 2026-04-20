export default {
    template: `
    <div class="login-page">

        <div class="login-card">
            <h1 class="login-title">Artist Portfolio</h1>
            <p class="login-subtitle">Please sign in to continue</p>

            <button class="google-btn" @click="$emit('login')">
                Sign in with Google
            </button>
        </div>

    </div>
    `
}