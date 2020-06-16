package anahuerta.tfg.electronicsstore.domain;

import java.util.Objects;

public class Component{
	public Category category;
	public String name;
	public Double price;
	public Integer reference;
	public Integer stock;
	
	public Component(Category category, String name, Double price, Integer reference, Integer stock) {
		this.category = category;
		this.name = name;
		this.price = price;
		this.reference = reference;
		this.stock = stock;
	}
	
	public Category getCategory() {
		return category;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
	
	public Integer getReference() {
		return reference;
	}
	
	public void setReference(Integer reference) {
		this.reference = reference;
	}
	
	public Integer getStock() {
		return stock;
	}
	
	public void setStock(Integer stock) {
		this.stock = stock;
	}
	
	@Override
	public boolean equals(Object o) {
		if(o == null)
			return false;
		
		if(this.getClass() != o.getClass())
			return false;
		
		final Component c = (Component) o;
		if(!Objects.equals(this.name, c.name))
			return false;
			
		if(!Objects.equals(this.category, c.category))
			return false;
		
        if (!Objects.equals(this.price, c.price))
            return false;
        
        if (!Objects.equals(this.reference, c.reference))
            return false;
        
        if (!Objects.equals(this.stock, c.stock))
            return false;
        
        return true;
	}
}
