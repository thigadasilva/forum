 function openMenu() {
            if (window.innerWidth >= 769) {
                // Desktop
                document.getElementById("desktopSidebar").classList.add("open");
                document.getElementById("overlay").style.display = "block";
                document.body.style.overflow = "hidden";
            } else {
                // Mobile
                document.getElementById("mobileSidebar").classList.add("open");
                document.getElementById("overlay").style.display = "block";
                document.body.style.overflow = "hidden";
            }
        }

        // Função para fechar o menu desktop
        function closeDesktopMenu() {
            document.getElementById("desktopSidebar").classList.remove("open");
            document.getElementById("overlay").style.display = "none";
            document.body.style.overflow = "auto";
        }

        // Função para fechar o menu mobile
        function closeMobileMenu() {
            document.getElementById("mobileSidebar").classList.remove("open");
            document.getElementById("overlay").style.display = "none";
            document.body.style.overflow = "auto";
        }

        // Função para fechar todos os menus
        function closeAllMenus() {
            closeDesktopMenu();
            closeMobileMenu();
        }

        // Fechar o menu ao pressionar a tecla ESC (apenas para desktop)
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && window.innerWidth >= 769) {
                closeDesktopMenu();
            }
        });

        // Fechar o menu se a janela for redimensionada
        window.addEventListener('resize', function() {
            // Fecha os menus ao redimensionar
            closeAllMenus();
            
            // Ajusta a exibição dos menus conforme o tamanho da tela
            if (window.innerWidth >= 769) {
                document.getElementById("mobileSidebar").style.display = "none";
                document.getElementById("desktopSidebar").style.display = "block";
            } else {
                document.getElementById("desktopSidebar").style.display = "none";
                document.getElementById("mobileSidebar").style.display = "block";
            }
        });

        // Inicialização - garantir que o menu correto seja mostrado no carregamento
        window.addEventListener('load', function() {
            if (window.innerWidth >= 769) {
                document.getElementById("mobileSidebar").style.display = "none";
                document.getElementById("desktopSidebar").style.display = "block";
            } else {
                document.getElementById("desktopSidebar").style.display = "none";
                document.getElementById("mobileSidebar").style.display = "block";
            }
        });