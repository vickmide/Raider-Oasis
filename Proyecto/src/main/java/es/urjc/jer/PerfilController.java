//package com.example.demo;
package es.urjc.jer;

import java.util.ArrayList;
import java.util.Collection;
//import java.util.concurrent.atomic.AtomicLong;
import java.util.Comparator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/perfil")
public class PerfilController {

	// Array de perfiles y int de siguiente ID
	ArrayList<Perfil> perfiles = new ArrayList<Perfil>();
	int nextId = 0;
	
	// SOLO DEBUG: el servidor valida el perfil enviado por el cliente, no hace falta que se puedan devolver todos los perfiles juntos
	// (Ademas se enviarian junto con las claves)
	// Cuando todo funcione mejor comentar esta funcion
	@GetMapping
	public Collection<Perfil> perfiles() {
		return perfiles;
	}
	
	// SOLO DEBUG
	// Obtener un perfil específico (por su id)
	@GetMapping("/{id}")
	public ResponseEntity<Perfil> getPerfil(@PathVariable int id) {

		Perfil savedPerfil = perfiles.get(id);

		// Si el Perfil con el id especificado existe, lo devuelve. Si no, manda un codigo de respuesta NOT FOUND
		if (savedPerfil != null) {
			return new ResponseEntity<>(savedPerfil, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Crear perfil (registro)
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Perfil nuevoPerfil(@RequestBody Perfil perfil) {
		perfil.setId(nextId);
		perfiles.add(perfil);
		nextId++;
		return perfil;
	}
	
	// Validar perfil
	@PostMapping("/validate")
	@ResponseStatus(HttpStatus.OK)
	public int validarPerfil(@RequestBody Perfil perfil) {
		
		for (int i = 0; i < perfiles.size(); i++) {
			if(perfiles.get(i).equals(perfil)) {
				int id = perfiles.get(i).getId();
				return id;
			}
		}
	
		return -1;
	}
	
	// Obtener puntuaciones de un perfil específico (por su id)
	@GetMapping("/puntuaciones/{id}")
	public ResponseEntity<ArrayList<Integer>> getPuntuaciones(@PathVariable int id) {

		Perfil savedPerfil = perfiles.get(id);

		// Si el Perfil con el id especificado existe, lo devuelve. Si no, manda un codigo de respuesta NOT FOUND
		if (savedPerfil != null) {
			return new ResponseEntity<>(savedPerfil.getPuntuaciones(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// Obtener puntuacion max de un perfil específico (por su id)
	@GetMapping("/puntuacionMax/{id}")
	public ResponseEntity<Integer> getPuntuacionMax(@PathVariable int id) {

		Perfil savedPerfil = perfiles.get(id);

		// Si el Perfil con el id especificado existe, lo devuelve. Si no, manda un codigo de respuesta NOT FOUND
		if (savedPerfil != null) {
			return new ResponseEntity<>(savedPerfil.getPuntuacionMax(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// Dar una puntuación nueva a un jugador segun su ID
	@PostMapping("/puntuacion/{id}/{puntuacion}")
	public ResponseEntity<HttpStatus> updatePuntuaciones(@PathVariable int id, @PathVariable int puntuacion) {

		Perfil savedPerfil = perfiles.get(id);

		// Si el Perfil con el id especificado existe, lo devuelve. Si no, manda un codigo de respuesta NOT FOUND
		if (savedPerfil != null) {
			savedPerfil.updatePuntuaciones(puntuacion);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Borra un perfil específico (por su id)
	@DeleteMapping("/{id}")
	public ResponseEntity<Perfil> borraPerfil(@PathVariable int id) {

		Perfil savedPerfil = perfiles.get(id);

		// Si el Perfil con el id especificado existe, lo borra de la lista y lo devuelve al cliente
		if (savedPerfil != null) {
			perfiles.remove(savedPerfil.getId());
			return new ResponseEntity<>(savedPerfil, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/leaderboard")
	public ArrayList<Perfil> tablapuntuacion() {
		//generabasura();
		perfiles.sort(Comparator.comparing(Perfil::getPuntuacionMax).reversed());
		return perfiles;
	}
	
	//funcion de testeo para probar leaderboard
	public void generabasura() {
		Perfil p1 = new Perfil();
		Perfil p2 = new Perfil();
		Perfil p3 = new Perfil();
		
		p1.setId(0);
		p1.setNombre("nombre1");
		p1.setClave("clave1");
		p1.setPuntuacionMax(10000);
		
		p2.setId(1);
		p2.setNombre("nombre2");
		p2.setClave("clave2");
		p2.setPuntuacionMax(200000);
		
		p3.setId(2);
		p3.setNombre("nombre3");
		p3.setClave("clave3");
		p3.setPuntuacionMax(10500);
		
		perfiles.add(p1);
		perfiles.add(p2);
		perfiles.add(p3);
	}
}