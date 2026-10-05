package com.manufacturing.erp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "cliente")
@Getter
@Setter
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer id;

    @Column(name = "nombre_informal")
    private String nombreInformal;

    @Column(name = "razon_social")
    private String razonSocial;

    private String ruc;
    private String direccion;
    private String clasificacion;
    private String comentarios;
    private String departamento;
    private String provincia;
    private String distrito;
    private String minerales;

    @Column(name = "maquina_1")
    private String maquina1;
    @Column(name = "maquina_2")
    private String maquina2;
    @Column(name = "maquina_3")
    private String maquina3;

    private Boolean estado;

    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;
}

