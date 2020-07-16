package anahuerta.tfg.electronicsstore.service.impl;
import java.util.Iterator;
import java.util.List;

import anahuerta.tfg.electronicsstore.domain.Cart;
import anahuerta.tfg.electronicsstore.domain.Component;
import anahuerta.tfg.electronicsstore.domain.Components;
import anahuerta.tfg.electronicsstore.service.ElectronicsStoreService;

import org.springframework.stereotype.Service;

@Service
public class ElectronicsStoreServiceImpl implements ElectronicsStoreService{
	private Cart cart = new Cart();
	private Components components = new Components();
	
	@Override
	public boolean addToCart(Integer reference, int quantity) {
		if(components.inStock(reference, quantity)) {
			for(int i=0; i<quantity; i++){
				cart.addToCartByRef(reference);
			}
			return true;
		}
		return false;
	}

	@Override
	public Cart checkout() {
		return cart;
		
	}

	@Override
	public List<Component> showCart() {
		return cart.getCartItems();
	}

	@Override
	public void confirm() {
		List<Component> items = cart.getCartItems();
		Iterator<Component> it = items.iterator();
		while(it.hasNext()) {
			Component c = it.next();
			components.updateStock(c.getReference());
		}
		
	}

}