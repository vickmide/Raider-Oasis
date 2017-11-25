package es.urjc.jer;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dungeon")
public class SalaController {
	
	private ArrayList<Sala> lista_salas = new ArrayList<>();
	
	@GetMapping("/{id}")
	public ResponseEntity<Sala> getSala(@PathVariable int id) {
		Sala sala = lista_salas.get(id);

		if (sala != null) {
			return new ResponseEntity<>(sala, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Sala nuevaSala(@RequestBody Sala sala) {
		/*
		ArrayList<Double> rnform = new ArrayList<>();
		
		for (int i = 0; i < 10; i++){
	        rnform.add(Math.random()*10);
	    }
		*/
		lista_salas.add(sala);
		
		return sala;
	}
	
	
	
	
}
