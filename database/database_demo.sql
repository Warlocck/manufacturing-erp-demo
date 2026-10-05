```sql
-- =============================================================
-- MANUFACTURING ERP DEMO - PostgreSQL
-- Esquema, vista, datos de demostración y procedimientos CRUD.
--
-- Este archivo contiene únicamente datos ficticios creados
-- para fines de demostración y portfolio.
-- =============================================================

BEGIN;

CREATE SCHEMA IF NOT EXISTS manufacturing;
SET search_path TO manufacturing, public;

-- =============================================================
-- ESTADOS DEL PROCESO
-- =============================================================

CREATE TABLE IF NOT EXISTS estado_proceso (
    codigo INTEGER PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO estado_proceso (codigo, nombre) VALUES
    (1, 'Disponible'),
    (2, 'En Proceso'),
    (3, 'Terminado'),
    (4, 'Anulado')
ON CONFLICT (codigo) DO NOTHING;

-- =============================================================
-- CLIENTES
-- =============================================================

CREATE TABLE IF NOT EXISTS cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre_informal VARCHAR(120) NOT NULL,
    razon_social VARCHAR(180) NOT NULL,
    ruc VARCHAR(20),
    direccion VARCHAR(250),
    clasificacion VARCHAR(100),
    comentarios TEXT,
    departamento VARCHAR(100),
    provincia VARCHAR(100),
    distrito VARCHAR(100),
    minerales VARCHAR(250),
    maquina_1 VARCHAR(150),
    maquina_2 VARCHAR(150),
    maquina_3 VARCHAR(150),
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_cliente_ruc
    ON cliente (ruc)
    WHERE ruc IS NOT NULL AND ruc <> '';

-- =============================================================
-- PIEZAS / INVENTARIO
-- =============================================================

CREATE TABLE IF NOT EXISTS pieza (
    id_pieza SERIAL PRIMARY KEY,
    codigo_base VARCHAR(80) NOT NULL UNIQUE,
    nombre_pieza VARCHAR(180) NOT NULL,
    tipo_maquina VARCHAR(120),
    clase VARCHAR(120),
    clase_2 VARCHAR(120),
    id_cliente INTEGER REFERENCES cliente(id_cliente),
    tipo_pieza VARCHAR(120),
    material VARCHAR(150),
    clase_material VARCHAR(120),
    peso_considerado NUMERIC(14,3),
    peso_inventor NUMERIC(14,3),
    peso_fundido NUMERIC(14,3),
    peso_manguitos NUMERIC(14,3),
    peso_final NUMERIC(14,3),
    peso_merma NUMERIC(14,3),
    precio_kg NUMERIC(14,2),
    precio_unitario NUMERIC(14,2),
    estado_codigo INTEGER NOT NULL DEFAULT 1
        REFERENCES estado_proceso(codigo),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ck_pieza_pesos_no_negativos CHECK (
        COALESCE(peso_considerado, 0) >= 0
        AND COALESCE(peso_inventor, 0) >= 0
        AND COALESCE(peso_fundido, 0) >= 0
        AND COALESCE(peso_manguitos, 0) >= 0
        AND COALESCE(peso_final, 0) >= 0
        AND COALESCE(peso_merma, 0) >= 0
    )
);

-- =============================================================
-- DOCUMENTOS TÉCNICOS
-- =============================================================

CREATE TABLE IF NOT EXISTS plano_pieza (
    id_plano BIGSERIAL PRIMARY KEY,
    id_pieza INTEGER NOT NULL
        REFERENCES pieza(id_pieza)
        ON DELETE CASCADE,
    nombre_archivo VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL DEFAULT 'application/pdf',
    contenido BYTEA NOT NULL,
    fecha_carga TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================
-- VISTA GENERAL DE INVENTARIO
-- =============================================================

CREATE OR REPLACE VIEW vw_inventario_general AS
SELECT
    p.id_pieza,
    p.codigo_base,
    p.nombre_pieza,
    p.tipo_maquina,
    p.clase,
    p.clase_2,
    p.id_cliente,
    c.nombre_informal AS cliente,
    p.tipo_pieza,
    p.material,
    p.clase_material,
    p.peso_considerado,
    p.peso_inventor,
    p.peso_fundido,
    p.peso_manguitos,
    p.peso_final,
    p.peso_merma,
    p.precio_kg,
    p.precio_unitario,
    p.estado_codigo,
    e.nombre AS estado_nombre,
    p.fecha_registro
FROM pieza p
LEFT JOIN cliente c
    ON c.id_cliente = p.id_cliente
LEFT JOIN estado_proceso e
    ON e.codigo = p.estado_codigo;

-- =============================================================
-- PROCEDIMIENTOS DE CLIENTES
-- =============================================================

CREATE OR REPLACE PROCEDURE sp_cliente_insert(
    IN p_nombre_informal VARCHAR,
    IN p_razon_social VARCHAR,
    IN p_ruc VARCHAR DEFAULT NULL,
    IN p_clasificacion VARCHAR DEFAULT NULL,
    IN p_departamento VARCHAR DEFAULT NULL,
    IN p_direccion VARCHAR DEFAULT NULL,
    IN p_comentarios TEXT DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO cliente (
        nombre_informal,
        razon_social,
        ruc,
        clasificacion,
        departamento,
        direccion,
        comentarios
    )
    VALUES (
        p_nombre_informal,
        p_razon_social,
        p_ruc,
        p_clasificacion,
        p_departamento,
        p_direccion,
        p_comentarios
    );
END;
$$;

CREATE OR REPLACE PROCEDURE sp_cliente_update(
    IN p_id_cliente INTEGER,
    IN p_nombre_informal VARCHAR,
    IN p_razon_social VARCHAR,
    IN p_ruc VARCHAR DEFAULT NULL,
    IN p_clasificacion VARCHAR DEFAULT NULL,
    IN p_departamento VARCHAR DEFAULT NULL,
    IN p_direccion VARCHAR DEFAULT NULL,
    IN p_comentarios TEXT DEFAULT NULL,
    IN p_estado BOOLEAN DEFAULT TRUE
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE cliente
    SET
        nombre_informal = p_nombre_informal,
        razon_social = p_razon_social,
        ruc = p_ruc,
        clasificacion = p_clasificacion,
        departamento = p_departamento,
        direccion = p_direccion,
        comentarios = p_comentarios,
        estado = p_estado
    WHERE id_cliente = p_id_cliente;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cliente % no existe', p_id_cliente;
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_cliente_delete(
    IN p_id_cliente INTEGER
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE cliente
    SET estado = FALSE
    WHERE id_cliente = p_id_cliente;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cliente % no existe', p_id_cliente;
    END IF;
END;
$$;

-- =============================================================
-- PROCEDIMIENTOS DE PIEZAS / INVENTARIO
-- =============================================================

CREATE OR REPLACE PROCEDURE sp_pieza_insert(
    IN p_codigo_base VARCHAR,
    IN p_nombre_pieza VARCHAR,
    IN p_id_cliente INTEGER DEFAULT NULL,
    IN p_tipo_pieza VARCHAR DEFAULT NULL,
    IN p_material VARCHAR DEFAULT NULL,
    IN p_peso_considerado NUMERIC DEFAULT NULL,
    IN p_peso_inventor NUMERIC DEFAULT NULL,
    IN p_peso_fundido NUMERIC DEFAULT NULL,
    IN p_peso_manguitos NUMERIC DEFAULT NULL,
    IN p_peso_final NUMERIC DEFAULT NULL,
    IN p_estado_codigo INTEGER DEFAULT 1
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO pieza (
        codigo_base,
        nombre_pieza,
        id_cliente,
        tipo_pieza,
        material,
        peso_considerado,
        peso_inventor,
        peso_fundido,
        peso_manguitos,
        peso_final,
        estado_codigo
    )
    VALUES (
        p_codigo_base,
        p_nombre_pieza,
        p_id_cliente,
        p_tipo_pieza,
        p_material,
        p_peso_considerado,
        p_peso_inventor,
        p_peso_fundido,
        p_peso_manguitos,
        p_peso_final,
        p_estado_codigo
    );
END;
$$;

CREATE OR REPLACE PROCEDURE sp_pieza_update(
    IN p_id_pieza INTEGER,
    IN p_codigo_base VARCHAR,
    IN p_nombre_pieza VARCHAR,
    IN p_id_cliente INTEGER DEFAULT NULL,
    IN p_tipo_pieza VARCHAR DEFAULT NULL,
    IN p_material VARCHAR DEFAULT NULL,
    IN p_peso_considerado NUMERIC DEFAULT NULL,
    IN p_peso_inventor NUMERIC DEFAULT NULL,
    IN p_peso_fundido NUMERIC DEFAULT NULL,
    IN p_peso_manguitos NUMERIC DEFAULT NULL,
    IN p_peso_final NUMERIC DEFAULT NULL,
    IN p_estado_codigo INTEGER DEFAULT 1
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE pieza
    SET
        codigo_base = p_codigo_base,
        nombre_pieza = p_nombre_pieza,
        id_cliente = p_id_cliente,
        tipo_pieza = p_tipo_pieza,
        material = p_material,
        peso_considerado = p_peso_considerado,
        peso_inventor = p_peso_inventor,
        peso_fundido = p_peso_fundido,
        peso_manguitos = p_peso_manguitos,
        peso_final = p_peso_final,
        peso_merma = GREATEST(
            COALESCE(p_peso_considerado, 0)
            - COALESCE(p_peso_final, 0),
            0
        ),
        estado_codigo = p_estado_codigo
    WHERE id_pieza = p_id_pieza;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Pieza % no existe', p_id_pieza;
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_pieza_delete(
    IN p_id_pieza INTEGER
)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM pieza
    WHERE id_pieza = p_id_pieza;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Pieza % no existe', p_id_pieza;
    END IF;
END;
$$;

-- =============================================================
-- DATOS DE DEMOSTRACIÓN
-- =============================================================

INSERT INTO cliente (
    nombre_informal,
    razon_social,
    ruc,
    clasificacion,
    departamento
)
VALUES
    (
        'INDUSTRIAS ANDINAS',
        'INDUSTRIAS ANDINAS S.A.C.',
        '00000000001',
        'Manufactura',
        'Arequipa'
    ),
    (
        'MINERA DEL SUR',
        'MINERA DEL SUR S.A.C.',
        '00000000002',
        'Industria',
        'Cusco'
    ),
    (
        'PROYECTOS ALTIPLANO',
        'PROYECTOS ALTIPLANO S.A.C.',
        '00000000003',
        'Manufactura',
        'Puno'
    ),
    (
        'OPERACIONES DEL PACÍFICO',
        'OPERACIONES DEL PACÍFICO S.A.C.',
        '00000000004',
        'Industria',
        'Moquegua'
    )
ON CONFLICT DO NOTHING;

-- =============================================================
-- VERIFICACIÓN
-- =============================================================
-- SELECT * FROM manufacturing.vw_inventario_general;
-- CALL manufacturing.sp_cliente_delete(1);
-- CALL manufacturing.sp_pieza_delete(1);

COMMIT;
```

