package entidades;

public class Pelicula {
    private int id;
    private String titulo;
    private String sinopsis;
    private String imagen;
    private String lenguaje;

    // Constructor
    public Pelicula(int id, String titulo, String sinopsis, String imagen, String lenguaje) {
        this.id = id;
        this.titulo = titulo;
        this.sinopsis = sinopsis;
        this.imagen = imagen;
        this.lenguaje = lenguaje;
    }

    // Getters y setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getSinopsis() { return sinopsis; }
    public void setSinopsis(String sinopsis) { this.sinopsis = sinopsis; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public String getLenguaje() { return lenguaje; }
    public void setLenguaje(String lenguaje) { this.lenguaje = lenguaje; }
}
