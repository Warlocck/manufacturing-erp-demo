package com.manufacturing.erp.util;

import com.manufacturing.erp.dto.InventarioDTO;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class PdfGenerator {

    public static void generateInventarioPdf(HttpServletResponse response, List<InventarioDTO> items) throws IOException {
        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);

        Paragraph title = new Paragraph("Reporte de Inventario - FundiciÃ³n Arequipa", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);

        String[] headers = {"CÃ³digo", "Pieza", "Cliente", "Tipo", "Material", "Peso (kg)", "Estado"};
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }

        for (InventarioDTO item : items) {
            table.addCell(item.getCodigoBase());
            table.addCell(item.getNombrePieza());
            table.addCell(item.getCliente() != null ? item.getCliente() : "N/A");
            table.addCell(item.getTipoPieza());
            table.addCell(item.getMaterial());
            table.addCell(item.getPesoFinal() != null ? item.getPesoFinal().toString() : "0.00");
            table.addCell(item.getEstadoNombre());
        }

        document.add(table);
        document.close();
    }
}

