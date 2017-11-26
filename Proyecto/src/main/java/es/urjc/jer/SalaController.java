package es.urjc.jer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Random;

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
@RequestMapping("/dungeon")
public class SalaController {
	
	private ArrayList<Sala> lista_salas = new ArrayList<>();
	private ArrayList<Point> lista_size = initSize();
	
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

		sala.setRnform(randomform());
		sala.setRntile(randomtile());
		sala.setRnsize(randomsize());
		sala.setRntilecenter(randomtilecenter());	
		sala.setRnprefab(randomprefab());
		
		lista_salas.add(sala);
		
		return sala;
	}
	
	@GetMapping
	public Collection<Sala> salas() {
		return lista_salas;
	}
	
	private ArrayList<Double> randomform (){
		
		ArrayList<Double> a = new ArrayList<>();
		
		for (int i = 0; i < 10; i++){
	        a.add(Math.random());
	    }
		
		return a;
	}
	
	private ArrayList<Integer> randomtile (){
		
		Random rnd = new Random();
		ArrayList<Integer> a = new ArrayList<>();
		
		for (int i = 0; i < 10; i++){
	        a.add(rnd.nextInt(7) + 5);
	    }
		
		return a;
	}
	
	private ArrayList<Point> randomsize(){
		
		ArrayList<Point> a = new ArrayList<>();
		Random rnd = new Random();
		int pos;

		for (int i = 0; i < 120; i++){
			pos = rnd.nextInt(4);
			a.add(lista_size.get(pos));
	    }
		
		return a;
	} 
	
	private ArrayList<Point> initSize () {
		
		ArrayList<Point> a = new ArrayList<>();
		a.add(new Point(1,1));
		a.add(new Point(1,2));
		a.add(new Point(1,3));
		a.add(new Point(2,1));
		a.add(new Point(3,1));
		
		return a;
	}
	
	private ArrayList<Integer> randomtilecenter(){
		
		ArrayList<Integer> a = new ArrayList<>();
		Random rnd = new Random();
		
		for (int i = 0; i < 50; i++) {
			a.add(rnd.nextInt(6)+3);
			a.add(rnd.nextInt(6)+3);
		}

		return a;		
	}
	
	private ArrayList<Integer> randomprefab(){
		
		ArrayList<Integer> a = new ArrayList<>();
		
		for (int i = 0; i < 41; i++) {
			a.add((int) Math.round(Math.random()));
		}

		return a;		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Sala> borrarSala(@PathVariable int id) {

		Sala savedSala = lista_salas.get(id);

		if (savedSala != null) {
			lista_salas.remove(id);
			return new ResponseEntity<>(savedSala, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
