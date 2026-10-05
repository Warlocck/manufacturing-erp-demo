package com.manufacturing.erp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.Immutable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vw_inventario_general")
@Immutable
@Getter
public class InventarioGeneral {
    @Id
    @Column(name = "id_pieza")
    private Integer idPieza;

    @Column(name = "codigo_base")
    private String codigoBase;

    @Column(name = "nombre_pieza")
    private String nombrePieza;

    @Column(name = "tipo_maquina")
    private String tipoMaquina;

    private String clase;

    @Column(name = "clase_2")
    private String clase2;

    @Column(name = "id_cliente")
    private Integer idCliente;

    private String cliente;

    @Column(name = "tipo_pieza")
    private String tipoPieza;

    private String material;

    @Column(name = "clase_material")
    private String claseMaterial;

    @Column(name = "peso_considerado")
    private BigDecimal pesoConsiderado;

    @Column(name = "peso_inventor")
    private BigDecimal pesoInventor;

    @Column(name = "peso_fundido")
    private BigDecimal pesoFundido;

    @Column(name = "peso_manguitos")
    private BigDecimal pesoManguitos;

    @Column(name = "peso_final")
    private BigDecimal pesoFinal;

    @Column(name = "peso_merma")
    private BigDecimal pesoMerma;

    @Column(name = "precio_kg")
    private BigDecimal precioKg;

    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

    @Column(name = "estado_codigo")
    private Integer estadoCodigo;

    @Column(name = "estado_nombre")
    private String estadoNombre;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;
}

