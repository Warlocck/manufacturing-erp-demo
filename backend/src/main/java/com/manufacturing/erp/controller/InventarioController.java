package com.manufacturing.erp.controller;

import com.manufacturing.erp.dto.InventarioDTO;
import com.manufacturing.erp.service.InventarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.manufacturing.erp.util.PdfGenerator;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/inventario")
@RequiredArgsConstructor
@Tag(name = "Inventario", description = "Endpoints para visualizaciÃ³n y filtrado de inventario")
public class InventarioController {
    private final InventarioService inventarioService;

    @GetMapping
    @Operation(summary = "Listar inventario con filtros")
    public List<InventarioDTO> listar(
            @Parameter(description = "CÃ³digo o nombre del estado del proceso") @RequestParam(required = false) String estado,
            @Parameter(description = "ID o nombre informal del cliente") @RequestParam(required = false) String cliente,
            @Parameter(description = "BÃºsqueda por nombre o cÃ³digo de pieza") @RequestParam(required = false) String query) {
        return inventarioService.listarConFiltros(estado, cliente, query);
    }

    @GetMapping("/exportar-pdf")
    @Operation(summary = "Exportar inventario filtrado a PDF")
    public void exportarPdf(
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String cliente,
            @RequestParam(required = false) String query,
            HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=inventario.pdf");
        
        List<InventarioDTO> items = inventarioService.listarConFiltros(estado, cliente, query);
        PdfGenerator.generateInventarioPdf(response, items);
    }
}

