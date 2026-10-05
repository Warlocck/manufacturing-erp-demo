package com.manufacturing.erp.dto;

import lombok.Data;

@Data
public class ClienteDTO {
    private Integer id;
    private String nombreInformal;
    private String razonSocial;
    private String ruc;
    private String clasificacion;
    private String departamento;
}

