export default {
    template: `
    <div class="login-page">
        <h1> Artist Portfolio</h1>
        <p> Please sign in </p>
        
        <button @click="$emit('login')">Sign in with apple</button>
    </div>
        `
}