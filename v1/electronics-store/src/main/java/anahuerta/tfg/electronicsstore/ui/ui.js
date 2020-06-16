var app = window.app || {},
business_paypal = ''; // paypal account info

(function($){
	'use strict';

	app.init = function(){
		//totalItems totalAmount
		var total = 0,
		items = 0
		
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		
		if(undefined != cart.items && cart.items != null && cart.items != '' && cart.items.length > 0){
			_.forEach(cart.items, function(n, key) {
			   items = (items + n.cant)
			   total = total  + (n.cant * n.price)
			});

		}

		$('#totalItems').text(items)
		$('.totalAmount').text('$ '+total+ ' USD')
		
	}

	app.createProducts = function(){
		var products = [
			{
				id : 1,
				name : 'Resistor 100Ω 1W 5%',
				img : '../images/resistencia.jpg',
				price : 0.15€,
				desc : 'Single Resistor 100Ω 1W 5%. FREE Shipping: Shipping time 5-7 business days. Payments only via Paypal.',
				stock : 100
			},
			{
				id : 2,
				name : 'Braided cable 4x0.22',
				img : '../images/cable-trenzado.jpg',
				price : 0.45€,
				desc : 'Braided cable 4x0.22. FREE Shipping: Shipping time 5-7 business days. Payments only via Paypal.',
				stock : 20
			},
			{
				id : 3,
				name : '10PCS resistors 10K 1W 1%',
				img : '../images/10-uni-resistencia.jpg',
				price : 0.95€,
				desc : '10 Pack Resistors 10kΩ 1W 1%. FREE Shipping: Shipping time 5-7 business days. Payments only via Paypal.',
				stock : 60
			}
		],
		wrapper = $('.productsWrapper'),
		content = ''

		for(var i = 0; i < products.length; i++){

			if(products[i].stock > 0){

				content+= '<div class="coin-wrapper">'
				content+= '		<img src="'+products[i].img+'" alt="'+products[i].name+'">'
				content+= '		<span class="large-12 columns product-details">'
				content+= '			<h3>'+products[i].name+' <span class="price">$ '+products[i].price+' USD</span></h3>'
				content+= '			<h3>Stock: <span class="stock">'+products[i].stock+'</span></h3>'
				content+= '		</span>'
				content+= '		<a class="large-12 columns btn submit ladda-button prod-'+products[i].id+'" data-style="slide-right" onclick="app.addtoCart('+products[i].id+');">Add to cart</a>'
				content+= '		<div class="clearfix"></div>'
				content+= '</div>'

			}

		}

		wrapper.html(content)

		localStorage.setItem('products',JSON.stringify(products))
	}

	app.addtoCart = function(id){
		var l = Ladda.create( document.querySelector( '.prod-'+id ) );

		l.start();
		var products = JSON.parse(localStorage.getItem('products')),
		product = _.find(products,{ 'id' : id }),
		quant = 1
		if(cant <= product.stock){
			if(undefined != product){
				if(quant > 0){
					setTimeout(function(){
						var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
						app.searchProd(cart,product.id,parseInt(quant),product.name,product.price,product.img,product.stock)
						l.stop();
					},2000)
				}else{
					alert('Quantity has to be larger than zero.')
				}
			}else{
				alert('Oops! Something went wrong. Try again later.')
			}
		}else{
			alert('You reached the maximum amount of this product')
		}
	}

	app.searchProd = function(cart,id,quant,name,price,img,available){
		//if we receive a negative quantity, it is substracted from the cart
		var curProd = _.find(cart.items, { 'id': id })

		if(undefined != curProd && curProd != null){
			//the product exists. we increase its quantity
			if(curProd.quant < available){
				curProd.quant = parseInt(curProd.quant + quant)
			}else{
				alert('You reached the maximum amount of this product')
			}
			
		}else{
			//if it doesnt exist, we add it to the cart
			var prod = {
				id : id,
				quant : quant,
				name : name,
				price : price,
				img : img,
				available : available
			}
			cart.items.push(prod)
			
		}
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()
	}

	app.getProducts = function(){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []},
		msg = '',
		wrapper = $('.cart'),
		total = 0
		wrapper.html('')

		if(undefined == cart || null == cart || cart == '' || cart.items.length == 0){
			wrapper.html('<li>Your cart is empty</li>');
			$('.cart').css('left','-400%')
		}else{
			var items = '';
			_.forEach(cart.items, function(n, key) {
	
			   total = total  + (n.quant * n.price)
			   items += '<li>'
			   items += '<img src="'+n.img+'" />'
			   items += '<h3 class="title">'+n.name+'<br><span class="price">'+n.quant+' x $ '+n.price+' USD</span> <button class="add" onclick="app.updateItem('+n.id+','+n.available+')"><i class="icon ion-minus-circled"></i></button> <button onclick="app.deleteProd('+n.id+')" ><i class="icon ion-close-circled"></i></button><div class="clearfix"></div></h3>'
			   items += '</li>'
			});

			//adding the total
			items += '<li id="total">Total : '+total+' € <div id="submitForm"></div></li>'
			wrapper.html(items)
			$('.cart').css('left','-500%')
		}
	}

	app.updateItem = function(id,available){
		//substracts one from the cart
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ,
		curProd = _.find(cart.items, { 'id': id })
			//updating cart
			curProd.quant = curProd.quant - 1;
			//validating quantity is larger than 0
			if(curProd.quant > 0){
				localStorage.setItem('cart',JSON.stringify(cart))
				app.init()
				app.getProducts()
				app.updatePayForm()
			}else{
				app.deleteProd(id,true)
			}
	}

	app.delete = function(id){
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var curProd = _.find(cart.items, { 'id': id })
		_.remove(cart.items, curProd);
		localStorage.setItem('cart',JSON.stringify(cart))
		app.init()
		app.getProducts()
		app.updatePayForm()
	}

	app.deleteProd = function(id,remove){
		if(undefined != id && id > 0){
			
			if(remove == true){
				app.delete(id)
			}else{
				var conf = confirm('¿Deseas eliminar este producto?')
				if(conf){
					app.delete(id)
				}
			}
			
		}
	}

	app.updatePayForm = function(){
		//eso va a generar un formulario dinamico para paypal
		//con los productos y sus precios
		var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
		var statics = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="upload" value="1"><input type="hidden" name="currency_code" value="USD" /><input type="hidden" name="business" value="'+business_paypal+'">',
		dinamic = '',
		wrapper = $('#submitForm')

		wrapper.html('')
		
		if(undefined != cart && null != cart && cart != ''){
			var i = 1;
			_.forEach(cart.items, function(prod, key) {
					dinamic += '<input type="hidden" name="item_name_'+i+'" value="'+prod.name+'">'
					dinamic += '<input type="hidden" name="amount_'+i+'" value="'+prod.price+'">'
					dinamic += '<input type="hidden" name="item_number_'+i+'" value="'+prod.id+'" />'
					dinamic += '<input type="hidden" name="quantity_'+i+'" value="'+prod.cant+'" />'
				i++;
			})

			statics += dinamic + '<button type="submit" class="pay">Pagar &nbsp;<i class="ion-chevron-right"></i></button></form>'

			wrapper.html(statics)
		}
	}

	$(document).ready(function(){
		app.init()
		app.getProducts()
		app.updatePayForm()
		app.createProducts()
	})

})(jQuery)