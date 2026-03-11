<template>

<div class="navbar">

<h2>RevelandoTudo</h2>

<div class="links">

<template v-if="role === 'admin'">
  <router-link to="/admin">Dashboard</router-link>
</template>

<template v-else-if="role === 'student'">
  <router-link to="/student">Ações Institucionais</router-link>
</template>

<button class="btn-logout" @click="logout">Sair</button>

</div>

</div>

</template>

<script>

export default {
name: "Navbar",

computed: {
  role() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return user.role || null
  }
},

methods: {
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.$router.push("/")
  }
}

}

</script>

<style>

.navbar{
display:flex;
justify-content:space-between;
align-items:center;
padding:20px;
background:#2c3e50;
color:white;
}

.links a{
margin-left:20px;
color:white;
text-decoration:none;
}

.links a:hover {
text-decoration: underline;
}

.btn-logout {
margin-left: 20px;
background: rgba(255,255,255,0.15);
color: white;
border: 1px solid rgba(255,255,255,0.3);
border-radius: 6px;
padding: 5px 14px;
cursor: pointer;
font-size: 0.85rem;
transition: background 0.2s;
}

.btn-logout:hover {
background: rgba(255,255,255,0.25);
}

</style>