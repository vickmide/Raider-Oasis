package es.urjc.jer;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class PlayerHandler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private Map<Integer, Sala> salas = new ConcurrentHashMap<>();
	private Map<String, Player> players = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		Player p = new Player();
		p.setPlay(false);
		players.put(session.getId(), p);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		players.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		synchronized (message) {		}
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		switch (node.get("protocolo").asText()) {
		case "createSala_msg": 
			Sala s = new Sala (salas.size(), 0, 0);
			System.out.println(salas.size());
			players.get(session.getId()).setPlay(true);
			players.get(session.getId()).setIdsala(s.getId());
			System.out.println("" + players.get(session.getId()).getIdsala());
			s.addPlayer(players.get(session.getId()));
			System.out.println("TAMAÑO ANTES" + salas.size());
			salas.put(salas.size(), s);
			System.out.println("TAMAÑO AHORA" + salas.size());

			
			notifySalaCreated(session, node, s.getNumJugadores());
			break;
			
		case "joinSala_msg": 
			
			players.get(session.getId()).setPlay(true);
			players.get(session.getId()).setIdsala(node.get("id").asInt());
			salas.get(node.get("id").asInt()).addPlayer(players.get(session.getId()));
			notifyJ2(node, session);
			
			break;
			
		case "door_msg":
			// METODO DE CAMBIAR DE SALA (ROOM, MAZMORRA)
			
			// Lee el mensaje
			Point newroom = new Point();
			newroom.setX(node.get("roomX").asInt());
			newroom.setY(node.get("roomY").asInt());
			players.get(session.getId()).setRoom(newroom);
			
			// Manda un mensaje al otro jugador
			ObjectNode newDoorNode = mapper.createObjectNode();
			newDoorNode.put("protocolo", "door_msg");
			newDoorNode.put("newroomX", newroom.getX());
			newDoorNode.put("newroomY", newroom.getY());
			sendOtherParticipants(session, newDoorNode);
			break;
		case "position_msg":
			// METODO PARA INTERCAMBIAR INFORMACION DE ENTIDADES (PLAYER, ENEMIGOS) ESTANDO EN LA MISMA SALA
			
			// Lee el mensaje
			Point newpos = new Point();
			newpos.setX(node.get("thisposX").asInt());
			newpos.setY(node.get("thisposY").asInt());
			players.get(session.getId()).setPos(newpos);
			int xscale = node.get("thisScale").asInt();
			players.get(session.getId()).setXScale(xscale);
			
			// Manda respuesta al otro jugador
			ObjectNode newEntNode = mapper.createObjectNode();
			newEntNode.put("protocolo", "position_msg");
			newEntNode.put("otherposX", newpos.getX());
			newEntNode.put("otherposY", newpos.getY());
			newEntNode.put("otherScale", xscale);
			sendOtherParticipants(session, newEntNode);
			
			break;
		default:
			System.out.println("ERROR: Mensaje no soportado");
		}
	}

	private void notifyJ2 (JsonNode node, WebSocketSession session) throws IOException {
		
		ObjectNode join = mapper.createObjectNode();
		join.put("protocolo", "joinSala_msg");
		join.put("salaId", players.get(session.getId()).getIdsala());
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId()) && (players.get(participant.getId()).getIdsala() == node.get("id").asInt())) {
				participant.sendMessage(new TextMessage(join.toString()));
				System.out.println("JOIN SALA: Message sent: " + join.toString());
			}
		}
	}

	//notifica a todos los jugadores que no esten en una partida
	private void notifySalaCreated(WebSocketSession session, JsonNode node, int size) throws IOException {
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("protocolo", "createSala_msg");
		newNode.put("id", node.get("id").asInt());
		newNode.put("numJugadores", size);
		newNode.put("status", 1);
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId()) && !players.get(participant.getId()).isPlay()) {
				participant.sendMessage(new TextMessage(newNode.toString()));
				System.out.println("CREATE SALA: Message sent: " + newNode.toString());
			}
			
		}
		
	}
	
	// Solo dentro de EL MISMO LOBBY
	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId()) && (players.get(session.getId()).getIdsala() == players.get(participant.getId()).getIdsala())){
				participant.sendMessage(new TextMessage(node.toString()));
			}
			
		}
	}

}
