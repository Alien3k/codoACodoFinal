package dao;

import conexion.ConexionDB;
import entidades.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class UsuarioServicio {

    public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO registroUsuarios (nombre, apellido, email, password, fechaNacimiento, pais, adm) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection cnx = ConexionDB.obtenerConexion(); PreparedStatement pstmt = cnx.prepareCall(sql)) {
            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getApellido());
            pstmt.setString(3, usuario.getEmail());
            pstmt.setString(4, usuario.getPassword());
            pstmt.setDate(5, usuario.getFechaNacimiento());
            pstmt.setString(6, usuario.getPais());
            pstmt.setBoolean(7, false); // Siempre se establece false aquí

            int guardarRegistro = pstmt.executeUpdate();
            return guardarRegistro > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //---------------------------------------------
    private Usuario obtenerUsuarioResultSet(ResultSet rs) throws Exception {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getInt("id"));
        usuario.setNombre(rs.getString("nombre"));
        usuario.setApellido(rs.getString("apellido"));
        usuario.setEmail(rs.getString("email"));
        usuario.setPassword(rs.getString("password"));
        usuario.setFechaNacimiento(rs.getDate("fechaNacimiento"));
        usuario.setPais(rs.getString("pais"));
        usuario.setAdm(rs.getBoolean("adm"));
        return usuario;
    }

    //---------------------------------------------
    public List<Usuario> obtenerTodos() {

        List<Usuario> usuarios = new ArrayList<>();
        String query = "SELECT * FROM registroUsuarios";

        try (Connection cnx = ConexionDB.obtenerConexion(); Statement stmt = cnx.createStatement(); ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                Usuario usuario = obtenerUsuarioResultSet(rs);
                usuarios.add(usuario);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return usuarios;
    }

    //---------------------------------------------
    public Usuario obtenerPorId(int id) {
        String query = "SELECT * FROM registroUsuarios WHERE id = ?";
        try (Connection cnx = ConexionDB.obtenerConexion(); PreparedStatement pstmt = cnx.prepareStatement(query)) {

            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return obtenerUsuarioResultSet(rs);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //---------------------------------------------
    public boolean modificar(Usuario usuario) {
        String query = "UPDATE registroUsuarios SET nombre = ?, apellido = ?, email = ?, password = ?, fechaNacimiento = ?, pais = ?, adm = ? WHERE id = ?";
        try (Connection cnx = ConexionDB.obtenerConexion(); PreparedStatement pstmt = cnx.prepareStatement(query)) {

            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getApellido());
            pstmt.setString(3, usuario.getEmail());
            pstmt.setString(4, usuario.getPassword());
            pstmt.setDate(5, usuario.getFechaNacimiento());
            pstmt.setString(6, usuario.getPais());
            pstmt.setBoolean(7, usuario.getAdm());
            pstmt.setInt(8, usuario.getId());

            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //---------------------------------------------
    public boolean eliminar(int id) {
        String query = "DELETE FROM registroUsuarios WHERE id = ?";
        try (Connection cnx = ConexionDB.obtenerConexion(); PreparedStatement pstmt = cnx.prepareStatement(query)) {

            pstmt.setInt(1, id);
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //---------------------------------------------
    public Usuario autenticar(String email, String password) {
        Usuario usuario = null;

        try (Connection connection = ConexionDB.obtenerConexion()) {
            String sql = "SELECT * FROM registroUsuarios WHERE email = ? AND password = ?";
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setString(1, email);
            statement.setString(2, password);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                usuario = new Usuario();
                usuario.setId(resultSet.getInt("id"));
                usuario.setNombre(resultSet.getString("nombre"));
                usuario.setApellido(resultSet.getString("apellido"));
                usuario.setEmail(resultSet.getString("email"));
                usuario.setPassword(resultSet.getString("password"));                
                usuario.setFechaNacimiento(resultSet.getDate("fechaNacimiento"));
                usuario.setPais(resultSet.getString("pais"));
                usuario.setAdm(resultSet.getBoolean("adm"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return usuario;
    }
}
