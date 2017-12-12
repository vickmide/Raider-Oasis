package es.urjc.jer;

import java.util.ArrayList;

public class Sala {

	private int id;
	private int numJugadores;
	private int status;
	private ArrayList<Player> players = new ArrayList<>();
	
	Sala() {}
	
	Sala(int id, int numj, int status) {
		this.id = id;
		this.numJugadores = numj;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNumJugadores() {
		return numJugadores;
	}

	public void setNumJugadores(int numJugadores) {
		this.numJugadores = numJugadores;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	public void addPlayer(Player p) {
		p.setPlay(true);
		this.numJugadores++;
		players.add(p);
	}
	
	public ArrayList<Player> getPlayers() {
		return players;
	}
	
}
