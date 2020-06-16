package anahuerta.tfg.electronicsstore.domain;

import java.util.List;
import java.util.ArrayList;

public class Cart {
	List<Component> cartItems = new ArrayList<Component>();
    
    public void addToCartByRef(Integer reference) {
        Component component = getComponentByRef(reference);
        addToCart(component);
    }

    private Component getComponentByRef(Integer reference) {
        Component component = null;
        List<Component> components = new Components().getComponents();
        for (Component c: components) {
            if (c.getReference() == reference) {
                component = c;
                break;
            }
        }
        return component;
    }

    private void addToCart(Component component) {
        cartItems.add(component);
    }

    public void removeComponentByRef(Integer reference) {
        Component c = getComponentByRef(reference);
        cartItems.remove(c);
    }

    public void printCartItems() {
        for (Component c: cartItems) {
            System.out.println(c.getName());
        }
    }
    
    public List<Component> getCartItems() {
    		return cartItems;
    }
}
