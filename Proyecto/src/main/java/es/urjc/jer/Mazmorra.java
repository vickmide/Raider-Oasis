package es.urjc.jer;

import java.util.ArrayList;

public class Mazmorra {
	
	private ArrayList<Double> rnform; //"forma" de la sala
	private ArrayList<Integer> rntile; //numero de tiles en cada sala
	private ArrayList<Point> rnsize; //tamaño del tile 
	private ArrayList<Integer> rntilecenter; //posicion del tile en sala
	private ArrayList<Integer> rnprefab; //numero de prefabs por sala
	
	public Mazmorra() {}
	
	
	public ArrayList<Integer> getRntile() {
		return rntile;
	}

	public void setRntile(ArrayList<Integer> rntile) {
		this.rntile = rntile;
	}

	public ArrayList<Point> getRnsize() {
		return rnsize;
	}

	public void setRnsize(ArrayList<Point> rnsize) {
		this.rnsize = rnsize;
	}

	public ArrayList<Integer> getRntilecenter() {
		return rntilecenter;
	}

	public void setRntilecenter(ArrayList<Integer> rntilecenter) {
		this.rntilecenter = rntilecenter;
	}

	public ArrayList<Integer> getRnprefab() {
		return rnprefab;
	}

	public void setRnprefab(ArrayList<Integer> rnprefab) {
		this.rnprefab = rnprefab;
	}

	public ArrayList<Double> getRnform() {
		return rnform;
	}

	public void setRnform(ArrayList<Double> rnform) {
		this.rnform = rnform;
	}
	
}
