package com.manufacturing.erp.service;

import com.manufacturing.erp.dto.InventarioDTO;
import com.manufacturing.erp.entity.InventarioGeneral;
import com.manufacturing.erp.repository.InventarioRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventarioService {
    private final InventarioRepository inventarioRepository;

    public List<InventarioDTO> listarConFiltros(String estado, String cliente, String query) {
        Specification<InventarioGeneral> spec = (root, criteriaQuery, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (estado != null && !estado.isBlank()) {
                if (isInteger(estado)) {
                    predicates.add(cb.equal(root.get("estadoCodigo"), Integer.valueOf(estado)));
                } else {
                    predicates.add(cb.equal(cb.lower(root.get("estadoNombre")), estado.toLowerCase()));
                }
            }
            if (cliente != null && !cliente.isBlank()) {
                if (isInteger(cliente)) {
                    predicates.add(cb.equal(root.get("idCliente"), Integer.valueOf(cliente)));
                } else {
                    predicates.add(cb.equal(cb.lower(root.get("cliente")), cliente.toLowerCase()));
                }
            }
            if (query != null && !query.isEmpty()) {
                String likeQuery = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("nombrePieza")), likeQuery),
                    cb.like(cb.lower(root.get("codigoBase")), likeQuery)
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return inventarioRepository.findAll(spec).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private boolean isInteger(String value) {
        try {
            Integer.valueOf(value);
            return true;
        } catch (NumberFormatException ex) {
            return false;
        }
    }

    private InventarioDTO convertToDTO(InventarioGeneral entity) {
        InventarioDTO dto = new InventarioDTO();
        dto.setIdPieza(entity.getIdPieza());
        dto.setCodigoBase(entity.getCodigoBase());
        dto.setNombrePieza(entity.getNombrePieza());
        dto.setCliente(entity.getCliente());
        dto.setTipoPieza(entity.getTipoPieza());
        dto.setMaterial(entity.getMaterial());
        dto.setPesoFinal(entity.getPesoFinal());
        dto.setEstadoNombre(entity.getEstadoNombre());
        dto.setFechaRegistro(entity.getFechaRegistro());
        return dto;
    }
}

