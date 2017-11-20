package es.urjc.jer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlayerController {

	private List<Player> players = new ArrayList<>();
	
	@RequestMapping(value="/player", method=RequestMethod.GET)
	public List<Player> getPlayer() {
		return players;
	}
	
	@RequestMapping(value="/player", method=RequestMethod.POST)
	public ResponseEntity<Boolean> addPlayer(@RequestBody Player p) {
		players.add(p);
		return new ResponseEntity<>(true,HttpStatus.CREATED);
	}
	
}
