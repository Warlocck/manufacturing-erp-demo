package com.manufacturing.erp.service;

import com.manufacturing.erp.dto.ClienteDTO;
import com.manufacturing.erp.entity.Cliente;
import com.manufacturing.erp.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ClienteDTO convertToDTO(Cliente cliente) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setNombreInformal(cliente.getNombreInformal());
        dto.setRazonSocial(cliente.getRazonSocial());
        dto.setRuc(cliente.getRuc());
        dto.setClasificacion(cliente.getClasificacion());
        dto.setDepartamento(cliente.getDepartamento());
        return dto;
    }
}

