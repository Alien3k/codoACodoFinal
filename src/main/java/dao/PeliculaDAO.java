package dao;

import conexion.ConexionDB;
import entidades.Pelicula;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PeliculaDAO {

    public List<Pelicula> obtenerTodasLasPeliculas() {
        List<Pelicula> peliculas = new ArrayList<>();
        String query = "SELECT * FROM peliculas";

        try (Connection conn = ConexionDB.obtenerConexion(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                Pelicula pelicula = new Pelicula(
                        rs.getInt("id"),
                        rs.getString("titulo"),
                        rs.getString("sinopsis"),
                        rs.getString("imagen"),
                        rs.getString("lenguaje")
                );
                peliculas.add(pelicula);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return peliculas;
    }
}
