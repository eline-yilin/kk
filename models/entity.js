'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getEntityList = function  (data, callback){	
	var query = 'select e.*, i.url, a.floor, a.number, a.city, a.state, c.name as category '
		+ ' from entity e LEFT JOIN entity_category c ON e.category_id = c.id LEFT JOIN entity_img i on e.id = i.entity_id LEFT JOIN  address a on a.id  = e.address_id '
		+ ' where e.is_deleted <> 1';
	if(data.floor)
		{
		 query += ' and a.floor=' + data.floor;
		}
	if(data.category)
	{
	 query += ' and c.id=' + data.category;
	}
	return base.query(query, callback);
}; 

var deleteItemById = function  (id, callback){	
	var query = 'UPDATE entity SET is_deleted = 1 where id=' + id;
	return base.query(query, callback);	
}; 

var getEntityById = function  (id, callback){	
	var query = 'select e.*, a.floor, a.number, a.city, a.state, c.name as category from entity e '
	+ '	LEFT JOIN entity_category c ON e.category_id = c.id LEFT JOIN address a ON e.address_id = a.id WHERE e.id=' + id;
	return base.getOne(query, function(err,entity){
		if(err){
			throw err;
		}
		else
			{
			var query_get_img = 'SELECT url from entity_img where entity_id=' + id;
			return base.query(query_get_img, function(err,img){
				if(err){
					throw err;
				}
				else
					{
					 	entity.imgs = img;
						var query_get_products = 'select p.*, i.url from product p LEFT JOIN product_img i ' 
						+ '	on  p.id = i.product_id where entity_id=' + id  + ' limit 50';
						console.log(query_get_products);
						return base.query(query_get_products, function(err,product){
						if(err){
							throw err;
						}
						else
							{
							var tempProd = [];
							for(var key in product)
							{
								var p = product[key];
								var pid = p['id'];
								// ITEM IN ARRAY
								if(tempProd[pid] )
								{
									if(p['url']){
										var url = p['url'];
										tempProd[pid]['url'].push( url.replace(".build", "") );
									}
								}
								// item not in array, init and push
								else
								{
									var url = p['url'];
									if(url)
									{
										url = url.replace(".build", "");
									}
									
									p['url'] = new Array(url);
									tempProd[pid] = p;
									
								}
								
							}
							var products =[];
							for(var key in tempProd)
							{
								if(products.length < 5)
									{
										products.push(tempProd[key]);
									}
								else 
									{
									break;
									}
							}
							entity.products = products;
							var query_get_comments = "SELECT title, content from comment WHERE target_type = 'entity' AND status_id = 1 AND target_id=" + id;
							return base.query(query_get_comments, function(err,comments){
								if(err){
									throw err;
								}
								else
									{
									 entity.comments = comments;
									 return callback(null, entity);
									}
							});
							}
					});
					
					}
			});
			}
	});	
}; 


var post = function  (data, callback){
	
	var insert_address_query = 'INSERT INTO address (floor, number) values (' + data['floor'] + ',' + data['number'] + ')';
	
	
	return base.query(insert_address_query, function(err, rst){
		if(err){
			throw err;
		}
		else{
			var aid = rst['insertId'];
			var query = "insert into entity (category_id,name,address_id,description) values (" +　 data['category'] + ",'"
			+ data['entityname'] + "',"
			+ aid + ",'"
			+ data['description']
			+"')";
			return base.query(query, function(err, rst){
				if(err){
					throw err;
				}
				else{
					var eid = rst['insertId'];
					var insert_img_query = "insert into entity_img (entity_id, url) values ";
					var imgs = data['img'];
					for(var i = 0; i <  imgs.length; i++)
					{
						insert_img_query += "(" + eid + ",'" + imgs[i] + "')";
						if(i != (imgs.length - 1) )
							{
							insert_img_query += ",";
							}
					}
					return base.query(insert_img_query, callback);
				}
			});	
		}
	});
}; 

var update = function  (data, callback){
	getEntityById(data.id, function(err,entity){
		var address_id = entity.address_id;
		if(data.floor != entity.floor || data.number != entity.number)
		{
			var update_address_query = 'UPDATE  address SET floor = ' + data.floor + ', number=' + data.number + ' WHERE id=' + address_id;
		}
		else
		{
			var update_address_query = 'SELECT 1';
		}
console.log(update_address_query);
		return base.query(update_address_query, function(err, rst){
			if(err){
				throw err;
			}
			else
			{
				if(data.entityname != entity.name || data.description != entity.description || data.category != entity.category_id)
			    {
					var query = "UPDATE  entity set category_id = " + data.category 
					+ ",name='" + data.entityname 
					+"',description='" + data.description + "'";
			    }
				else
				{
					var query = 'select 1';
				}
				console.log(query);
				return base.query(query,callback);
				/*return base.query(query, function(err, rst){
					if(err){
						throw err;
					}
					else{
						var eid = rst['insertId'];
						var insert_img_query = "insert into entity_img (entity_id, url) values ";
						var imgs = data['img'];
						for(var i = 0; i <  imgs.length; i++)
						{
							insert_img_query += "(" + eid + ",'" + imgs[i] + "')";
							if(i != (imgs.length - 1) )
								{
								insert_img_query += ",";
								}
						}
						return base.query(insert_img_query, callback);
					}
				});	*/
			}
		});
		
	})
	
}; 
module.exports = function(){
this.get = getEntityList;
this.id = getEntityById;
this.post = post;
this.update = update;
this.delete = deleteItemById;
};
