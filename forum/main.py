from flask import Flask, render_template, redirect, request, flash, session
import mysql.connector
import time
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ZEUZ'

# Página inicial -> index
@app.route('/')
@app.route('/index')
def index():
    avatar = None
    if 'usuario_logado' in session:
        # Busca o avatar do usuário logado
        connect_db = mysql.connector.connect(
            host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
            port=20521,
            user="avnadmin",
            password="AVNS_ZErw4_MoLCA9avxf0QD",
            database="cadastro_usuarios"
        )
        
        cursor = connect_db.cursor()
        cursor.execute(
            "SELECT avatar FROM usuarios WHERE email = %s",
            (session['email'],)
        )
        resultado = cursor.fetchone()
        
        cursor.close()
        connect_db.close()
        
        if resultado:
            avatar = resultado[0]
        else:
            avatar = 'avatar-default.png'  # Avatar padrão se não encontrar
    
    return render_template('index.html', avatar=avatar)


# Página de login (formulário)
@app.route('/login', methods=['GET'])
def login_form():
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/index')

@app.route('/perfil')
def perfil():
    if 'usuario_logado' not in session:
        flash('Faça login para acessar seu perfil!', 'error')
        return redirect('/login')
    
    # Busca informações do usuário no banco
    connect_db = mysql.connector.connect(
        host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
        port=20521,
        user="avnadmin",
        password="AVNS_ZErw4_MoLCA9avxf0QD",
        database="cadastro_usuarios"
    )
    
    cursor = connect_db.cursor()
    cursor.execute(
        "SELECT nome, email, avatar, data_cadastro FROM usuarios WHERE email = %s",
        (session['email'],)
    )
    usuario = cursor.fetchone()
    
    cursor.close()
    connect_db.close()
    
    if usuario:
        return render_template('perfil.html', 
                             usuario=usuario[0],
                             email=usuario[1],
                             avatar=usuario[2],
                             data_cadastro=usuario[3])
    
    flash('Usuário não encontrado', 'error')
    return redirect('/index')

# Rota para processar o login
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    senha = request.form.get('senha')

    connect_db = mysql.connector.connect(
        host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
        port=20521,
        user="avnadmin",
        password="AVNS_ZErw4_MoLCA9avxf0QD",
        database="cadastro_usuarios"
    )

    cursor = connect_db.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE email = %s AND senha = %s", (email, senha))
    usuario = cursor.fetchone()

    cursor.close()
    connect_db.close()

    if usuario:
        session['usuario_logado'] = usuario[1]  # Supondo que o nome está na posição 1
        session['email'] = email
        return redirect('/index')  # login bem-sucedido
    else:
        flash('USUÁRIO OU SENHA INVÁLIDOS')
        return redirect('/login')


# Página de registro (formulário)
@app.route('/registro', methods=['GET'])
def registro_form():
    return render_template('registro.html')


# Rota para salvar novo usuário
@app.route('/registro', methods=['POST'])
def registro():
    nome = request.form.get('nome')
    email = request.form.get('email')
    senha = request.form.get('senha')
    data_nascimento = request.form.get('data_nascimento')

    connect_db = mysql.connector.connect(
        host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
        port=20521,
        user="avnadmin",
        password="AVNS_ZErw4_MoLCA9avxf0QD",
        database="cadastro_usuarios"
    )

    cursor = connect_db.cursor()
    cursor.execute(
        "INSERT INTO usuarios (nome, email, senha, avatar, data_nascimento) VALUES (%s, %s, %s, %s, %s)",
        (nome, email, senha, 'avatar-default.png', data_nascimento)
    )
    connect_db.commit()

    cursor.close()
    connect_db.close()

    flash("Usuário cadastrado com sucesso! Faça login.")
    return redirect('/login')

# Configurações de upload
UPLOAD_FOLDER = 'static/uploads/avatars'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024  # 2MB max

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload_avatar', methods=['POST'])
def upload_avatar():
    if 'usuario_logado' not in session:
        return redirect('/login')
    
    if 'foto' not in request.files:
        flash('Nenhum arquivo selecionado', 'error')
        return redirect('/perfil')
    
    file = request.files['foto']
    
    if file.filename == '':
        flash('Nenhum arquivo selecionado', 'error')
        return redirect('/perfil')
    
    if file and allowed_file(file.filename):
        # Cria pasta de uploads se não existir
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        
        # Gera nome único para o arquivo
        filename = f"{session['email']}_{secure_filename(file.filename)}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Salva o arquivo
        file.save(filepath)
        
        # Atualiza no banco de dados
        connect_db = mysql.connector.connect(
            host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
            port=20521,
            user="avnadmin",
            password="AVNS_ZErw4_MoLCA9avxf0QD",
            database="cadastro_usuarios"
        )
        
        cursor = connect_db.cursor()
        cursor.execute(
            "UPDATE usuarios SET avatar = %s WHERE email = %s",
            (filename, session['email'])
        )
        connect_db.commit()
        
        cursor.close()
        connect_db.close()
        
        # Atualiza na sessão
        session['avatar'] = filename
        
        flash('Foto atualizada com sucesso!', 'success')
        return redirect('/perfil')
    
    flash('Formato de arquivo não permitido', 'error')
    return redirect('/perfil')

# Configurações de upload para posts
UPLOAD_FOLDER_POSTS = 'static/uploads/posts'
ALLOWED_EXTENSIONS_POSTS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

app.config['UPLOAD_FOLDER_POSTS'] = UPLOAD_FOLDER_POSTS

# Rota para criar post
@app.route('/criar_post', methods=['GET'])
def criar_post_form():
    if 'usuario_logado' not in session:
        flash('Faça login para criar posts!', 'error')
        return redirect('/login')
    return render_template('criar_post.html')

@app.route('/criar_post', methods=['POST'])
def criar_post():
    if 'usuario_logado' not in session:
        flash('Faça login para criar posts!', 'error')
        return redirect('/login')
    
    titulo = request.form.get('titulo')
    conteudo = request.form.get('conteudo')
    
    try:
        connect_db = mysql.connector.connect(
            host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
            port=20521,
            user="avnadmin",
            password="AVNS_ZErw4_MoLCA9avxf0QD",
            database="cadastro_usuarios"
        )

        cursor = connect_db.cursor()
        
        # Primeiro busca o ID do usuário
        cursor.execute("SELECT id FROM usuarios WHERE email = %s", (session['email'],))
        usuario = cursor.fetchone()
        
        if not usuario:
            flash('Usuário não encontrado', 'error')
            return redirect('/criar_post')
        
        autor_id = usuario[0]
        imagem_filename = None
        
        # Processar upload de imagem se existir
        if 'imagem' in request.files:
            file = request.files['imagem']
            if file and file.filename != '' and allowed_file(file.filename):
                # Criar pasta se não existir
                if not os.path.exists(app.config['UPLOAD_FOLDER_POSTS']):
                    os.makedirs(app.config['UPLOAD_FOLDER_POSTS'])
                
                # Gerar nome único
                filename = f"post_{autor_id}_{int(time.time())}_{secure_filename(file.filename)}"
                filepath = os.path.join(app.config['UPLOAD_FOLDER_POSTS'], filename)
                file.save(filepath)
                imagem_filename = filename
        
        # Inserir post no banco
        cursor.execute(
            "INSERT INTO posts (titulo, conteudo, autor_id, imagem) VALUES (%s, %s, %s, %s)",
            (titulo, conteudo, autor_id, imagem_filename)
        )
        
        connect_db.commit()
        cursor.close()
        connect_db.close()

        flash('Post criado com sucesso!', 'success')
        return redirect('/posts')
        
    except mysql.connector.Error as err:
        flash(f'Erro ao criar post: {err}', 'error')
        return redirect('/criar_post')

# Rota para visualizar todos os posts
@app.route('/posts')
def listar_posts():
    try:
        connect_db = mysql.connector.connect(
            host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
            port=20521,
            user="avnadmin",
            password="AVNS_ZErw4_MoLCA9avxf0QD",
            database="cadastro_usuarios"
        )

        cursor = connect_db.cursor(dictionary=True)
        
        # Buscar posts com informações do autor
        cursor.execute("""
            SELECT p.*, u.nome as autor_nome, u.avatar as autor_avatar 
            FROM posts p 
            INNER JOIN usuarios u ON p.autor_id = u.id 
            ORDER BY p.data_criacao DESC
        """)
        
        posts = cursor.fetchall()
        
        cursor.close()
        connect_db.close()
        
        return render_template('posts.html', posts=posts)
        
    except mysql.connector.Error as err:
        flash(f'Erro ao carregar posts: {err}', 'error')
        return redirect('/index')

# Rota para ver post individual
@app.route('/post/<int:post_id>')
def ver_post(post_id):
    try:
        connect_db = mysql.connector.connect(
            host='mysql-74a0ef7-ba-8d10.k.aivencloud.com',
            port=20521,
            user="avnadmin",
            password="AVNS_ZErw4_MoLCA9avxf0QD",
            database="cadastro_usuarios"
        )

        cursor = connect_db.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT p.*, u.nome as autor_nome, u.avatar as autor_avatar 
            FROM posts p 
            INNER JOIN usuarios u ON p.autor_id = u.id 
            WHERE p.id = %s
        """, (post_id,))
        
        post = cursor.fetchone()
        
        cursor.close()
        connect_db.close()
        
        if post:
            return render_template('ver_post.html', post=post)
        else:
            flash('Post não encontrado', 'error')
            return redirect('/posts')
            
    except mysql.connector.Error as err:
        flash(f'Erro ao carregar post: {err}', 'error')
        return redirect('/posts')



if __name__ == "__main__":
    app.run(debug=True)
