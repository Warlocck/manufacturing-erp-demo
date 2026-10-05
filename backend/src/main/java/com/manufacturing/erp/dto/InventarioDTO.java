package com.manufacturing.erp.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class InventarioDTO {
    private Integer idPieza;
    private String codigoBase;
    private String nombrePieza;
    private String cliente;
    private String tipoPieza;
    private String material;
    private BigDecimal pesoFinal;
    private String estadoNombre;
    private LocalDateTime fechaRegistro;
}

