-- Tabla usuario
CREATE TABLE usuario (
    u_id INT PRIMARY KEY,
    u_nombre VARCHAR(30),
    u_apellido VARCHAR(30),
    u_correo VARCHAR(30),
    u_direccion VARCHAR(60),
    u_usuario VARCHAR(10),
    u_contraseña VARCHAR(10),
    u_tipoAcceso VARCHAR(20)  -- Corregido el guion a _tipoAcceso
);

INSERT INTO usuario (u_id, u_nombre, u_apellido, u_correo, u_direccion, u_usuario, u_contraseña, u_tipoAcceso)
VALUES
(1, 'Ivan', 'Vargas', 'juan.perez@email.com', 'Calle Ficticia 123, Ciudad', 'Ivan1', '12345', 'admin'),
(2, 'Yeison', 'Segura', 'maria.lopez@email.com', 'Avenida Central 456, Ciudad', 'Yeison1', '12345', 'admin'),
(3, 'Pepito', 'Perez', 'carlos.gonzalez@email.com', 'Calle del Sol 789, Ciudad', 'Pepito1', '12345', 'admin'),
(4, 'Ana', 'Martínez', 'ana.martinez@email.com', 'Calle Luna 101, Ciudad', 'anam', 'Ana1', 'usuario'),
(5, 'Luis', 'Rodríguez', 'luis.rodriguez@email.com', 'Calle Estrella 202, Ciudad', 'Luis1', '12345', 'usuario');

-- Tabla proveedor
CREATE TABLE proveedor (
    p_id_proveedor INT PRIMARY KEY,
    p_nombre_proveedor VARCHAR(30),
    p_apellido_proveedor VARCHAR(30),
    p_empresa VARCHAR(30),
    p_telefono VARCHAR(60),
    p_correo VARCHAR(30)
);

INSERT INTO proveedor (p_id_proveedor, p_nombre_proveedor, p_apellido_proveedor, p_empresa, p_telefono, p_correo)
VALUES
(1095910480, 'Juan', 'Pérez', 'Empresa A', '123456789', 'juan.perez@example.com'),
(1095910481, 'María', 'Gómez', 'Empresa B', '987654321', 'maria.gomez@example.com'),
(1095910482, 'Carlos', 'Rodríguez', 'Empresa C', '555123456', 'carlos.rodriguez@example.com');

-- Tabla clientes
CREATE TABLE clientes (
    c_id_cliente INT PRIMARY KEY,
    c_nombre_cliente VARCHAR(30),
    c_apellido_cliente VARCHAR(30),
    c_direccion VARCHAR(30),
    c_telefono VARCHAR(30),
    c_correo VARCHAR(60)
);

INSERT INTO clientes (c_id_cliente, c_nombre_cliente, c_apellido_cliente, c_direccion, c_telefono, c_correo)
VALUES
(1097669440, 'Carlos', 'Sánchez', 'Calle 25, Bogotá', '3101234567', 'carlos.sanchez@example.com'),
(1097669441, 'María', 'Pérez', 'Carrera 89, Medellín', '3127654321', 'maria.perez@example.com'),
(1097669442, 'José', 'Martínez', 'Avenida 12, Cali', '3159876543', 'jose.martinez@example.com');

-- Tabla producto
CREATE TABLE producto (
    p_id_producto INT PRIMARY KEY AUTO_INCREMENT,
    p_color VARCHAR(30),
    p_id_proveedor INT,
    p_cantidad INT,
    p_talla INT,
    p_marca VARCHAR(60),
    p_descripcion VARCHAR(200),
    p_precio decimal,
    FOREIGN KEY (p_id_proveedor) REFERENCES proveedor(p_id_proveedor)
);
INSERT INTO producto ( p_color, p_id_proveedor, p_cantidad, p_talla, p_marca, p_descripcion, p_precio)
VALUES
( 'Rojo Blanco', 1095910480, 50, 42, 'Nike', 'Air Force',50),
( 'Azul Blanco', 1095910481, 30, 38, 'Adidas', 'Grand Court Alpha',60);


-- Tabla ventas
CREATE TABLE ventas (
    v_id_venta INT PRIMARY KEY AUTO_INCREMENT, 
    v_id_producto INT,                         
    v_id_cliente INT,
    v_estado_pago VARCHAR(30),
    v_cantidad INT,
    v_precio_u decimal,
    v_ciudad_envio VARCHAR(60),
    v_direccion_envio VARCHAR(60),
    v_Total decimal,
    v_correo VARCHAR(30),
    v_estado_despacho VARCHAR(30),
    FOREIGN KEY (v_id_producto) REFERENCES producto(p_id_producto),
    FOREIGN KEY (v_id_cliente) REFERENCES clientes(c_id_cliente)
);
INSERT INTO ventas (v_id_producto, v_id_cliente, v_estado_pago, v_cantidad,v_precio_u, v_ciudad_envio,v_direccion_envio,v_Total, v_correo, v_estado_despacho)
VALUES
(1, 1097669440, 'Pagado', 2,100, 'Bogotá','calle 14a-24',130, 'carlos.sanchez@example.com', 'En proceso'),
(2, 1097669441, 'Pendiente', 1,60, 'Medellín','calle 34a-24',90, 'maria.perez@example.com', 'Esperando pago');

