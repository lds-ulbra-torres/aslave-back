DELIMITER ;;
CREATE PROCEDURE `SP_input_sum_value`( `pid_stock` int)
BEGIN
		DECLARE sum decimal(18,2);
		SELECT sum(unit_price_input * amount_input) INTO sum
		FROM stock_input_products 
		WHERE id_stock = pid_stock;
		
		UPDATE stock_input  SET sum_value = sum WHERE id_stock = pid_stock;
		
	
END ;;

DELIMITER ;;
CREATE PROCEDURE `SP_output_sum_value`( `pid_stock` decimal(18,2))
BEGIN
		DECLARE sum decimal(18,2);
		SELECT sum(unit_price_output * amount_output) INTO sum
		FROM stock_output_products 
		WHERE id_stock = pid_stock;
		
		UPDATE stock_output  SET sum_value = sum WHERE id_stock = pid_stock;
		
	
END ;;

DELIMITER ;;
CREATE PROCEDURE `SP_people_cities`( `people` decimal(18,2))
BEGIN
	SELECT c.id_cities,c.name as name_city, st.id_states, st.name as name_state FROM cities c
	INNER JOIN people p ON p.id_cities = c.id_cities INNER JOIN states st ON c.id_states = st.id_states
	WHERE p.id_people = people;
		
		
	
END ;;
DELIMITER ;;

CREATE TRIGGER Tgr_stock_input_products_insert AFTER INSERT ON  stock_input_products
FOR EACH ROW
BEGIN
	CALL SP_input_sum_value(NEW.id_stock);
	UPDATE stock_products sp SET   sp.unit_price = NEW.unit_price_input , sp.amount = sp.amount + NEW.amount_input
	WHERE sp.id_product = NEW.id_product;
END ;;

DELIMITER ;;
CREATE TRIGGER Tgr_stock_input_products_update AFTER UPDATE
ON  stock_input_products
FOR EACH ROW
BEGIN
	
	CALL SP_input_sum_value(OLD.id_stock);
	IF NEW.amount_input >= OLD.amount_input THEN
		

		UPDATE stock_products sp SET   sp.unit_price = NEW.unit_price_input ,
		sp.amount = sp.amount + (NEW.amount_input -OLD.amount_input) 
		WHERE sp.id_product = OLD.id_product;

	ELSEIF NEW.amount_input < OLD.amount_input THEN
	
		UPDATE stock_products sp SET   sp.unit_price = NEW.unit_price_input ,
		sp.amount = sp.amount - (OLD.amount_input -NEW.amount_input) 
		WHERE sp.id_product = OLD.id_product;

	END IF;
END ;;

DELIMITER ;;
CREATE TRIGGER Tgr_stock_input_products_delete AFTER DELETE
ON  stock_input_products
FOR EACH ROW
BEGIN	
	CALL SP_input_sum_value(OLD.id_stock);

    UPDATE stock_products sp SET   sp.unit_price = OLD.unit_price_input , sp.amount = sp.amount - OLD.amount_input
	WHERE sp.id_product = OLD.id_product;
END ;;

DELIMITER ;;
CREATE TRIGGER Tgr_stock_output_products_insert AFTER INSERT
ON  stock_output_products
FOR EACH ROW
BEGIN
	
	CALL SP_output_sum_value(NEW.id_stock);
    UPDATE stock_products sp SET  sp.unit_price = NEW.unit_price_output, sp.amount = sp.amount - NEW.amount_output
	WHERE sp.id_product = NEW.id_product;
END ;;

DELIMITER ;;
CREATE TRIGGER Tgr_stock_output_products_update AFTER UPDATE
ON  stock_output_products
FOR EACH ROW
BEGIN
	CALL SP_output_sum_value(OLD.id_stock);
	IF NEW.amount_output >= OLD.amount_output THEN

		UPDATE stock_products sp SET  sp.unit_price = NEW.unit_price_output ,
		sp.amount = sp.amount - (NEW.amount_output -OLD.amount_output) 
		WHERE sp.id_product = OLD.id_product;

	ELSEIF NEW.amount_output < OLD.amount_output THEN

		UPDATE stock_products sp SET   sp.unit_price = NEW.unit_price_output , 
		sp.amount = sp.amount + (OLD.amount_output -NEW.amount_output) 
		WHERE sp.id_product = OLD.id_product;

	END IF;
END ;;

DELIMITER ;;
CREATE TRIGGER Tgr_stock_output_products_delete AFTER DELETE
ON  stock_output_products
FOR EACH ROW
BEGIN
	CALL SP_output_sum_value(OLD.id_stock);
    UPDATE stock_products sp SET  sp.unit_price = OLD.unit_price_output, sp.amount = sp.amount + OLD.amount_output
	WHERE sp.id_product = OLD.id_product;
END ;;