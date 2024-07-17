package controladores;

import dao.UserDao;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import dao.UsuarioServicio;

import entidades.Usuario;
import javax.servlet.http.HttpSession;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        UsuarioServicio x = new UsuarioServicio();
        Usuario usuarioValido = x.autenticar(email, password);

        if (usuarioValido != null) {
            HttpSession session = request.getSession();
            session.setAttribute("usuario", usuarioValido);

            if (usuarioValido.getAdm()) {
                response.sendRedirect("pages/gestionUsuarios.html");
            }else {
            response.sendRedirect("pages/pelis.html");
        }

        } else {
            System.out.println("Error");
            response.sendRedirect("pages/login.html");
        }
    }
}
