package es.urjc.jer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class Appservidor1Application implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createPlayerHandler(), "/game")	.setAllowedOrigins("*");
	}
	
	@Bean
	public PlayerHandler createPlayerHandler() {
		return new PlayerHandler();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(Appservidor1Application.class, args);
	}
	
	


}
