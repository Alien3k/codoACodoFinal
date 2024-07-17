
package controladores;

import com.fasterxml.jackson.databind.ObjectMapper;
import dao.PeliculaDAO;
import entidades.Pelicula;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/peliculas")
public class PeliculaServlet extends HttpServlet {
    private ObjectMapper objectMapper = new ObjectMapper();
    private PeliculaDAO peliculaDAO = new PeliculaDAO();

    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<Pelicula> peliculas = peliculaDAO.obtenerTodasLasPeliculas();
        objectMapper.writeValue(response.getWriter(), peliculas);
    }
}
