<template>
  <div id="container">
    <div class="logo-header">
      <img src="@/assets/logo.png" alt="Logo" />

      <RouterLink to="/" id="titulo">
        <div class="logo-text">
          <span class="central">CENTRAL</span>
          <span class="da-lei">
            <span class="line-left"></span>
            DA LEI
            <span class="line-right"></span>
          </span>
        </div>
      </RouterLink>
    </div>

    <!-- ALERTA DE ERRO -->
    <div v-if="error" class="flash_alerta">
      {{ error }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="card-group">
        <label for="email"><strong>E-mail:</strong></label>
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder="E-mail"
          required
        />
      </div>

      <div class="card-group">
        <label for="senha"><strong>Senha:</strong></label>
        <input
          type="password"
          v-model="senha"
          id="senha"
          placeholder="Senha"
          required
        />
        <div class="forgot-password">
          <a href="#">Esqueceu sua senha?</a>
        </div>
      </div>

      <input type="submit" value="Entrar" id="submit" :disabled="loading" />

      <div class="divider">
        <span>Ou entre com</span>
      </div>

      <div class="social-login">
        <div class="social-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" />
        </div>
        <div class="social-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" />
        </div>
      </div>

      <div class="signup-link">
        Não tem uma conta?
        <RouterLink to="/register">Cadastre-se</RouterLink>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      senha: ''
    }
  },

  computed: {
    ...mapState('auth', ['loading', 'error'])
  },

  methods: {
    ...mapActions('auth', ['login']),

    async handleLogin() {
      try {
        await this.login({
          email: this.email,
          senha: this.senha
        })

        this.$router.push('/dashboard')
      } catch (err) {
        // erro já tratado no vuex
      }
    }
  }
}
</script>

<style scoped>
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0D0D0D 0%, #1a1a2e 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        #container {
            width: 100%;
            max-width: 450px;
            background-color: #1E1E1E;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            overflow: hidden;
        }

 
.logo-text {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.central {
    font-family: 'Georgia', serif;
    font-size: 16px;
    font-weight: bold;
    color: #AA732F;
    letter-spacing: 1px;
}

.da-lei {
    font-family: 'Georgia', serif;
    font-size: 16px;
    font-weight: bold;
    color: #AA732F;
    letter-spacing: 1px;
    display: flex;
    position: relative;
    align-items: flex-start;
    gap: 2px;
}

.line-left, .line-right {
    width: 12px;
    height: 2px;
    background-color: #AA732F;
    margin-top: 0.7em;
    position: relative;
}
.line-left::before, .line-right::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #AA732F, transparent);
}
.line-left::before {
    left: -2px;
}

.line-right::after {
    right: -2px;
}

.logo-header img {
            width: 130px;
            height: 130px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            overflow: hidden;
            background: transparent;
        }

        form {
            padding: 30px;
        }

        .card-group {
            margin-bottom: 20px;
        }

        .card-group label {
            display: block;
            margin-bottom: 8px;
            color: #ddd;
            font-weight: 500;
        }

        .card-group input {
            width: 100%;
            padding: 15px;
            background-color: #1E1E1E;
            border: 0.5px solid #BFA45E;
            border-radius: 8px;
            color: white;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .card-group input:focus {
            border-color: #AA732F;
            outline: none;
            box-shadow: 0 0 0 1px rgba(170, 115, 47, 0.3);
        }

        .card-group input::placeholder {
            color: #888;
        }

        .forgot-password {
            text-align: right;
            margin-top: 5px;
        }

        a#registro {
            color: #c98737;
            font-size: 14px;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        a#titulo{
            text-decoration: none;
        }
        a#registro:hover {
            color: #d69c5c;
            text-decoration: underline;
        }

        input#submit {
          background: linear-gradient(135deg, #6B4D23 0%, #8E6C36 50%, #5A3F1C 100%);
            width: 100%;
            padding: 16px;
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        input#submit:hover {
            background: linear-gradient(135deg, #5A3F1C 0%, #7D5C2D 50%, #493217 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(107, 77, 35, 0.4);
}

        .divider {
            display: flex;
            align-items: center;
            margin: 25px 0;
            color: #666;
            font-size: 14px;
        }

        .divider::before,
        .divider::after {
            content: "";
            flex: 1;
            height: 1px;
            background-color: #444;
        }

        .divider span {
            padding: 0 15px;
        }

        .social-login {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 25px;
        }

        .social-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background-color: transparent;
            padding: 5px;
        }

        .social-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
        }

        .social-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
        }

        .signup-link {
            text-align: center;
            margin-top: 20px;
            color: #ddd;
            font-size: 15px;
        }

        .signup-link a {
            color: #AA732F;
            text-decoration: none;
            font-weight: 600;
        }

        .signup-link a:hover {
            text-decoration: underline;
        }

        @media screen and (max-width: 480px) {
            #container {
                border-radius: 10px;
            }
            
            form {
                padding: 20px;
            }
            
            .logo-header {
                padding: 20px 15px;
            }
            
            .logo-img {
                width: 70px;
                height: 70px;
            }
            
            .logo-header h1 {
                font-size: 24px;
            }
            
            .card-group input {
                padding: 12px;
            }
            
            input#submit {
                padding: 14px;
            }
            
            .social-btn {
                width: 45px;
                height: 45px;
            }
        }

.flash_alerta {
  background-color: #3a1f1f;
  color: #ff6b6b;
  padding: 12px;
  text-align: center;
  font-size: 14px;
}
</style>