package com.manufacturing.erp.repository;

import com.manufacturing.erp.entity.InventarioGeneral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository extends JpaRepository<InventarioGeneral, Integer>, JpaSpecificationExecutor<InventarioGeneral> {
}

