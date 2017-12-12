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
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		switch (node.get("protocolo").asText()) {
		case "createSala_msg": 

			Sala s = new Sala (salas.size(), 0, 0);
			players.get(session.getId()).setPlay(true);
			s.addPlayer(players.get(session.getId()));
			salas.put(salas.size(), s);
			notifySalaCreated(players, session, node, s.getNumJugadores());
			
			break;
		case "player_msg":
			//METODO PARA JUGADORES
			break;
		case "enemy_msg":
			//METODO PARA ENEMIGOS
			break;
		default:
			System.out.println("ERROR: Mensaje no soportado");
		}
			
	}

	//notifica a todos los jugadores que no esten en una partida
	private void notifySalaCreated(Map<String, Player> players, WebSocketSession session, JsonNode node, int size) throws IOException {
		
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
	
	/*
	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("id", node.get("id").asText());
		newNode.put("xhero2", node.get("x").asText());
		newNode.put("yhero2", node.get("y").asText());
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
	*/

}
