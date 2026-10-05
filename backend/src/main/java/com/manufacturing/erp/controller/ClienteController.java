package com.manufacturing.erp.controller;

import com.manufacturing.erp.dto.ClienteDTO;
import com.manufacturing.erp.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "Endpoints para visualizaciÃ³n de clientes")
public class ClienteController {
    private final ClienteService clienteService;

    @GetMapping
    @Operation(summary = "Listar todos los clientes")
    public List<ClienteDTO> listar() {
        return clienteService.listarTodos();
    }
}

