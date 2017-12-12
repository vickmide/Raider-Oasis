package es.urjc.jer;

public class Player {

	private String id;
	private int idsala;
	private Point room;
	private Point pos;
	private boolean status;
	private boolean play;
	
	public Player(){
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public int getIdsala() {
		return idsala;
	}

	public void setIdsala(int idsala) {
		this.idsala = idsala;
	}

	public Point getRoom() {
		return room;
	}

	public void setRoom(Point room) {
		this.room = room;
	}

	public Point getPos() {
		return pos;
	}

	public void setPos(Point pos) {
		this.pos = pos;
	}
	
	public boolean isPlay() {
		return play;
	}

	public void setPlay(boolean play) {
		this.play = play;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
}
