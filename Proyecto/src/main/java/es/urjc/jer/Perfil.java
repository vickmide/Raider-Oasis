//package com.example.demo;
package es.urjc.jer;
import java.util.ArrayList;
import java.util.Collections;

public class Perfil {

	private int id;
	private String nombre;
	private String clave;
	private int puntuacionMax;
	private ArrayList<Integer> puntuaciones = new ArrayList<Integer>();
	

	public Perfil() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}
	
	public ArrayList<Integer> updatePuntuaciones(int nuevaPuntuacion) {
		this.puntuaciones.add(nuevaPuntuacion);
		Collections.sort(puntuaciones, Collections.reverseOrder());
		this.puntuacionMax = this.puntuaciones.get(0);
		return puntuaciones;
	}
	
	public ArrayList<Integer> getPuntuaciones() {
		return puntuaciones;
	}
	
	public int getPuntuacionMax() {
		return puntuacionMax;
	}

	@Override
	public String toString() {
		return "Perfil [id=" + id + ", nombre=" + nombre + ", clave=" + clave + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clave == null) ? 0 : clave.hashCode());
		result = prime * result + id;
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Perfil other = (Perfil) obj;
		if (clave == null) {
			if (other.clave != null)
				return false;
		} else if (!clave.equals(other.clave))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		return true;
	}
	
	

}
