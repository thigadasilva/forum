// Barra de navegação

function hideIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navegacao = document.getElementById("navegacao");
    iconBar.setAttribute("style", "display:none;");
    navegacao.classList.remove("hide");
}

function showIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navegacao = document.getElementById("navegacao");
    iconBar.setAttribute("style", "display:block;");
    navegacao.classList.add("hide");
}

