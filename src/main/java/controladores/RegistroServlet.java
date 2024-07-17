package controladores;

import java.io.IOException;
import java.sql.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import dao.UsuarioServicio;
import entidades.Usuario;   

@WebServlet("/registro")
public class RegistroServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Obtener parámetros de la solicitud
        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String fechaNacimiento = request.getParameter("fechaNacimiento");
        String pais = request.getParameter("pais");
        
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setEmail(email);
        usuario.setPassword(password);
        //convierte una cadena de texto a un objeto Date
        //proviene del paquete java.sql
        usuario.setFechaNacimiento(Date.valueOf(fechaNacimiento));
        usuario.setPais(pais);
        UsuarioServicio usuarioServicio = new UsuarioServicio();
        boolean registroExitoso = usuarioServicio.insertarUsuario(usuario);
        if (registroExitoso) {
            response.sendRedirect("pages/register.html?exito=true");
        } else {
            response.sendRedirect("pages/register.html?error=true");
        }
    }
}
