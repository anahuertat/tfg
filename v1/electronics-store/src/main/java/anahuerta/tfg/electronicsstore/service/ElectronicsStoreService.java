package anahuerta.tfg.electronicsstore.service;

import java.util.List;

import anahuerta.tfg.electronicsstore.domain.Cart;
import anahuerta.tfg.electronicsstore.domain.Component;

public interface ElectronicsStoreService {
	
	boolean addToCart(Integer reference, int quantity);
	
	Cart checkout();

	List<Component> showCart();

	void confirm();
}