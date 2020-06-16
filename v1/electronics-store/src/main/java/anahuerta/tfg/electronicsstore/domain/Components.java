package anahuerta.tfg.electronicsstore.domain;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Components {
	public List<Component> components = new ArrayList<Component>();
	
	public Components() {
		this.initializeItems();
	}
	
	public List<Component> getComponents(){
		return components;
	}
	
	public void initializeItems() {
		String[] names = {"Resistor 100ohm 1W 5%", "Braided cable 4x0.22", "10PCS resistors 10K 1W 1%" };
		Double[] prices = {0.15, 0.45, 0.95};
		Integer[] stocks = {100, 20, 60};
		Integer[] references = {19284, 17583, 32718};
		Category[] categories = {Category.RESISTORS, Category.CABLES, Category.RESISTORS};
		
		for (int i=0; i < names.length; i++) {
            this.components.add(new Component(categories[i], names[i], prices[i], references[i], stocks[i]));    
        }
	}
	
	public boolean inStock(Integer reference, int quantity){
		Iterator<Component> it = components.iterator();
		while(it.hasNext()) {
			Component c = it.next();
			if(c.getReference().equals(reference)) {
				if(c.getStock() >= quantity) {
					return true;
				}else {
					return false;
				}
			}
		}
		return false;
	}
	
	public boolean updateStock(Integer reference) {
		Iterator<Component> it = components.iterator();
		while(it.hasNext()) {
			Component c = it.next();
			if(c.getReference().equals(reference)) {
				int index = components.indexOf(c);
				components.set(index, new Component(c.getCategory(), c.getName(), c.getPrice(), c.getReference(), (c.getStock()-1) ));
				return true;
			}
		}
		return false;
	}
}
